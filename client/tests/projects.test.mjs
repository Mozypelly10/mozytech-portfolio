import test from "node:test";
import assert from "node:assert/strict";
import { mergeProjects, portfolioProjects } from "../lib/projects.ts";

test("catalogue remains available without the projects service", () => {
  const projects = mergeProjects([]);
  assert.equal(projects.length, 7);
  assert.equal(projects[0].title, "ClassBridge");
  assert.equal(projects[0].liveUrl, "https://classbridge.mozytech.com.ng");
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
});

test("existing database descriptions and unlisted projects are preserved", () => {
  const existing = [
    { ...portfolioProjects[0], id: "database-classbridge", title: "Class Bridge", description: "My existing description", liveUrl: "https://classbridge.mozytech.com.ng/" },
    { id: "other", title: "Another project", description: "Keep this", techStack: ["Python"], featured: false, createdAt: "" },
  ];
  const snapshot = JSON.stringify(existing);
  const projects = mergeProjects(existing);
  assert.equal(projects.length, 8);
  assert.equal(projects[0].description, "My existing description");
  assert.equal(projects[0].id, "database-classbridge");
  assert.equal(projects.at(-1).title, "Another project");
  assert.equal(JSON.stringify(existing), snapshot);
});

test("repository links identify existing projects despite different titles", () => {
  const existing = { ...portfolioProjects[3], title: "Mailer App", githubUrl: "https://github.com/Mozypelly10/Mailer-App/", description: "Existing mailer content" };
  const projects = mergeProjects([existing]);
  assert.equal(projects.length, 7);
  assert.equal(projects[3].description, "Existing mailer content");
});

test("missing live links are filled from the catalogue", () => {
  const existing = { ...portfolioProjects[0], title: "CLASS BRIDGE", liveUrl: null };
  assert.equal(mergeProjects([existing])[0].liveUrl, "https://classbridge.mozytech.com.ng");
});
