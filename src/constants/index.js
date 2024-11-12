import projects1 from "../assets/projects1.png";
import projects2 from "../assets/projects2.png";
import projects3 from "../assets/projects3.png";
import projects4 from "../assets/projects4.png";

export const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Tools" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT = {
  greeting: "Hey there! 🖐️",
  introduction:
    "Fullstack developer crafting immersive, user-friendly web and mobile experiences.",
  resumeLinkText: "Download Resume",
  resumeLink: "/resume.pdf",
};

export const PROJECTS = [
  {
    name: "Sentra Evangelisasi Pribadi",
    description: "A Learning Management System for Catholic Church",
    image: projects1,
    technologies: ["Svelte", "Flutter", "REST API", "Figma"],
  },
  {
    name: "PetraEats",
    description: "A Canteen Website for PCU Students, a final project for a class",
    image: projects2,
    technologies: ["HTML", "CSS", "Bootstrap", "MySQL"],
  },
  {
    name: "Stellaron Raiders",
    description: "A simple Space Shooter game my friends and I built in Java for our 2nd-semester final project.",
    image: projects3,
    technologies: ["Java", "Object-Oriented Programming"],
  },

  {
    name: "Portfolio Website",
    description: "Personal portfolio website",
    image: projects4,
    technologies: ["React", "Tailwind"],
  },
];

export const EXPERIENCES = [
  {
    yearRange: "Aug 2024 — Now",
    title: "Project Based Frontend and Mobile Developer at Cross Network Indonesia",
    location: "Surabaya, Indonesia",
    description: [
      "Developing a client-specific learning management system (LMS), covering user needs analysis and key feature mapping.",
      "Designing UI/UX focused on ease of navigation and intuitive interaction for enhanced user experience.",
      "Using Flutter and Svelte to build high-performance, responsive, and efficient cross-platform apps.",
      "Integrating REST API to enhance functionality and ensure a smooth user experience.",
      "Collaborating with a 5-member team to design system architecture based on client requirements, ensuring scalability and sustainability.",
    ],
  },
  
];

export const CONTACT_CONTENT = {
  headline: "LET'S WORK ON SOMETHING GREAT",
  description:
    "I’m thrilled to work on projects that challenge the norm and make a real difference. Let’s create something innovative and extraordinary together.",
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
