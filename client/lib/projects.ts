export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  createdAt: string;
  category?: string;
  note?: string;
  highlights?: string[];
  aliases?: string[];
}

// Public portfolio content only. Keep credentials and application data out of this file.
export const portfolioProjects: Project[] = [
  {
    id: "classbridge",
    title: "ClassBridge",
    description: "A responsive school management website for growing schools. ClassBridge brings student records, daily attendance, grades and printable reports together with accounts for administrators, assigned-class teachers and parents linked to their children.",
    techStack: ["JavaScript", "HTML", "CSS", "Responsive Web Design"],
    liveUrl: "https://classbridge.mozytech.com.ng",
    category: "School software",
    imageUrl: "/projects/classbridge.png",
    note: "Explore the fictional sample school",
    highlights: ["Student and guardian records, with validated CSV imports", "Attendance registers, score entry and printable report cards", "Assigned-class teacher accounts and linked parent accounts", "Parent notices inside the portal; automatic SMS, WhatsApp and email are not connected", "Optional Google Authenticator for administrators and a sample school to explore"],
    featured: true,
    createdAt: "",
  },
  {
    id: "aws-ecommerce-deployment",
    title: "Wonzay Kollections — AWS E-Commerce Deployment",
    description: "Cloud infrastructure and deployment for a Django e-commerce platform, using EC2, RDS PostgreSQL, Nginx and GitHub Actions. Includes HTTPS, Cloudflare protection and host and access hardening.",
    techStack: ["AWS EC2", "AWS RDS", "Django", "PostgreSQL", "Nginx", "GitHub Actions", "Cloudflare"],
    githubUrl: "https://github.com/Mozypelly10/aws-ecommerce-deployment",
    liveUrl: "https://wonzaykollections.com",
    category: "Cloud infrastructure",
    featured: true,
    createdAt: "",
  },
  {
    id: "family-locator",
    title: "Family Locator",
    description: "A Flutter mobile application with Firebase authentication, location updates in Firestore and a Google Maps interface for viewing family members. Includes tracking controls and emergency-contact management.",
    techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Google Maps"],
    category: "Mobile application",
    highlights: ["Flutter interface for mobile devices", "Firebase authentication and Firestore location updates", "Google Maps view and tracking controls", "Emergency-contact management"],
    note: "Mobile project · public download coming soon",
    featured: false,
    createdAt: "",
  },
  {
    id: "mailer-app",
    title: "Bulk Mailer",
    description: "An email campaign project pairing a Windows desktop interface with an Express backend and Amazon SES. Implements domain verification, contact validation, suppression lists and paced background sending.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Amazon SES", "C#", "WPF", ".NET 8"],
    githubUrl: "https://github.com/Mozypelly10/Mailer-App",
    category: "Desktop application",
    note: "In development",
    featured: false,
    createdAt: "",
  },
  {
    id: "scrapper-tools",
    title: "Scrapper Tools",
    description: "A Python command-line web scraping toolkit that extracts content by HTML tag, class or ID, processes table data, exports JSON or CSV and keeps a timestamped scrape history.",
    techStack: ["Python", "Web Scraping", "JSON", "CSV"],
    githubUrl: "https://github.com/Mozypelly10/scrapper-tools",
    category: "Automation",
    featured: false,
    createdAt: "",
  },
  {
    id: "pdf-video-compressor",
    title: "PDF & Video Compressor",
    description: "A locally run Streamlit media tool for compressing PDFs and videos, generating editable captions and exporting subtitles or captioned video.",
    techStack: ["Python", "Streamlit", "FFmpeg", "Ghostscript", "Faster Whisper"],
    githubUrl: "https://github.com/Mozypelly10/PDF-VIDEO-compressor",
    category: "Media tools",
    note: "Forked open-source project",
    featured: false,
    createdAt: "",
  },
  {
    id: "telegram-bot",
    title: "Telegram Bot",
    description: "A personal Python Telegram bot with an asynchronous command handler and a welcome response, built as a foundation for messaging automation.",
    techStack: ["Python", "python-telegram-bot", "Telegram API"],
    githubUrl: "https://github.com/Mozypelly10/telegram-bot",
    category: "Messaging automation",
    note: "Prototype",
    featured: false,
    createdAt: "",
  },
  {
    id: "mozytech-identity",
    title: "MOZYTECH — My Brand Identity",
    description: "The visual identity I designed for my own company: a cyan-and-black M monogram and a rounded wordmark. A personal example of my logo design and approach to building a recognisable brand.",
    techStack: ["Logo Design", "Monogram", "Brand Identity"],
    imageUrl: "/brand/mozytech-logo.jpg",
    category: "Branding & design",
    note: "My company · my visual identity",
    featured: false,
    createdAt: "",
    highlights: ["Cyan-and-black company mark", "M monogram with the MOZYTECH wordmark", "A consistent identity for my company’s communications"],
  },
  {
    id: "orbit-broadband-identity",
    title: "Orbit Broadband — Logo Design",
    description: "A broadband identity built around an orbital symbol that takes the place of the O in Orbit. Cyan and coral accents, wireless signal details and the supporting wordmark communicate connectivity.",
    techStack: ["Logo Design", "Typography", "Telecommunications Branding"],
    imageUrl: "/projects/orbit-logo.jpg",
    category: "Branding & design",
    note: "Logo & brand identity",
    featured: false,
    createdAt: "",
  },
  {
    id: "monthly-greeting-flyers",
    title: "Monthly Greetings & Social Flyers",
    description: "Monthly greeting and goodwill flyers designed for sharing with people and communities. This work combines messages, layout, typography and branded visuals for social communication.",
    techStack: ["Flyer Design", "Social Graphics", "Typography", "Layout"],
    category: "Flyers & social design",
    note: "Graphic design collection",
    featured: false,
    createdAt: "",
  },
  {
    id: "mozytech-portfolio",
    title: "MOZYTECH — Portfolio Website",
    description: "My portfolio website, bringing software, mobile apps, cloud projects and creative work into one responsive experience, with project filters, case-study details and contact enquiries.",
    techStack: ["Next.js", "React", "TypeScript", "CSS"],
    category: "Web application",
    githubUrl: "https://github.com/Mozypelly10/mozytech-portfolio",
    note: "Web design & development",
    featured: false,
    createdAt: "",
  },
  {
    id: "wonzay-brand-identity",
    title: "Wonzay Kollections — Full Branding",
    aliases: ["Wonzay Kollections — Brand Identity"],
    description: "A branding project bringing together logo design, typography, stationery, packaging artwork and social templates for Wonzay Kollections, with an editable handoff for the business owner.",
    techStack: ["Visual Identity", "Logo System", "Typography", "Packaging", "Print Design", "Social Templates"],
    category: "Branding & design",
    highlights: ["Primary logo, monogram, wordmark and colour variants", "Business card, letterhead, quotation and invoice artwork", "Clothing tags, packaging, stickers and thank-you cards", "Social templates, email-signature artwork and editable owner handoff"],
    note: "Brand identity, packaging & digital design",
    featured: false,
    createdAt: "",
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function linkKey(value?: string | null) {
  return value?.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");
}

// Retain database content, adding catalogue entries only when they are missing.
export function mergeProjects(existing: Project[]): Project[] {
  const remaining = [...existing];
  const projects = portfolioProjects.map((entry) => {
    const index = remaining.findIndex((project) =>
      project.id === entry.id ||
      [entry.title, ...(entry.aliases || [])].some((title) => normalize(project.title) === normalize(title)) ||
      ["githubUrl", "liveUrl"].some((field) => {
        const key = field as "githubUrl" | "liveUrl";
        return Boolean(linkKey(entry[key]) && linkKey(entry[key]) === linkKey(project[key]));
      }),
    );
    if (index < 0) return entry;
    const [project] = remaining.splice(index, 1);
    return { ...entry, ...project,
      ...(entry.id === "wonzay-brand-identity" ? {
        title: entry.title, description: entry.description, imageUrl: undefined,
        featured: false, note: entry.note,
      } : {}),
      ...(entry.id === "classbridge" ? {
        title: entry.title, description: entry.description, techStack: entry.techStack,
        imageUrl: entry.imageUrl, highlights: entry.highlights, note: entry.note,
      } : {}),
      featured: entry.id === "wonzay-brand-identity" ? false : entry.featured || project.featured,
      githubUrl: project.githubUrl || entry.githubUrl,
      liveUrl: project.liveUrl || entry.liveUrl };
  });
  return [...projects, ...remaining];
}
