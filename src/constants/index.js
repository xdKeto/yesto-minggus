import projects1 from "../assets/projects1.png";
import projects2 from "../assets/projects2.png";
import projects3 from "../assets/projects3.png";
import projects4 from "../assets/projects4.png";
import projectYFM from "../assets/project_yfm.png";
import projectNARA from "../assets/project_nara.png";
import projectLEAP from "../assets/project_leap.png";

export const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Tools" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT = {
  greeting: "Hey there! 🖐️",
  introduction: "Fullstack developer crafting immersive, user-friendly web and mobile experiences.",
  resumeLinkText: "Download Resume",
  resumeLink: "/resume.pdf",
};

export const PROJECTS = [
  {
    name: "Poliklinik Hospitel Bantarangin",
    description: "Mobile and Web application for clinic administration and screening systems.",
    image: projectLEAP,
    technologies: ["Flutter", "REST API", "WebSocket", "Figma"],
    link: "",
  },
  {
    name: "Sentra Evangelisasi Pribadi",
    description: "A Learning Management System for Catholic Church",
    image: projects1,
    technologies: ["Svelte", "Flutter", "REST API", "Figma"],
    link: "",
  },
  {
    name: "PetraEats",
    description: "A Canteen Website for PCU Students, final project for a class",
    image: projects2,
    technologies: ["HTML", "Laravel", "Bootstrap", "MySQL"],
    link: "",
  },
  {
    name: "Stellaron Raiders",
    description: "A Space Shooter game for a final group project.",
    image: projects3,
    technologies: ["Java", "Object-Oriented Programming"],
    link: "https://github.com/xdKeto/StellaronRaiders",
  },
  {
    name: "Narasatya Portfolio",
    description: "Portfolio website for 3D Artist, Narasatya",
    image: projectNARA,
    technologies: ["React", "Tailwind"],
    link: "https://narasatya.vercel.app",
  },
  {
    name: "Youth Festival Month 2025",
    description: "Website for a Church event",
    image: projectYFM,
    technologies: ["React", "Tailwind"],
    link: "https://yfm25.vercel.app",
  },

  {
    name: "Portfolio Website",
    description: "Personal portfolio website",
    image: projects4,
    technologies: ["React", "Tailwind"],
    link: "",
  },
];

export const EXPERIENCES = [
  {
    yearRange: "Aug 2024 — Jan 2025",
    title: "Project Based Frontend and Mobile Developer at Cross Network Indonesia",
    location: "Surabaya, Indonesia",
    description: [
      "Developing a client-specific LMS, including user needs analysis and feature mapping.",
      "Designing UI/UX for intuitive navigation and improved user experience.",
      "Building high-performance, responsive cross-platform apps with Flutter and Svelte.",
      "Integrating REST API to enhance functionality and ensure a smooth user experience.",
      "Collaborating with a 5-member team to design scalable and sustainable system architecture based on client requirements.",
    ],
  },
  {
    yearRange: "Jan 2025 — June 2025",
    title: "Mobile Aplication Developer Intern at Cross Network Indonesia",
    location: "Surabaya, Indonesia",
    description: [
      "Designing and developing frontend interfaces for clinic admin and nurse apps using Flutter.",
      "Integrating REST APIs and WebSocket for real-time data flow and secure user sessions.",
      "Building responsive UI components and implementing features like patient registration, queue management, and screening input.",
      "Collaborating with UI/UX designers and backend developers to ensure seamless system integration.",
      "Conducting feature testing and iterations based on user feedback and project requirements.",
    ],
  },
];

export const CONTACT_CONTENT = {
  headline: "IGNITE YOUR IDEAS.",
  description: "I'm committed to working on impactful projects that push creative and innovative boundaries. Let's create something exceptional together.",
  email: "yestoya.lumenchristo@gmail.com",
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/yesto__/",
      ariaLabel: "Follow me on Instagram",
      icon: "RiTwitterXFill",
    },
    {
      platform: "GitHub",
      url: "https://github.com/xdKeto",
      ariaLabel: "View my GitHub profile",
      icon: "RiGithubFill",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/yestoya-l-minggus-409288247/",
      ariaLabel: "Connect with me on LinkedIn",
      icon: "RiLinkedinFill",
    },
  ],
  footerText: `© ${new Date().getFullYear()} Yestoya Lumenchristo Minggus. All rights reserved.`,
};
