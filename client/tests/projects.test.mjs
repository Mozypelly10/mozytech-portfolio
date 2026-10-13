import test from "node:test";
import assert from "node:assert/strict";
import { mergeProjects, portfolioProjects } from "../lib/projects.ts";

test("catalogue remains available without the projects service", () => {
  const projects = mergeProjects([]);
  assert.equal(projects.length, 12);
  assert.equal(projects[0].title, "ClassBridge");
  assert.equal(projects[0].liveUrl, "https://classbridge.mozytech.com.ng");
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
});

test("ClassBridge is current while unlisted database projects are preserved", () => {
  const existing = [
    { ...portfolioProjects[0], id: "database-classbridge", title: "Class Bridge", description: "My existing description", liveUrl: "https://classbridge.mozytech.com.ng/" },
    { id: "other", title: "Another project", description: "Keep this", techStack: ["Python"], featured: false, createdAt: "" },
  ];
  const snapshot = JSON.stringify(existing);
  const projects = mergeProjects(existing);
  assert.equal(projects.length, 13);
  assert.equal(projects[0].description, portfolioProjects[0].description);
  assert.equal(projects[0].imageUrl, "/projects/classbridge.png");
  assert.ok(projects[0].description.includes("teachers"));
  assert.equal(projects[0].id, "database-classbridge");
  assert.equal(projects.at(-1).title, "Another project");
  assert.equal(JSON.stringify(existing), snapshot);
});

test("repository links identify existing projects despite different titles", () => {
  const mailer = portfolioProjects.find((project) => project.id === "mailer-app");
  const existing = { ...mailer, title: "Mailer App", githubUrl: "https://github.com/Mozypelly10/Mailer-App/", description: "Existing mailer content" };
  const projects = mergeProjects([existing]);
  assert.equal(projects.length, 12);
  assert.equal(projects.find((project) => project.id === "mailer-app").description, "Existing mailer content");
});

test("approved Wonzay artwork replaces older database artwork", () => {
  const branding = portfolioProjects.find((project) => project.id === "wonzay-brand-identity");
  const existing = { ...branding, id: "older-database-id", title: "Wonzay Kollections — Brand Identity", imageUrl: "/projects/wonzay-brand.png", featured: true };
  const projects = mergeProjects([existing]);
  assert.equal(projects.length, 12);
  const merged = projects.find((project) => project.id === "older-database-id");
  assert.equal(merged.imageUrl, "/projects/wonzay-approved-logo.jpeg");
  assert.equal(merged.featured, false);
});

test("missing live links are filled from the catalogue", () => {
  const existing = { ...portfolioProjects[0], title: "CLASS BRIDGE", liveUrl: null };
  assert.equal(mergeProjects([existing])[0].liveUrl, "https://classbridge.mozytech.com.ng");
});
