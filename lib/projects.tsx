import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Project } from "../types/project";

export async function getProjects(): Promise<Project[]> {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {

                id: "desc"
            }
        });
        await prisma.$disconnect();
        return projects;
    } catch (err) {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1)
    }
}

export async function getProject(slug: string): Promise<Project> {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    await prisma.$disconnect();
    if (project === null) {
      notFound();
    }
    return project;
  }