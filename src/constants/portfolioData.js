export const COLORS = {
  lemon: '#FFF0C2',
  paper: '#FFFBF0',
  charcoal: '#25424C',
  ink: '#16262B',
  coral: '#FD8451',
  sienna: '#942911',
  falu: '#772014',
  coralDark: '#C05640',
  faluLight: '#7A3B30',
};

export const PROFILE = {
  name: 'Yesto',
  role: 'Software Engineer',
  tagline: 'crafting immersive, user-friendly experiences',
  bigTagline: 'Build with Code and Curiosity',
  status: 'Open to Work',
  location: 'Surabaya, Indonesia',
  timezone: 'Asia/Jakarta',
  email: 'yestoya.lumenchristo@gmail.com',
  photo: 'yesto.png',
};

export const EDUCATION = {
  school: 'Petra Christian University',
  program: 'Informatics Engineering',
  period: '2022 - 2026',
};

export const SOCIALS = {
  github: 'https://github.com/xdKeto',
  linkedin: 'https://www.linkedin.com/in/yesto-minggus/',
};

export const SKILLS = [
  ['Python', 'python.svg'], ['JavaScript', 'javascript.svg'], ['TypeScript', 'typescript.svg'],
  ['React', 'react.svg'], ['Next.js', 'nextjs.svg'], ['PHP', 'php.svg'], ['Laravel', 'laravel.svg'],
  ['Dart', 'dart.svg'], ['Flutter', 'flutter.svg'], ['Kotlin', 'kotlin.svg'], ['SQL', 'sql.svg'],
  ['VS Code', 'vscode.svg'], ['Figma', 'figma.svg'],
].map(([name, icon]) => ({ name, icon }));

export const UNRELATED_SKILLS = [
  'Video Editing (DaVinci, CapCut)',
  'Graphic Design (Figma, Photoshop)',
  'Music :)',
];

export const PROJECT_CATEGORIES = ['ALL', 'WEB', 'MOBILE', 'PERSONAL'];

export const CATEGORY_DESCRIPTIONS = {
  ALL: 'A collection of all projects spanning web, mobile, and personal explorations.',
  WEB: 'Web applications, responsive landing pages, and full-stack solutions.',
  MOBILE: 'Cross-platform mobile applications built with Flutter and modern mobile frameworks.',
  PERSONAL: 'Independent experiments, game development, and personal tools.',
};

