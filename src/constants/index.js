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
    description: "A Canteen Website for PCU Students, final project for a class",
    image: projects2,
    technologies: ["HTML", "Laravel", "Bootstrap", "MySQL"],
  },
  {
    name: "Stellaron Raiders",
    description: "A Space Shooter game my friends and I built for a final project.",
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
    yearRange: "Aug 2024 — Jan 2024",
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
  
];

export const CONTACT_CONTENT = {
  headline: "IGNITE YOUR IDEAS.",
  description:
    "I'm committed to working on impactful projects that push creative and innovative boundaries. Let's create something exceptional together.",
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
