import { getProjects } from "@/lib/api";
import ContactForm from "@/components/ContactForm";
import ProjectGallery from "@/components/ProjectGallery";
import Image from "next/image";
import { portfolioProjects } from "@/lib/projects";

const skills = ["Penetration testing", "Network security", "AWS infrastructure", "CI/CD automation", "Django deployment", "PostgreSQL", "Flutter & Firebase", "Linux administration", "Visual identity", "Technical mentorship"];
const services = [
  { title: "Cybersecurity", text: "Penetration testing, vulnerability assessment, network security and system hardening." },
  { title: "Web & desktop applications", text: "Responsive websites, school software, desktop tools and useful business applications." },
  { title: "Mobile applications", text: "Flutter applications with Firebase, authentication, location services and maps." },
  { title: "Cloud & infrastructure", text: "AWS deployments, Linux administration, databases, reverse proxies and delivery automation." },
  { title: "Logos, branding & flyers", text: "Logo design, monograms, visual identities, packaging, stationery and social graphics." },
  { title: "Training & mentorship", text: "Practical cybersecurity and IT teaching, delivered online and in person." },
];

export default async function Home() {
  const projects = await getProjects();
  return <main>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <header className="site-header">
      <a href="#home" className="wordmark company-wordmark" aria-label="MOZYTECH home"><span className="brand-symbol" aria-hidden="true" />MOZYTECH</a>
      <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#projects">Work</a><a href="#about">About</a><a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section id="home" className="hero section-shell">
      <div className="hero-copy">
        <p className="availability"><span /> MOZYTECH · Registered company <span className="availability-location">· Nigeria</span></p>
        <h1>Secure systems.<br />Thoughtful design.<br /><span>Ideas brought to life.</span></h1>
        <p className="hero-intro">I’m Oluwafemi Moses Durosomo, the person behind <strong>MOZYTECH.</strong> I secure systems, build web and mobile apps, deploy cloud infrastructure, design logos and flyers, and teach the skills behind the work.</p>
        <div className="hero-actions"><a className="button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="#contact">Have something in mind? ↗</a></div>
        <div className="hero-disciplines"><span>Security & cloud</span><span>Web & mobile</span><span>Logos & design</span><span>Training</span></div>
      </div>
      <a href="#services" className="hero-showcase" aria-label="Explore MOZYTECH services">
        <div className="showcase-top"><span>Technology meets creativity</span><span>My company. My work.</span></div>
        <div className="showcase-logo own-brand-logo"><Image src="/brand/mozytech-logo.jpg" alt="MOZYTECH’s original cyan-and-black M monogram and wordmark" fill sizes="(max-width: 720px) 100vw, 40vw" priority /></div>
        <div className="showcase-bottom"><div><p>MOZYTECH</p><span>Security. Software. Design. Training.</span></div><span className="showcase-arrow" aria-hidden="true">↗</span></div>
        <div className="showcase-swatches" aria-hidden="true"><span /><span /><span /></div>
      </a>
    </section>

    <div className="expertise-strip"><span>Security at the foundation.</span><span>Clarity in the design.</span><span>Care in the details.</span></div>

    <section id="services" className="services-section section-shell">
      <div className="section-heading"><div><p className="eyebrow">What I do at MOZYTECH</p><h2>Technical depth.<br /><em>A creative perspective.</em></h2></div><p>My work spans engineering and design. These are the ways I can help bring your next project to life.</p></div>
      <div className="services-grid">{services.map((service, index) => <article key={service.title}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
    </section>

    <section id="projects" className="work-section section-shell">
      <div className="section-heading"><div><p className="eyebrow">01 — My projects & creative work</p><h2>Different disciplines.<br /><em>The same attention to detail.</em></h2></div><p>Web and mobile apps, cloud deployments, logo identities, flyers and automation. Explore the full range of my work below.</p></div>
      <div className="logo-showcase">
        <div className="logo-showcase-heading"><h3>Three logos. Three distinct identities.</h3><p>Original logo designs for MOZYTECH, Wonzay Kollections and Orbit Broadband.</p></div>
        <div className="logo-showcase-grid">{["mozytech-identity", "wonzay-brand-identity", "orbit-broadband-identity"].map((id) => {
          const project = portfolioProjects.find((item) => item.id === id)!;
          return <a key={id} className={`logo-showcase-item logo-${id}`} href={project.imageUrl!} target="_blank" rel="noopener noreferrer" aria-label={`View full ${project.title} logo`}><div className="logo-showcase-image"><Image src={project.imageUrl!} alt={`${project.title} — original logo artwork`} fill sizes="(max-width: 720px) 100vw, 33vw" /></div><div className="logo-showcase-caption"><span>{id === "mozytech-identity" ? "MOZYTECH" : id === "wonzay-brand-identity" ? "Wonzay Kollections" : "Orbit Broadband"}</span><span aria-hidden="true">↗</span></div></a>;
        })}</div>
      </div>
      <ProjectGallery projects={projects} />
    </section>

    <section id="about" className="about-section section-shell">
      <div><p className="eyebrow">02 — The person behind the work</p><h2>Curious by nature.<br /><em>Practical by approach.</em></h2><p className="about-signature">Oluwafemi Moses Durosomo<span>Mozytech · Nigeria</span></p></div>
      <div className="about-copy"><p>I’m an IT support and cybersecurity professional based in Lagos, Nigeria, with a background in Computer Engineering. My experience ranges from repairing and configuring computers to supporting networks, troubleshooting systems and helping people use technology with confidence.</p><p>I hold a Higher National Diploma in Computer Engineering from Osun State Polytechnic, Iree. My career includes technical support at Javadome Group of Companies, school operations and technical support during NYSC, and cybersecurity and ICT instruction at N-Tech Systems since October 2024. Teaching has strengthened my ability to explain complex topics clearly and build practical learning materials.</p><p>Today, I bring that foundation to cloud infrastructure, application development and creative work through MOZYTECH. My projects include a secured AWS e-commerce deployment, a desktop mail application, Python automation, Flutter mobile development, ClassBridge school software, and original logos and full brand identities.</p><div className="career-facts"><div><span>Education</span><strong>HND · Computer Engineering</strong><p>Osun State Polytechnic, Iree · 2020–2022</p></div><div><span>Current teaching role</span><strong>Cybersecurity & ICT Instructor</strong><p>N-Tech Systems, Osogbo · Since October 2024</p></div><div><span>Training</span><strong>Ethical hacking & infrastructure protection</strong><p>APTECH Nigeria · AQSkill · OPSWAT Academy</p></div></div><div className="skills-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
    </section>

    <section id="contact" className="contact-section section-shell">
      <div className="contact-copy"><p className="eyebrow">03 — Make something happen</p><h2>A good project starts<br />with <em>a conversation.</em></h2><p>Have a security concern, an application idea, a brand to build or a training inquiry? Tell me what you have in mind.</p><div className="social-links"><a href="https://github.com/Mozypelly10" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/oluwafemi-durosomo-0559a6146/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://x.com/mozypellyXP" target="_blank" rel="noopener noreferrer">X ↗</a></div></div>
      <div className="contact-form-panel"><ContactForm /></div>
    </section>
    <footer className="site-footer"><a className="wordmark company-wordmark" href="#home"><span className="brand-symbol" aria-hidden="true" />MOZYTECH</a><p>Registered company · Technology & creative services</p><a href="#home">Back to top ↑</a></footer>
  </main>;
}
