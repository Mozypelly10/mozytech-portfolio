import { mergeProjects, type Project } from "./projects";
export type { Project } from "./projects";

export async function getProjects(): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return mergeProjects([]);
  try {
    const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/projects`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const projects: Project[] = await res.json();
    if (!Array.isArray(projects)) throw new Error("Invalid project response");
    return mergeProjects(projects);
  } catch {
    return mergeProjects([]);
  }
}
