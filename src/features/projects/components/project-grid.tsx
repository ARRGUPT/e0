"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGetProjects,
  useRenameProject,
  useDeleteProject,
} from "@/features/projects/hooks/projects";
import { getProjectThumbnailUrl } from "../lib";
import { cn } from "@/lib/utils";

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardHeader className="px-4 pb-4">
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
}

function formatProjectName(name: string) {
  return name.replace(/-/g, " ");
}

type ProjectSummary = { id: string; name: string };

export function ProjectGrid() {
  const { data: projects, isLoading, isError } = useGetProjects();

  // Which project each modal is acting on; null = closed.
  const [renaming, setRenaming] = useState<ProjectSummary | null>(null);
  const [deleting, setDeleting] = useState<ProjectSummary | null>(null);
  const [draftName, setDraftName] = useState("");

  const rename = useRenameProject();
  const remove = useDeleteProject();

  if (isError) {
    return null;
  }

  if (!isLoading && (!projects || projects.length === 0)) {
    return null;
  }

  const openRename = (project: ProjectSummary) => {
    setDraftName(formatProjectName(project.name));
    setRenaming(project);
  };

  const submitRename = () => {
    if (!renaming) return;

    rename.mutate(
      { id: renaming.id, name: draftName },
      {
        onSuccess: () => {
          toast.success("Project renamed");
          setRenaming(null);
        },
        onError: (error) => toast.error(error.message),
      },
    );
  };

  const confirmDelete = () => {
    if (!deleting) return;

    remove.mutate(deleting.id, {
      onSuccess: () => {
        toast.success("Project deleted");
        setDeleting(null);
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <section className="w-full">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Your projects
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          : projects?.map((project) => (
              <div key={project.id} className="group relative">
                <Link href={`/projects/${project.id}`} className="block">
                  <Card
                    className={cn(
                      "overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm",
                      "transition-colors hover:border-border hover:bg-card/80",
                    )}
                  >
                    <img
                      src={getProjectThumbnailUrl(project.id)}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    <CardHeader className="px-4 pb-4">
                      <CardTitle className="truncate capitalize">
                        {formatProjectName(project.name)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>

                {/* Sibling of the Link, not a child — so clicks never navigate. */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label="Project options"
                      className="absolute right-2 top-2 size-8 rounded-full opacity-0 shadow-sm transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => openRename(project)}>
                      <Pencil className="size-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={() => setDeleting(project)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
      </div>

      <Dialog
        open={renaming !== null}
        onOpenChange={(open) => !open && setRenaming(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename project</DialogTitle>
            <DialogDescription>Give this project a new name.</DialogDescription>
          </DialogHeader>

          <Input
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitRename();
              }
            }}
            maxLength={50}
            autoFocus
          />

          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenaming(null)}>
              Cancel
            </Button>
            <Button
              onClick={submitRename}
              disabled={rename.isPending || draftName.trim().length === 0}
            >
              {rename.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting ? formatProjectName(deleting.name) : ""} and all its
              messages will be permanently deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault(); // keep dialog open until server confirms
                confirmDelete();
              }}
              disabled={remove.isPending}
            >
              {remove.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
