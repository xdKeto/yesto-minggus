// constants.js
// Single source of truth untuk konten portfolio Yestoya — TILEBOARD.
// Tidak pakai database: semua data statis di sini, di-import ke komponen.
//
// Field kosong ('' atau []) atau ber-komentar "TODO" berarti aku belum punya
// datanya dari screenshot/design doc yang kamu kasih — isi manual ya.
// Lihat DESIGN-SYSTEM.md §9 (Open Questions) untuk konteks tiap TODO.

// ---------------------------------------------------------------------------
// DESIGN TOKENS
// ---------------------------------------------------------------------------

export const COLORS = {
  lemon: '#FFF0C2',
  paper: '#FFFBF0',
  charcoal: '#25424C',
  ink: '#16262B',
  coral: '#FD8451',
  sienna: '#942911',
  falu: '#772014',
  coralDark: '#C05640', // "Coral Gelap"
  faluLight: '#7A3B30', // "Falu Terang"
};

export const FONTS = {
  displayExpanded: "'AKIRA EXPANDED', sans-serif", // headline besar, judul board (tebakan — konfirmasi ke Figma)
  mono: "'JetBrains Mono', monospace",             // jam, tag kategori, tanggal (tebakan)
  roundedUI: "'SF Pro Rounded', sans-serif",        // body/quote santai (tebakan)
  body: "'SF Pro', sans-serif",                     // UI text reguler (tebakan)
  fallback: "'Inter', sans-serif",                  // fallback web-safe
};

export const GRID = {
  columns: { default: 8, wide: 10 }, // 8 kolom di 1280-1599px, 10 kolom di >=1600px
  gap: 10, // px, antar tile
};

// ---------------------------------------------------------------------------
// PROFILE
// ---------------------------------------------------------------------------

