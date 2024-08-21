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