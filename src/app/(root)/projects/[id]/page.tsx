import { ProjectView } from '@/components/projects/project-view';
import React from 'react'
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/features/auth/actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return { title: "Project · e0" };

  const project = await prisma.project.findUnique({
    where: { id, userId: user.id },
    select: { name: true },
  });

  return { title: project ? `${project.name} - e0` : "Project - e0" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectView projectId={id} />;
}