export const PROFILE = {
  name: 'Yesto',
  fullName: 'Yestoya',
  role: 'Software Engineer',
  tagline: 'crafting immersive, user-friendly experiences',
  bigTagline: 'Build with Code and Curiosity', 
  status: 'Open to Work',
  statusActive: true, 
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

export const SOCIALS = [
  { platform: 'GitHub', url: 'https://github.com/xdKeto', icon: 'icon-github.svg' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/yesto-minggus/', icon: 'icon-linkedin.svg', label: 'Connect with me!' },
];

export const GITHUB_USERNAME = 'xdKeto';

export const CTA_DOWNLOAD_CV = {
  label: 'Download CV',
  file: 'resume.pdf',
};

export const NAV_TILES = [
  { id: 'projects', label: 'PROJECTS', color: 'sienna', behavior: 'navigate' },
  { id: 'skills', label: 'SKILLS & TOOLS', color: 'charcoal', behavior: 'expand-in-place' },
  { id: 'experience', label: 'EXPERIENCE', color: 'coralDark', behavior: 'navigate' },
  { id: 'contact', label: 'CONTACT', color: 'faluLight', behavior: 'expand-in-place' },
];

// ---------------------------------------------------------------------------
// SKILLS & TOOLS
// ---------------------------------------------------------------------------

export const SKILLS = [
  { name: 'Python', icon: 'python.svg', category: 'language' },
  { name: 'JavaScript', icon: 'javascript.svg', category: 'language' },
  { name: 'TypeScript', icon: 'typescript.svg', category: 'language' },
  { name: 'React', icon: 'react.svg', category: 'framework' },
  { name: 'Next.js', icon: 'nextjs.svg', category: 'framework' },
  { name: 'PHP', icon: 'php.svg', category: 'language' },
  { name: 'Laravel', icon: 'laravel.svg', category: 'framework' }, 
  { name: 'Dart', icon: 'dart.svg', category: 'language' }, 
  { name: 'Flutter', icon: 'flutter.svg', category: 'mobile' },
  { name: 'Kotlin', icon: 'kotlin.svg', category: 'mobile' },
  { name: 'SQL', icon: 'sql.svg', category: 'database' },
  { name: 'VS Code', icon: 'vscode.svg', category: 'tool' },
  { name: 'Figma', icon: 'figma.svg', category: 'tool' },
];

export const UNRELATED_SKILLS = [
  { category: 'Video Editing', tools: ['DaVinci Resolve', 'CapCut'] },
  { category: 'Graphic Design', tools: ['Figma', 'Photoshop'] },
  { category: 'Music', tools: [] },
];

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

export const PROJECT_CATEGORIES = ['ALL', 'WEB', 'MOBILE', 'PERSONAL'];

// Confirmed via Figma metadata (see FIGMA-REFERENCE.md): the Projects grid has exactly
// 4 wide "featured" slots (~690x255, arranged 2x2) above a row of regular square slots
// (340x297). Which project goes in which slot is not resolved from metadata (those frames
// have no readable text content at this level) — set `featured: true` below on the 4
// projects you want in those slots.

export const PROJECTS = [
  {
    id: 'poliklinik-hospitel-bantarangin',
    name: 'Poliklinik Hospitel Bantarangin',
    category: 'MOBILE',
    tags: ['Flutter', 'Mobile'],
    featured: true, 
    themeColor: '#2E7D5B',
    cover: 'projects/project_leap.png', 
    description: 'A Mobile and Web application for clinic administration and screening systems. Implementing REST APIs and Websocket for real-time data and secure sessions. Collaborated with a 5-member team, conducted feature testing, and improved based on feedback. A part of 6 month university LEAP internship program. \n\n Data that is shown in the media section is mock up data.',
    details: ["Flutter as frontend framework", "Websocket for real-time data", "Postman for API testing", "Figma for design"], // TODO: bullet poin "Project Details"
    media: "projects/poliklinik/**", // pull every image or video inside this directory 
    cta: { label: '', url: '' },
  },
  {
    id: 'sentra-evangelisasi-pribadi',
    name: 'Sentra Evangelisasi Pribadi',
    category: 'MOBILE',
    tags: ['Flutter', 'Mobile'],
    featured: true,
    themeColor: '#B08947',
    cover: 'projects/project_manpro.png',
    description: 'A client specific Learning Management System for a Catholic Organization, from mapping features to UI/UX design. Built responsive, high-performance apps using Flutter and Svelte. Collaborated with a 5-member team to ensure continuous and smooth development based on client needs and feedback.',
    details: ["Flutter as mobile framework", "Svelte as web framework", "Postman for API testing", "Figma for design"],
    media: "projects/sep/**",
    cta: { label: '', url: '' },
  },
  {
    id: 'jam-sync', 
    name: 'JamSync',
    category: 'MOBILE',
    tags: ['Flutter', 'Mobile'],
    featured: true,
    themeColor: '#0B0B14',
    cover: 'projects/project_skripsi.png',
    description: 'A real-time collaborative jam session app that lets musicians sync tempo, chord progressions, and song sections across devices, so everyone stays in sync. Using NTP calculation in each devices to synchronize with each other, which works even offline while playback starts. A part of Final Project/Thesis for university.',
    details: ["Flutter as mobile framework", "NTP for time synchronization", "Firebase for database"],
    media: "projects/jam_sync/**",
    cta: { label: 'Demo Video', url: '' }, 
  },
  {
    id: 'stellaron-raiders', 
    name: 'Stellaron Raiders',
    category: 'PERSONAL',
    tags: ['Java', 'JavaFX'],
    featured: true,
    themeColor: '#0B0B14',
    cover: 'projects/project_stellaron.png',
    description: 'A 2D plane-shooter game made in Java, implementing OOP, integrating sprite animations, and game principles. A part of a Final Project for a subject in University.',
    details: ["JavaFX for game engine", "Sprite animations for assets"],
    media: "projects/oop/**",
    cta: { label: 'Open Github', url: 'https://github.com/xdKeto/StellaronRaiders' }, 
  },
  {
    id: 'guitarcable',
    name: 'GuitarCable',
    category: 'WEB',
    tags: ['Next.js', 'Web'],
    featured: false,
    themeColor: '#B03A2E',
    cover: 'projects/project_cable.png',
    description: 'A product showcase website for a guitar cable provider from Surabaya, Indonesia',
    details: ["Using NextJS as web framework", "Supabase for database", "Figma for design"],
    media: "projects/cable/**",
    cta: { label: 'Visit', url: 'https://cableguitar.com' },
  },
  {
    id: 'narasatya-portfolio',
    name: 'Narasatya Portfolio',
    category: 'WEB',
    tags: ['React', 'Web'],
    featured: false,
    themeColor: '#0B0B0B',
    cover: 'projects/project_nara.png',
    description: 'A portfolio website for Narasatya, 3D Artist from Surabaya Indonesia',
    details: ["React as web framework", "Figma for design"],
    media: "projects/nara/**",
    cta: { label: 'Visit', url: 'https://narasatya.vercel.app' }, 
  },
  {
    id: 'youth-festival-month',
    name: 'Youth Festival Month 2025',
    category: 'WEB',
    tags: ['React', 'Web'],
    featured: false,
    themeColor: '#5B3AA6',
    cover: 'projects/project_yfm.png',
    description: 'A promo website for Youth Festival Month 2025, for a local church event.',
    details: ["React as web framework", "Figma for design"],
    media: "projects/yfm/**",
    cta: { label: 'Visit', url: 'https://yfm-2025.vercel.app' }, 
  },
  {
    id: 'youth-society-pti',
    name: 'Youth Society GKI PTI',
    category: 'WEB',
    tags: ['React', 'Web'],
    featured: false,
    themeColor: '#189DA9',
    cover: 'projects/project_yfm.png',
    description: 'A profile website for Youth Society GKI PTI, for a local church youth society.',
    details: ["React as web framework", "Figma for design"],
    media: "projects/youth/**",
    cta: { label: 'Visit', url: 'https://youth-society-pti.vercel.app' }, 
  },
  {
    id: 'pti-jeopardy',
    name: 'PTI Jeopardy',
    category: 'Personal',
    tags: ['React', 'Web'],
    featured: false,
    themeColor: '#189DA9',
    cover: 'projects/project_yfm.png',
    description: 'A jeopardy-like quiz for a church event.',
    details: ["React as web framework", "Figma for design"],
    media: "projects/jeopardy/**",
    cta: { label: 'Visit', url: 'https://youth-pti-jeopardy.vercel.app' }, 
  },
  {
    id: 'petraeats',
    name: 'PetraEats',
    category: 'PERSONAL',
    tags: ['Laravel', 'Web'],
    featured: false,
    themeColor: '#2255A4',
    cover: 'projects/project_petraeats.png',
    description: 'A food ordering platform for Petra Christian University community. A part of ',
    details: ["Laravel as web framework", "Figma for design"],
    media: "projects/petraeats/**",
    cta: { label: 'Open Github', url: '' }, 
  },
  {
    id: 'personal-portfolio',
    name: 'Personal Portfolio',
    category: 'PERSONAL',
    tags: ['React', 'Personal'],
    featured: false,
    themeColor: '#C9BFA0',
    cover: 'projects/project_porto.png',
    description: 'My personal portfolio website.',
    details: ["React as web framework", "Figma for design"],
    media: "You're here!",
    cta: { label: 'Visit', url: 'https://yesto.vercel.app' },
  },
];

export const CURRENTLY_WORKING_ON = {
  label: 'Currently working on:',
  projectId: 'guitarcable',
  projectName: 'GuitarCable',
};

// ---------------------------------------------------------------------------
// EXPERIENCE
// ---------------------------------------------------------------------------

export const EXPERIENCE = [
  {
    id: 'exp-1',
    role: 'Project Based Frontend & Mobile Developer',
    company: 'Cross Network Indonesia',
    period: 'Aug 2024 — Jan 2025',
    bullets: [
      'Developing a client-specific LMS, including user needs analysis and feature mapping.',
      'Designing UI/UX for intuitive navigation and improved user experience.',
      'Building high-performance, responsive cross-platform apps with Flutter and Svelte.',
      'Integrating REST API to enhance functionality and ensure a smooth user experience.',
      'Collaborating with a 5-member team to design scalable and sustainable system architecture based on client requirements.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Mobile Application Developer Intern',
    company: 'Cross Network Indonesia',
    period: 'Jan 2025 — June 2025',
    bullets: [
      'Designing and developing frontend interfaces for clinic admin and nurse apps using Flutter.',
      'Integrating REST APIs and WebSocket for real-time data flow and secure user sessions.',
      'Building responsive UI components and implementing features like patient registration, queue management, and screening input.',
      'Collaborating with UI/UX designers and backend developers to ensure seamless system integration.',
      'Conducting feature testing and iterations based on user feedback and project requirements.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: 'Aug 2025 - Present',
    bullets: [
      'Built responsive, high-performance web applications as a Freelance Web Developer using Next.js, Laravel, Tailwind CSS, and REST APIs.',
      'Delivered end-to-end projects tailored to specific client needs, including an e-commerce platform for cableguitar.com, a portfolio site for 3D artist Narasatya, and an internal management app for an event organizer.',
      'Focused on clean, scalable code and reliable solutions that align directly with client goals and operational requirements.',
    ],
  },

];

export const UNRELATED_EXPERIENCE = [
  {
    role: 'Administrative Assistant Internship',
    company: 'School of Business and Management, Petra Christian University',
    period: 'Aug 2023 - Apr 2024',
  },
];

export const EXPERIENCE_QUOTE = 'STILL LEARNING, ALWAYS SHIPPING';

export const EXPERIENCE_CAROUSEL_DEFAULTS = {
  autoScroll: true,
  reverse: false,
  speed: 'normal', 
};

// ---------------------------------------------------------------------------
// MODES (Puzzle Mode & Fun Mode) — hanya di Home, kecuali dicatat lain
// ---------------------------------------------------------------------------

export const MODES = {
  puzzle: {
    label: 'Puzzle Mode',
    scope: 'home-only',
    notifyOnEnable: 'Puzzle mode - all components is now draggable!', 
    persistOrderOnDisable: false, 
  },
  fun: {
    label: 'Fun Mode',
    scope: 'home-only',
    // notifyOnEnable: 'Fun mode - ', 
    respectReducedMotion: true,
  },
  mutuallyExclusive: true, 
};