export const PROJECTS = [
  {
    id: 'poliklinik-hospitel-bantarangin', name: 'Poliklinik Hospitel Bantarangin', category: 'MOBILE',
    tags: ['Flutter', 'Mobile'], featured: true, themeColor: '#2E7D5B', cover: 'projects/project_leap.png',
    description: 'A mobile and web application for clinic administration and screening systems. It uses REST APIs and WebSocket for real-time data and secure sessions. The project was built with a five-member team during a six-month university LEAP internship. The media uses mock-up data.',
    details: ['Flutter as frontend framework', 'WebSocket for real-time data', 'Postman for API testing', 'Figma for design'], media: 'projects/poliklinik/**', cta: null,
  },
  {
    id: 'guitarcable', name: 'GuitarCable', category: 'WEB', tags: ['Next.js', 'Web'], featured: true,
    themeColor: '#B03A2E', cover: 'projects/project_cable.png',
    description: 'A product showcase website for a guitar cable provider from Surabaya, Indonesia.',
    details: ['Next.js as web framework', 'Supabase for database', 'Figma for design'], media: 'projects/cable/**',
    cta: { label: 'Visit', url: 'https://cableguitar.com' },
  },
  {
    id: 'sentra-evangelisasi-pribadi', name: 'Sentra Evangelisasi Pribadi', category: 'MOBILE',
    tags: ['Flutter', 'Mobile'], featured: true, themeColor: '#B08947', cover: 'projects/project_manpro.png',
    description: 'A client-specific learning management system for a Catholic organization, from feature mapping through UI and UX design. It uses Flutter and Svelte for responsive, high-performance applications.',
    details: ['Flutter as mobile framework', 'Svelte as web framework', 'Postman for API testing', 'Figma for design'], media: 'projects/sep/**', cta: null,
  },
  {
    id: 'stellaron-raiders', name: 'Steallron Raiders', category: 'PERSONAL', tags: ['Java', 'Personal'], featured: true,
    themeColor: '#0B0B14', cover: 'projects/prokect_stellaron.png',
    description: 'A 2D plane-shooter game made in Java, with object-oriented programming, sprite animations, and core game principles.',
    details: ['JavaFX for game engine', 'Sprite animations for assets'], media: 'projects/oop/**',
    cta: { label: 'Open GitHub', url: 'https://github.com/xdKeto/StellaronRaiders' },
  },
  {
    id: 'narasatya-portfolio', name: 'Narasatya Portfolio', category: 'WEB', tags: ['Next.js', 'Web'], featured: false,
    themeColor: '#0B0B0B', cover: 'projects/project_nara.png', description: 'A portfolio website for Narasatya, a 3D artist from Surabaya, Indonesia.',
    details: ['Next.js as web framework', 'Figma for design'], media: 'projects/nara/**', cta: { label: 'Visit', url: 'https://narasatya.vercel.app' },
  },
  {
    id: 'youth-festival-month', name: 'Youth Festival Month 2025', category: 'WEB', tags: ['React', 'Web'], featured: false,
    themeColor: '#5B3AA6', cover: 'projects/project_yfm.png', description: 'A promotional website for Youth Festival Month 2025, a local church event.',
    details: ['React as web framework', 'Figma for design'], media: 'projects/yfm/**', cta: { label: 'Visit', url: 'https://yfm-2025.vercel.app' },
  },
  {
    id: 'youth-society-pti', name: 'Youth Society GKI PTI', category: 'WEB', tags: ['React', 'Web'], featured: false,
    themeColor: '#189DA9', cover: 'projects/project_yfm.png', description: 'A profile website for Youth Society GKI PTI, a local church youth society.',
    details: ['React as web framework', 'Figma for design'], media: 'projects/youth/**', cta: { label: 'Visit', url: 'https://youth-society-pti.vercel.app' },
  },
  {
    id: 'pti-jeopardy', name: 'PTI Jeopardy', category: 'PERSONAL', tags: ['React', 'Personal'], featured: false,
    themeColor: '#189DA9', cover: 'projects/project_yfm.png', description: 'A Jeopardy-style quiz made for a church event.',
    details: ['React as web framework', 'Figma for design'], media: 'projects/jeopardy/**', cta: { label: 'Visit', url: 'https://youth-pti-jeopardy.vercel.app' },
  },
  {
    id: 'petraeats', name: 'PetraEats', category: 'PERSONAL', tags: ['Laravel', 'Web'], featured: false,
    themeColor: '#2255A4', cover: 'projects/project_petraeats.png', description: 'A food ordering platform for the Petra Christian University community.',
    details: ['Laravel as web framework', 'Figma for design'], media: 'projects/petraeats/**', cta: null,
  },
  {
    id: 'personal-portfolio', name: 'Personal Portfolio', category: 'PERSONAL', tags: ['React', 'Personal'], featured: false,
    themeColor: '#C9BFA0', cover: 'projects/project_porto.png', description: 'The portfolio website you are exploring right now.',
    details: ['React as web framework', 'Figma for design'], media: '', cta: { label: 'Visit', url: 'https://yesto.vercel.app' },
  },
];

export const CURRENTLY_WORKING_ON = { label: 'Currently working on:', projectId: 'guitarcable', projectName: 'GuitarCable' };

export const EXPERIENCES = [
  {
    id: 'exp-1', role: 'Project Based Frontend & Mobile Developer', company: 'Cross Network Indonesia', period: 'Aug 2024 - Jan 2025', color: COLORS.coral,
    bullets: ['Developing a client-specific LMS, including user needs analysis and feature mapping.', 'Designing UI and UX for intuitive navigation and improved user experience.', 'Building cross-platform apps with Flutter and Svelte.', 'Integrating REST APIs for a smooth user experience.', 'Collaborating with a five-member team on scalable system architecture.'],
  },
  {
    id: 'exp-2', role: 'Mobile Application Developer Intern', company: 'Cross Network Indonesia', period: 'Jan 2025 - Jun 2025', color: COLORS.charcoal,
    bullets: ['Designing and developing clinic admin and nurse apps using Flutter.', 'Integrating REST APIs and WebSocket for real-time data flow.', 'Building patient registration, queue management, and screening features.', 'Collaborating with UI and UX designers and backend developers.', 'Testing and iterating from user feedback and project requirements.'],
  },
  {
    id: 'exp-3', role: 'Freelance Web Developer', company: 'Self-employed', period: 'Aug 2025 - Present', color: COLORS.sienna,
    bullets: ['Building responsive web applications with Next.js, Laravel, Tailwind CSS, and REST APIs.', 'Delivering client projects including cableguitar.com and a 3D artist portfolio.', 'Focusing on clean, scalable code and reliable solutions.'],
  },
];

export const UNRELATED_EXPERIENCE = { role: 'Administrative Assistant Internship', company: 'School of Business and Management, Petra Christian University', period: 'Aug 2023 - Apr 2024' };
export const EXPERIENCE_QUOTE = 'STILL LEARNING, ALWAYS SHIPPING';
