import { getProjects } from "@/lib/api";
import ContactForm from "@/components/ContactForm";
import ProjectGallery from "@/components/ProjectGallery";
import Image from "next/image";

const skills = ["Penetration testing", "Network security", "AWS infrastructure", "CI/CD automation", "Django deployment", "PostgreSQL", "Flutter & Firebase", "Linux administration", "Visual identity", "Technical mentorship"];

export default async function Home() {
  const projects = await getProjects();
  return <main>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Mozytech home">mozytech<span>●</span></a>
      <nav aria-label="Main navigation"><a href="#projects">Work</a><a href="#about">About</a><a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section id="home" className="hero section-shell">
      <div className="hero-copy">
        <p className="availability"><span /> Available for projects <span className="availability-location">· Based in Nigeria</span></p>
        <h1>Secure systems.<br />Thoughtful design.<br /><span>Ideas brought to life.</span></h1>
        <p className="hero-intro">I’m Oluwafemi Moses Durosomo — <strong>Mozytech.</strong><br />Cybersecurity engineer, developer, technical instructor and the creative mind behind the work below.</p>
        <div className="hero-actions"><a className="button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="#contact">Have something in mind? ↗</a></div>
        <div className="hero-disciplines"><span>Cybersecurity</span><span>Cloud & applications</span><span>Brand identity</span></div>
      </div>
      <a href="#projects" className="hero-showcase" aria-label="Explore the Wonzay Kollections branding project">
        <div className="showcase-top"><span>From identity to experience</span><span>01 / Selected work</span></div>
        <div className="showcase-logo"><Image src="/projects/wonzay-monogram.png" alt="Wonzay Kollections purple and gold monogram" width={520} height={520} priority /></div>
        <div className="showcase-bottom"><div><p>WONZAY KOLLECTIONS</p><span>A complete brand, considered in every detail.</span></div><span className="showcase-arrow" aria-hidden="true">↗</span></div>
        <div className="showcase-swatches" aria-hidden="true"><span /><span /><span /></div>
      </a>
    </section>

    <div className="expertise-strip"><span>Security at the foundation.</span><span>Clarity in the design.</span><span>Care in the details.</span></div>

    <section id="projects" className="work-section section-shell">
      <div className="section-heading"><div><p className="eyebrow">01 — Selected work & experiments</p><h2>Different disciplines.<br /><em>The same attention to detail.</em></h2></div><p>School software, cloud deployments, brand identities and useful everyday tools. A closer look at what I’ve been building.</p></div>
      <ProjectGallery projects={projects} />
    </section>

    <section id="about" className="about-section section-shell">
      <div><p className="eyebrow">02 — The person behind the work</p><h2>Curious by nature.<br /><em>Practical by approach.</em></h2><p className="about-signature">Oluwafemi Moses Durosomo<span>Mozytech · Nigeria</span></p></div>
      <div className="about-copy"><p>I help businesses identify security weaknesses, deploy secure cloud infrastructure and turn ideas into usable applications. My work connects technical thinking with a strong eye for how things look and feel.</p><p>From penetration testing and Linux administration to Flutter applications and complete brand identities, I enjoy taking a project from its first question to a considered result.</p><p>I also teach cybersecurity and IT to students and professionals through online and in-person training, making complex ideas easier to put into practice.</p><div className="skills-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
    </section>

    <section id="contact" className="contact-section section-shell">
      <div className="contact-copy"><p className="eyebrow">03 — Make something happen</p><h2>A good project starts<br />with <em>a conversation.</em></h2><p>Have a security concern, an application idea, a brand to build or a training inquiry? Tell me what you have in mind.</p><div className="social-links"><a href="https://github.com/Mozypelly10" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/oluwafemi-durosomo-0559a6146/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://x.com/mozypellyXP" target="_blank" rel="noopener noreferrer">X ↗</a></div></div>
      <div className="contact-form-panel"><ContactForm /></div>
    </section>
    <footer className="site-footer"><a className="wordmark" href="#home">mozytech<span>●</span></a><p>Built with care. Always evolving.</p><a href="#home">Back to top ↑</a></footer>
  </main>;
}
