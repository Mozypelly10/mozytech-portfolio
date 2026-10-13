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
    id: "wonzay-brand-identity",
    title: "Wonzay Kollections — Brand Identity",
    description: "A complete visual identity for Wonzay Kollections, extending its purple-and-gold monogram into a consistent family of logo layouts, print artwork, packaging and digital templates.",
    techStack: ["Visual Identity", "Logo System", "Typography", "Packaging", "Print Design", "Social Templates"],
    imageUrl: "/projects/wonzay-brand.png",
    category: "Branding & design",
    highlights: ["Primary logo, monogram, wordmark and colour variants", "Business card, letterhead, quotation and invoice artwork", "Clothing tags, packaging, stickers and thank-you cards", "Social templates, email-signature artwork and editable owner handoff"],
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
      normalize(project.title) === normalize(entry.title) ||
      ["githubUrl", "liveUrl"].some((field) => {
        const key = field as "githubUrl" | "liveUrl";
        return Boolean(linkKey(entry[key]) && linkKey(entry[key]) === linkKey(project[key]));
      }),
    );
    if (index < 0) return entry;
    const [project] = remaining.splice(index, 1);
    return { ...entry, ...project,
      ...(entry.id === "classbridge" ? {
        title: entry.title, description: entry.description, techStack: entry.techStack,
        imageUrl: entry.imageUrl, highlights: entry.highlights, note: entry.note,
      } : {}),
      featured: entry.featured || project.featured,
      githubUrl: project.githubUrl || entry.githubUrl,
      liveUrl: project.liveUrl || entry.liveUrl };
  });
  return [...projects, ...remaining];
}
