import { getProjects } from "@/lib/api";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="border-b border-[var(--color-border)] px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap gap-3 font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
            <span className="rounded border border-[var(--color-border)] px-2.5 py-1">
              STATUS: <span className="text-[var(--color-teal)]">AVAILABLE</span>
            </span>
            <span className="rounded border border-[var(--color-border)] px-2.5 py-1">
              EXPERIENCE: <span className="text-[var(--color-text)]">5+ YEARS</span>
            </span>
            <span className="rounded border border-[var(--color-border)] px-2.5 py-1">
              BASE: <span className="text-[var(--color-text)]">NIGERIA</span>
            </span>
          </div>

          <h1 className="font-mono text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Oluwafemi Moses Durosomo
            <br />
            <span className="text-[var(--color-amber)]">Mozytech</span>
          </h1>

          <p className="mt-6 max-w-3xl font-mono text-sm tracking-wide text-[var(--color-teal)] sm:text-base">
            Cybersecurity Engineer &bull; Penetration Tester &bull; Cloud
            Infrastructure Specialist &bull; Technical Instructor
          </p>

          <p className="mt-4 max-w-3xl text-xl leading-9 text-[var(--color-text-dim)]">
            I help businesses identify security weaknesses before attackers
            do, deploy secure cloud infrastructure, and build
            production-ready applications with modern automation and
            security practices.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-md bg-[var(--color-amber)] px-5 py-3 font-mono text-sm font-medium text-[#0B0E11] transition-opacity hover:opacity-90">
              View projects
            </a>
            <a href="#contact" className="rounded-md border border-[var(--color-border)] px-5 py-3 font-mono text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-text-dim)]">
              Get in touch
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
            <a href="https://github.com/Mozypelly10" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-amber)]">GITHUB</a>
            <a href="https://www.linkedin.com/in/oluwafemi-durosomo-0559a6146/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-amber)]">LINKEDIN</a>
            <a href="https://x.com/mozypellyXP" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-amber)]">X</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-b border-[var(--color-border)] px-6 py-20 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs tracking-wider text-[var(--color-amber)]">
            ABOUT
          </p>

          <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-[var(--color-text-dim)]">
            <p>
              I&apos;m Oluwafemi Moses Durosomo, professionally known as
              Mozytech. I&apos;m a Cybersecurity Engineer, Ethical Hacker,
              Cloud Infrastructure Specialist, and Technical Instructor based
              in Nigeria.
            </p>
            <p>
              My work focuses on securing systems, identifying
              vulnerabilities before attackers do, and building
              production-ready applications with security and reliability in
              mind. I specialize in penetration testing, network security,
              system hardening, vulnerability assessment, and cloud
              infrastructure deployment.
            </p>
            <p>
              In recent months, I have expanded my work into modern
              application development and cloud operations, building mobile
              applications with Flutter and Firebase and deploying production
              workloads on AWS. One of my recent projects involved designing
              and deploying a secure AWS architecture featuring EC2, RDS
              PostgreSQL, Nginx reverse proxying, UFW firewall protection,
              IAM hardening, GitHub Actions CI/CD automation, and GeoIP-based
              traffic filtering.
            </p>
            <p>
              Beyond technical implementation, I have several years of
              experience teaching cybersecurity and IT concepts to students
              and professionals across different countries through both
              online and physical training environments. I enjoy translating
              complex technical problems into practical solutions that
              organizations and learners can immediately apply.
            </p>
            <p>
              Whether I&apos;m conducting a security assessment, deploying
              cloud infrastructure, developing applications, or mentoring
              aspiring security professionals, my goal is the same: build
              secure systems, automate intelligently, and continuously
              improve.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {[
              "Penetration Testing",
              "Ethical Hacking",
              "Network Security",
              "AWS Infrastructure",
              "CI/CD Automation",
              "Django Deployment",
              "PostgreSQL (RDS)",
              "Nginx Reverse Proxy",
              "Flutter Development",
              "Firebase Integration",
              "Linux Administration",
              "Technical Mentorship",
            ].map((skill) => (
              <div
                key={skill}
                className="border-l-2 border-[var(--color-border)] pl-3 font-mono text-sm text-[var(--color-text-dim)]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b border-[var(--color-border)] px-6 py-20 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs tracking-wider text-[var(--color-amber)]">
            PROJECTS
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Projects &amp; applications
          </h2>
          <p className="mt-4 text-[var(--color-text-dim)]">
            Explore my work across school software, cloud infrastructure, mobile
            apps and automation. Open a live site or browse the source code below.
          </p>

          {projects.length === 0 ? (
            <p className="mt-8 rounded-md border border-dashed border-[var(--color-border)] px-6 py-10 text-center font-mono text-sm text-[var(--color-text-dim)]">
              No projects published yet. Check back soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-text-dim)]">
                    {project.category && <span>{project.category}</span>}
                    {project.featured && <span className="rounded border border-[var(--color-amber)] px-2 py-0.5 text-[var(--color-amber)]">FEATURED</span>}
                  </div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-dim)]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-xs text-[var(--color-teal)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.note && <p className="mt-4 text-xs text-[var(--color-text-dim)]">{project.note}</p>}
                  <div className="mt-5 flex gap-4 font-mono text-xs">
                    {project.githubUrl && (
                      
                      <a href={project.githubUrl}
                        aria-label={`View ${project.title} source on GitHub`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-amber)] hover:underline"
                      >
                        GitHub &rarr;
                      </a>
                    )}
                    {project.liveUrl && (
                      
                      <a href={project.liveUrl}
                        aria-label={`Visit ${project.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-amber)] hover:underline"
                      >
                        Visit site &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className="px-6 py-20 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-wider text-[var(--color-amber)]">
            CONTACT
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-4 text-[var(--color-text-dim)]">
            Have a project, a security concern, or a training inquiry? Send a message.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
