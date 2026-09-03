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
  bigTagline: 'Build with Code and Curiosity', // tile filler besar di Home
  status: 'Open to Work',
  statusActive: true, // toggle ini kalau status berubah, indikator titik ikut berubah warna
  location: 'Surabaya, Indonesia',
  timezone: 'Asia/Jakarta', // buat tile jam WIB live
  email: 'yestoya.lumenchristo@gmail.com',
  photo: 'profile-photo.jpg', // TODO: nama file foto profil (versi warna + duotone, lihat design_md.txt §9)
};

export const EDUCATION = {
  school: 'Petra Christian University',
  program: 'Informatics Engineering',
  period: '2022 - 2026',
};

export const SOCIALS = [
  { platform: 'GitHub', url: '', icon: 'icon-github.svg' }, // TODO: isi URL profil GitHub
  { platform: 'LinkedIn', url: '', icon: 'icon-linkedin.svg', label: 'Connect with me!' }, // TODO: isi URL LinkedIn
];

export const GITHUB_USERNAME = ''; // TODO: dipakai buat fetch contribution graph + link "Open GitHub" di Projects

export const CTA_DOWNLOAD_CV = {
  label: 'Download CV',
  file: 'cv-yestoya.pdf', // TODO: taruh file CV-nya di /public lalu update path ini
};

export const NAV_TILES = [
  { id: 'projects', label: 'PROJECTS', color: 'sienna', behavior: 'navigate' },
  { id: 'skills', label: 'SKILLS & TOOLS', color: 'charcoal', behavior: 'expand-in-place' },
  { id: 'experience', label: 'EXPERIENCE', color: 'coral', behavior: 'navigate' },
  { id: 'contact', label: 'CONTACT', color: 'falu', behavior: 'expand-in-place' },
];

// ---------------------------------------------------------------------------
// SKILLS & TOOLS
// ---------------------------------------------------------------------------

export const SKILLS = [
  { name: 'Python', icon: 'skill-python.svg', category: 'language' },
  { name: 'JavaScript', icon: 'skill-js.svg', category: 'language' },
  { name: 'TypeScript', icon: 'skill-ts.svg', category: 'language' },
  { name: 'React', icon: 'skill-react.svg', category: 'framework' },
  { name: 'Next.js', icon: 'skill-nextjs.svg', category: 'framework' },
  { name: 'PHP', icon: 'skill-php.svg', category: 'language' },
  { name: 'Laravel', icon: 'skill-laravel.svg', category: 'framework' }, // confirmed via Figma layer name "laravel"
  { name: 'Dart', icon: 'skill-dart.svg', category: 'language' }, // confirmed via Figma layer name "dart"
  { name: 'Flutter', icon: 'skill-flutter.svg', category: 'mobile' },
  { name: 'Kotlin', icon: 'skill-kotlin.svg', category: 'mobile' },
  { name: 'SQL', icon: 'skill-sql.svg', category: 'database' },
  { name: 'VS Code', icon: 'skill-vscode.svg', category: 'tool' },
  { name: 'Figma', icon: 'skill-figma.svg', category: 'tool' },
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
    featured: false, // TODO: tentukan 4 project featured (wide tile) — lihat DESIGN-SYSTEM.md §9.5
    themeColor: '#2E7D5B',
    cover: 'project-poliklinik-cover.png', // TODO: cover asli, rasio 1:1 (square) / 2:1 (wide)
    description: '', // TODO
    details: [], // TODO: bullet poin "Project Details"
    media: [], // TODO: nama file untuk carousel media project
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'guitarcable',
    name: 'GuitarCable',
    category: 'WEB',
    tags: ['Next.js', 'Web'],
    featured: false,
    themeColor: '#B03A2E',
    cover: 'project-guitarcable-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: 'https://cableguitar.com' },
  },
  {
    id: 'narasatya-portfolio',
    name: 'Narasatya Portfolio',
    category: 'WEB',
    tags: ['Next.js', 'Web'],
    featured: false,
    themeColor: '#0B0B0B',
    cover: 'project-narasatya-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'sentra-evangelisasi-pribadi',
    name: 'Sentra Evangelisasi Pribadi',
    category: 'MOBILE',
    tags: ['Flutter', 'Mobile'],
    featured: false,
    themeColor: '#B08947',
    cover: 'project-sentra-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'steallron-raiders', // ⚠️ TODO: cek ejaan — design_md.txt bilang "Stellaron Raiders", screenshot bilang "Steallron Raiders"
    name: 'Steallron Raiders',
    category: 'PERSONAL',
    tags: ['Java', 'Personal'],
    featured: false,
    themeColor: '#0B0B14',
    cover: 'project-steallron-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'youth-festival-month',
    name: 'Youth Festival Month 2025',
    category: 'WEB',
    tags: ['React', 'Web'],
    featured: false,
    themeColor: '#5B3AA6',
    cover: 'project-yfm-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'petraeats',
    name: 'PetraEats',
    category: 'WEB',
    tags: ['Laravel', 'Web'],
    featured: false,
    themeColor: '#2255A4',
    cover: 'project-petraeats-cover.png',
    description: '',
    details: [],
    media: [],
    cta: { label: 'Visit', url: '' }, // TODO
  },
  {
    id: 'personal-portfolio',
    name: 'Personal Portfolio',
    category: 'PERSONAL',
    tags: ['React', 'Personal'],
    featured: false,
    themeColor: '#C9BFA0',
    cover: 'project-oldportfolio-cover.png',
    description: '',
    details: [],
    media: [],
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
    period: 'Jan 2025 — Jun 2025',
    bullets: [
      'Building a client LMS with comprehensive UX mapping.',
      'Developing cross-platform applications utilizing Flutter and Svelte.',
      'Integrating secure and scalable REST APIs for data synchronization.',
    ],
  },
  // ⚠️ TODO: screenshot Experience menampilkan 3 entri IDENTIK (placeholder sama persis,
  // tanggal & bullet sama). Konfirmasi: ini satu role yang di-dedupe jadi 1 entri,
  // atau ada beberapa role berbeda di Cross Network Indonesia yang belum diisi?
  // Kalau memang ada role lain, tambahkan objek baru di array ini dengan pola yang sama.
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
  speed: 'normal', // TODO: tentukan skala pasti (slow/normal/fast -> px per detik, atau angka lain)
};

// ---------------------------------------------------------------------------
// MODES (Puzzle Mode & Fun Mode) — hanya di Home, kecuali dicatat lain
// ---------------------------------------------------------------------------

export const MODES = {
  puzzle: {
    label: 'Puzzle Mode',
    scope: 'home-only',
    notifyOnEnable: 'Puzzle mode aktif — geser tile untuk mengatur ulang', // teks notifikasi saat ON
    persistOrderOnDisable: false, // TODO: true kalau urutan mau tetap tersimpan saat mode OFF
  },
  fun: {
    label: 'Fun Mode',
    scope: 'global', // ⚠️ TODO: konfirmasi — tile ini juga muncul di panel Settings board Experience, apakah toggle yang sama?
    respectReducedMotion: true,
  },
  mutuallyExclusive: true, // Puzzle Mode & Fun Mode disarankan tidak aktif bersamaan (lihat INTERACTION-SPEC.md §1.7)
};
