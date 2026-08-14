"use server";

import { getCurrentUser } from "@/features/auth/actions";
import { inngest } from "@/features/inngest/client";
import { MessageRole, MessageType } from "@/generated/prisma/client";
import { generateSlug } from "random-word-slugs";
import { prisma } from "@/lib/db";

export const createProject = async (value: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const project = await prisma.project.create({
      data: {
        name: generateSlug(2, { format: "kebab" }),
        userId: user.id,
        messages: {
          create: {
            content: value,
            role: MessageRole.USER,
            type: MessageType.RESULT,
          },
        },
      },
    });

    await inngest.send({
      name: "code-agent/run",
      data: {
        value,
        projectId: project.id,
      },
    });

    return project;
  } catch (error) {
    console.error("❌ Error creating project:", error);
    return {
      error: "Failed to create project",
    };
  }
};

export const getProjects = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("❌ Error getting projects:", error);
    return {
      error: "Failed to get projects",
    };
  }
};

export const renameProject = async (id: string, name: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0 || trimmed.length > 50) {
    return { error: "Name must be between 1 and 50 characters" };
  }

  try {
    // updateMany so ownership lives in the WHERE, not a post-fetch check.
    const { count } = await prisma.project.updateMany({
      where: { id, userId: user.id },
      data: { name: trimmed },
    });

    if (count === 0) {
      return { error: "Project not found" };
    }

    return { id, name: trimmed };
  } catch (error) {
    console.error("❌ Error renaming project:", error);
    return { error: "Failed to rename project" };
  }
};

export const deleteProject = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // Messages + fragments cascade via the schema relation.
    const { count } = await prisma.project.deleteMany({
      where: { id, userId: user.id },
    });

    if (count === 0) {
      return { error: "Project not found" };
    }

    return { id };
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
};

export const getProjectById = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        messages: true,
      },
    });

    if (!project) {
      return {
        error: "Project not found",
      };
    }

    return project;
  } catch (error) {
    console.error("❌ Error getting project by id:", error);
    return {
      error: "Failed to get project by id",
    };
  }
};
