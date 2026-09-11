# Master Implementation Plan: Complete Portfolio Revamp (Metro / Tileboard)

> **Document Version**: 2.0  
> **Target Audience**: Autonomous Implementation Agent  
> **Status**: Approved for Execution  
> **Design Source**: Figma (`Porto` - `yHsiW0QULjU8eEBc1nwEWI`), `agent_guides/figma_export/`  
> **Primary Philosophy**: Edge-to-edge desktop-first Windows Metro / Tileboard interface. Solid color blocks, bold typography, crisp grout lines (gap 10px), no generic shadows/glassmorphism/AI slop. Strict micro-animations and state transitions for entering and exiting.

---

## Table of Contents
1. [Core Design System & Tokens](#1-core-design-system--tokens)
2. [Architecture & State Machine](#2-architecture--state-machine)
3. [Board 1: Home Board Specification](#3-board-1-home-board-specification)
   - [3.1 Normal Grid Layout](#31-normal-grid-layout)
   - [3.2 Expand-in-Place: Skills & Tools](#32-expand-in-place-skills--tools)
   - [3.3 Expand-in-Place: Contact](#33-expand-in-place-contact)
   - [3.4 Puzzle Mode & Fun Mode](#34-puzzle-mode--fun-mode)
   - [3.5 Clock & GitHub Contribution Calendar](#35-clock--github-contribution-calendar)
4. [Board 2: Projects Board Specification](#4-board-2-projects-board-specification)
   - [4.1 Header & Category Filter Bar](#42-header--category-filter-bar)
   - [4.2 Grid Area & Featured Projects](#42-grid-area--featured-projects)
   - [4.3 In-Place Project Detail View](#43-in-place-project-detail-view)
   - [4.4 Auto-Scrolling Media Carousel](#44-auto-scrolling-media-carousel)
5. [Board 3: Experience Board Specification](#5-board-3-experience-board-specification)
   - [5.1 3-Column Structure](#51-3-column-structure)
   - [5.2 Interactive Settings Panel](#52-interactive-settings-panel)
   - [5.3 Seamless Auto-Scrolling Carousel](#53-seamless-auto-scrolling-carousel)
   - [5.4 Education & Unrelated Experience](#54-education--unrelated-experience)
6. [Asset Pipeline & Dynamic Glob Mapping](#6-asset-pipeline--dynamic-glob-mapping)
7. [Dependencies & Setup](#7-dependencies--setup)
8. [Step-by-Step Execution Sequence](#8-step-by-step-execution-sequence)
9. [Verification & Acceptance Checklist](#9-verification--acceptance-checklist)

---

## 1. Core Design System & Tokens

### 1.1 Color Palette
The design strictly employs solid, un-blurred, high-contrast colors. No gradients, no frosted glass.
```javascript
export const COLORS = {
  lemon: '#FFF0C2',      // Base bright background, bright contrast tiles
  paper: '#FFFBF0',      // Near white, text on dark tiles, button backgrounds
  charcoal: '#25424C',   // Deep slate blue-green, primary dark neutral tile
  ink: '#16262B',        // Near black, board background / grout lines, contrast base
  coral: '#FD8451',      // Primary vibrant orange-coral, CTA & accent
  sienna: '#942911',     // Deep rustic red, Experience & Projects nav tile
  falu: '#772014',       // Dark maroon, Contact nav tile & category accents
  coralDark: '#C05640',  // Dark coral, hover/pressed state
  faluLight: '#7A3B30',  // Light falu accent
  greenStatus: '#22C55E' // Active status pulse indicator
};
```

### 1.2 Typography & Font Hierarchy
Fonts must be declared locally via `@font-face` in `src/index.css` pointing to `src/assets/fonts/`:
1. **AKIRA EXPANDED** (`Akira Expanded Demo.woff2`)
   - CSS Family: `'Akira Expanded', sans-serif`
   - Role: Hero headlines (`HELLO, I'M YESTO`), board headers (`PROJECTS`, `EXPERIENCES`), primary nav tiles (`SKILLS & TOOLS`, `CONTACT`, `PROJECTS`, `EXPERIENCE`).
   - Style: All-caps, wide tracking, bold impact.
2. **JetBrains Mono** (`JetBrainsMono-Medium.ttf`)
   - CSS Family: `'JetBrains Mono', monospace`
   - Role: Monospace data, WIB clock (`18:23 WIB`), tags (`FLUTTER`, `MOBILE`, `WEB`), dates (`JAN 2025 — JUN 2025`, `2022 - 2026`), status labels (`STATUS:`, `Open to Work`).
3. **SF Pro Rounded** (`FontsFree-Net-SF-Pro-Rounded-Bold.ttf`)
   - CSS Family: `'SF Pro Rounded', sans-serif`
   - Role: Body/quote text: tagline (`crafting immersive, user-friendly experiences`), quote tile (`Build with Code and Curiosity`, `STILL LEARNING, ALWAYS SHIPPING`).
4. **SF Pro Display** (`SF-Pro-Display-Medium.otf`) / **Inter**
   - CSS Family: `'SF Pro', 'Inter', sans-serif`
   - Role: UI text, button labels (`Home`, `Close`, `Visit`, `Connect with me!`), company/university names, bullet descriptions.

### 1.3 Grid Geometry
- **Gap**: Fixed `10px` between all tiles.
- **Board Outer Padding**: `16px` all around.
- **Corner Radius**: Sharp/minimal: `rounded-[4px]` or `rounded-[6px]` (Metro standard).
- **Desktop Viewport**: Standard design canvas is `1920×1080` (16:9).
  - Screen width $\ge 1280\text{px}$ to $1599\text{px}$: 8-column layout.
  - Screen width $\ge 1600\text{px}$: 10-column layout (or centered 1920px container with fixed proportions).
  - Height: Edge-to-edge fills 100vh on desktop, preventing outer window scroll where appropriate.

---

## 2. Architecture & State Machine

The website is a Single Page Application (SPA) driven by React state and Framer Motion layout animations.

```
                    ┌─────────────────────────┐
                    │      App.jsx (Root)     │
                    │   activeBoard: 'home'   │
                    │  | 'projects' | 'exp'   │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
  │  HomeBoard   │        │ProjectsBoard │        │ExperienceBrd │
  └──────┬───────┘        └──────┬───────┘        └──────┬───────┘
         │                       │                       │
         ├─ Expanded Skills      ├─ Category Filter      ├─ Settings
         ├─ Expanded Contact     ├─ Featured Grid        ├─ Auto-Carousel
         ├─ Puzzle Mode          └─ In-Place Detail      └─ Edu & Soft Exp
         └─ Fun Mode
```

### Board Transition Mechanism
- `App.jsx` stores `currentBoard` (`'home'`, `'projects'`, `'experience'`).
- Board switching triggers an `<AnimatePresence mode="wait">` transition:
  - Exit: Fade scale-down (`opacity: 0, scale: 0.98, transition: { duration: 0.25 }`).
  - Enter: Staggered tile entrance (`opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' }`).
- A persistent `← Home` button tile (size 150×150 or 1×1 tile) is located in the top-left of both `ProjectsBoard` and `ExperienceBoard` to return immediately to `HomeBoard`.

---

## 3. Board 1: Home Board Specification

Reference Figma Node: `4033:688` (Screenshot: `agent_guides/figma_export/Home.png`).

### 3.1 Normal Grid Layout
The desktop grid consists of 5 logical rows and 8-10 columns:

| Tile Name | Grid Span / Approx Size | Background Color | Content & Typography | Behavior / Target |
|---|---|---|---|---|
| **Profile Photo** | Col 1-2, Row 1-2 (~340×399) | `#FFFFFF` / transparent | Image `src/assets/yesto.png`, cropped cleanly, duotone/clean portrait. | Subtle hover micro-tilt on mouse move. |
| **Hero Greeting** | Col 3-7, Row 1 (~1039×200) | `charcoal` (`#25424C`) | Text 1: `HELLO, I'M ` (`paper`) + `YESTO` (`coral`) in `Akira Expanded`.<br>Text 2: `Software Engineer` (`paper`) + `crafting immersive, user-friendly experiences` (`paper`) in `SF Pro Rounded`. | Static banner. |
| **WIB Clock** | Col 8, Row 1 (~240×200) | `coral` (`#FD8451`) | `18:23` (big, `paper`, `JetBrains Mono`) + `WIB` (subtitle). | Live auto-updating clock (Asia/Jakarta timezone). |
| **Location** | Col 9, Row 1 (~239×200) | `charcoal` (`#25424C`) | Pin Icon (`src/assets/icons/location.svg`) + `Surabaya, Indonesia` (`paper`, `SF Pro`). | Static informative tile. |
| **Education** | Col 3-5, Row 2 (~514×190) | `lemon` (`#FFF0C2`) | Cap Icon (`education.svg`) + `Petra Christian University` (`charcoal`, bold) + `Informatics Engineering` (`charcoal`, `JetBrains Mono`). | Static credential tile. |
| **Status (Work)** | Col 6-7, Row 2 (~514×190) | `sienna` (`#942911`) | Green pulsing status dot (`#22C55E`) + `STATUS:` (`paper`) + `Open to Work` (italic display, `lemon`). | Static status tile. |
| **Skills & Tools (Collapsed)** | Col 1-2, Row 3 (~340×313) | `charcoal` (`#25424C`) | Text `SKILLS & TOOLS` (`lemon`, `Akira Expanded`) + diagonal arrow top-right (`arrow_open.svg`). | **Click**: triggers expand-in-place state (`expandedTile = 'skills'`). |
| **GitHub CTA** | Col 3-4, Row 3 (~252×151) | `faluLight` (`#7A3B30`) | GitHub icon (`github.svg`) in circle + `Github` (`paper`). | **Click**: Opens `https://github.com/xdKeto` in new tab. |
| **LinkedIn CTA** | Col 5, Row 3 (~252×151) | `coral` (`#FD8451`) | `Connect with me!` (`paper`) + LinkedIn icon (`linkedin.svg`) in circle. | **Click**: Opens `https://www.linkedin.com/in/yesto-minggus/` in new tab. |
| **Download CV** | Col 6-7, Row 3 (~515×151) | `charcoal` (`#25424C`) | Download icon (`downloadsvg.svg`) + `Click to` (`paper`) + `Download CV` (italic display, `lemon`). | **Click**: Downloads `public/resume.pdf`. |
| **Projects Nav Tile** | Col 8-10, Row 2-3 (~489×313) | `sienna` (`#942911`) | Arrow icon top-right (`arrow_open.svg`) + `PROJECTS` (bottom, `lemon`, `Akira Expanded`). | **Click**: Navigates to `ProjectsBoard`. |
| **Quote Banner** | Col 3-7, Row 4 (~1039×151) | `lemon` (`#FFF0C2`) | `Build with Code and Curiosity` (`charcoal`, italic, `SF Pro Rounded`). | Static decorative banner. |
| **Contact (Collapsed)** | Col 1-2, Row 4-5 (~340×313) | `falu` (`#772014`) | Arrow icon top-right + `CONTACT` (bottom, `lemon`, `Akira Expanded`). | **Click**: triggers expand-in-place state (`expandedTile = 'contact'`). |
| **GitHub Contribution Graph** | Col 3-7, Row 5 (~1039×316) | `ink` (`#16262B`) | Live SVG GitHub contribution calendar for `xdKeto` with dark theme styling. | Live widget. |
| **Experience Nav Tile** | Col 8-10, Row 4 (~489×313) | `coralDark` (`#C05640`) | Arrow icon top-right + `EXPERIENCE` (bottom, `lemon`, `Akira Expanded`). | **Click**: Navigates to `ExperienceBoard`. |
| **Puzzle Mode Toggle** | Col 8, Row 5 (~239×185) | `charcoal` (`#25424C`) | `Puzzle Mode` (`paper`). Radio/active indicator when ON. | **Click**: Toggles Puzzle Mode (re-orderable tiles). |
| **Fun Mode Toggle** | Col 9, Row 5 (~240×185) | `lemon` (`#FFF0C2`) | `Fun Mode` (`charcoal`). Active state when ON. | **Click**: Toggles Fun Mode (spring chaos floating). |

---

### 3.2 Expand-in-Place: Skills & Tools
Reference Figma Node: `4046:604` (Screenshot: `agent_guides/figma_export/Skill & Tools.png`).

1. **Trigger**: User clicks the `SKILLS & TOOLS` tile.
2. **Behavior**:
   - `expandedTile` state changes to `'skills'`.
   - The tile smoothly expands horizontally across columns 1 through 7 across rows 3-4 (replaces GitHub, LinkedIn, Download CV, and the Quote banner).
   - Collapse button / arrow appears at the top-right (`arrow_close.svg`).
3. **Internal Content**:
   - **Left**: Header `SKILLS &` / `TOOLS` in `Akira Expanded` (`lemon`).
   - **Top Row Icons (72×72 cards, white/colored backgrounds)**:
     - Python, JavaScript, TypeScript, React, Next.js, PHP, Laravel, Dart, Flutter, Kotlin.
   - **Bottom Row Icons**:
     - SQL, VS Code, Figma.
   - **Right Side Panel**:
     - Header: `Software Unrelated Skills:` (`lemon`, `JetBrains Mono`).
     - Bullet points:
       - `• Video Editing (Davinci, Capcut)`
       - `• Graphic Design (Figma, Photoshop)`
       - `• Music :)`
4. **Collapse**: Clicking the collapse button or clicking outside returns the tile to its collapsed 2×2 state with an easeOut spring transition.

---

### 3.3 Expand-in-Place: Contact
Reference Figma Node: `4046:643` (Screenshot: `agent_guides/figma_export/Contact.png`).

1. **Trigger**: User clicks the `CONTACT` tile.
2. **Behavior**:
   - `expandedTile` state changes to `'contact'`.
   - The tile smoothly expands horizontally across row 5 (replacing the GitHub contribution graph).
   - Height matches the collapsed height (~313px), width spans to column 7.
3. **Internal Content**:
   - **Top Left**: `CONTACT` in `Akira Expanded` (`lemon`).
   - **Top Right**: Collapse arrow (`arrow_close.svg`).
   - **Center**: Giant headline `LETS BUILD SOMETHING` in `paper` / `lemon` (`Akira Expanded`).
   - **Bottom**: Email address `yestoya.lumenchristo@gmail.com` in `JetBrains Mono` (`paper`).
   - **Interaction**: Clicking the email copies it to clipboard and shows a toast `"Email copied to clipboard!"` or triggers `mailto:yestoya.lumenchristo@gmail.com`.
4. **Mutual Exclusivity**: If `Contact` is expanded while `Skills & Tools` was open (or vice versa), the previous one collapses automatically.

---

### 3.4 Puzzle Mode & Fun Mode
Controlled via dedicated state in `HomeBoard.jsx`:

#### A. Puzzle Mode
- **State**: `isPuzzleMode: boolean` (default `false`).
- **Activation**:
  - Toast notification appears: *"Puzzle mode - all components are now draggable!"*.
  - All Home tiles (except the Puzzle and Fun mode toggle tiles) become draggable using Framer Motion `drag` and `dragConstraints`.
  - Cursor changes to `cursor-grab` (and `cursor-grabbing` on mousedown).
- **Deactivation**:
  - Tiles animate back to their standard grid layout positions with a spring animation (`type: 'spring', damping: 20, stiffness: 200`).

#### B. Fun Mode
- **State**: `isFunMode: boolean` (default `false`).
- **Activation**:
  - Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`. If enabled, fun mode applies a subtle color vibration rather than violent physical movement.
  - Generates continuous randomized spring offsets per tile (`x: ±15px, y: ±15px, rotate: ±3deg`) refreshed on an interval (every 1.5–2s).
  - The toggle button remains fixed and elevated (`z-50`) so the user can easily toggle it off at any time.
- **Mutual Exclusivity**: Turning on Puzzle Mode immediately turns off Fun Mode, and vice versa.

---

### 3.5 Clock & GitHub Contribution Calendar

#### Clock Implementation (`ClockTile.jsx`)
- Uses `Intl.DateTimeFormat` configured with timezone `Asia/Jakarta`.
- Format: `HH:mm` (e.g. `18:23`) in large letters + `WIB` in smaller monospace font.
- Updates smoothly on a 1000ms `setInterval`.

#### GitHub Calendar Implementation (`GithubContributionTile.jsx`)
- Uses `react-github-calendar` fetching data for username `xdKeto`.
- Custom theme configured to match the dark Metro theme:
  - Background: `#16262B` (`ink`)
  - Level 0: `#1E333A` (empty day cell)
  - Level 1: `#0E4429`
  - Level 2: `#006D32`
  - Level 3: `#26A641`
  - Level 4: `#39D353`
- Fallback state: If GitHub API is rate-limited or offline, renders a styled dark grid placeholder with label *"GitHub contributions live sync"*.

---

## 4. Board 2: Projects Board Specification

Reference Figma Nodes: `4040:519` (Grid) & `4043:2` (Detail)  
Screenshots: `agent_guides/figma_export/Projects.png` & `agent_guides/figma_export/Project Detail.png`.

### 4.1 Header & Category Filter Bar
- **Top Row (Fixed)**:
  - `← Home` Tile (Col 1, ~150×150): Sienna background (`#942911`), arrow left + `Home` text. Returns to Home board.
  - Filler Tile (Col 2): Charcoal solid box.
  - Title Banner (Col 3-8, ~1319×150): Lemon background (`#FFF0C2`), title `PROJECTS` in `Akira Expanded` (`charcoal`).
  - Filler Tile (Col 9-10): Falu solid box.
- **Category Tab Bar (Fixed)**:
  - Tabs: `ALL`, `WEB`, `MOBILE`, `PERSONAL`.
  - Active Tab Styling: Solid background (`lemon` for ALL, `coral` for WEB, `sienna` for MOBILE, `falu` for PERSONAL), bold text.
  - Right Banner: Category description text bar in `charcoal` (`#25424C`), displaying dynamic descriptions:
    - ALL: `"A collection of all projects spanning web, mobile, and personal explorations."`
    - WEB: `"Web applications, responsive landing pages, and full-stack solutions."`
    - MOBILE: `"Cross-platform mobile applications built with Flutter and modern mobile frameworks."`
    - PERSONAL: `"Independent experiments, game development, and personal tools."`

---

### 4.2 Grid Area & Featured Projects
The grid is independently scrollable (`overflow-y: auto`) with a custom minimal scrollbar.

#### The 4 Featured Wide Tiles (Arranged 2×2 at the top of the grid)
Dimensions: ~690×255 each (wide 2×1 span).
1. **Poliklinik Hospitel Bantarangin**
   - Category: `MOBILE` | Tags: `FLUTTER`, `MOBILE`
   - Background Color: `#2E7D5B` (Clinic green)
   - Center Visual: Circular Hospitel emblem/logo (`src/assets/projects/poliklinik/...` or logo)
   - Bottom Left: Tags + Title `Poliklinik Hospitel Bantarangin`
   - Top Right: External/expand arrow (`arrow_open.svg`)
2. **GuitarCable**
   - Category: `WEB` | Tags: `NEXTJS`, `WEB`
   - Background Color: `#B03A2E` (GuitarCable red)
   - Center Visual: Stylized "GC" logo
   - Bottom Left: Tags + Title `GuitarCable`
   - Top Right: Arrow icon
3. **Sentra Evangelisasi Pribadi**
   - Category: `MOBILE` | Tags: `FLUTTER`, `MOBILE`
   - Background Color: `#B08947` (Gold/bronze)
   - Center Visual: Circular SEP emblem
   - Bottom Left: Tags + Title `Sentra Evangelisasi Pribadi`
   - Top Right: Arrow icon
4. **Steallron Raiders**
   - Category: `PERSONAL` | Tags: `JAVA`, `PERSONAL`
   - Background Color: `#0B0B14` (Starry deep space)
   - Center Visual: Pixel-art spaceship firing laser sprite
   - Bottom Left: Tags + Title `Steallron Raiders`
   - Top Right: Arrow icon

#### Regular Square Tiles & Utilities
Dimensions: ~340×297 each.
- **Narasatya Portfolio** (`WEB`, black theme `#0B0B0B`, white typography).
- **Open GitHub** Tile (Lemon theme `#FFF0C2`, dark GitHub icon in circle + `Open Github`, arrow top-right).
- **Youth Festival Month** (`WEB`, purple theme `#5B3AA6`, YFM logo).
- **PetraEats** (`WEB`, blue theme `#2255A4`, PetraEats swirl logo).
- **Personal Portfolio** (`PERSONAL`, taupe theme `#C9BFA0`, geometric logo).
- **Filler Blank Tile** (Charcoal `#25424C`).
- **Currently Working On** Tile:
  - Color: Reddish brown `#772014`
  - Content: Pulsing green status badge + `Currently working on:` (`paper`, `JetBrains Mono`) + `GuitarCable` (italic bold, `lemon`).
- **Rightmost Decorative Filler**: Tall vertical coral strip (`#FD8451`) spanning the full height.

---

### 4.3 In-Place Project Detail View
Triggered when user clicks any project tile (e.g. Poliklinik, GuitarCable, etc.).

1. **Tab Bar Transformation**:
   - The category tabs morph in-place into:
     - **Close Button** (Col 1-2, ~310×50): Lemon background (`#FFF0C2`), `Close` (`charcoal`, bold).
     - **Project Name Header** (Col 3-8): Charcoal background, Project Name in white `Akira Expanded` / `SF Pro`.
2. **Detail Layout**:
   - **Top Left Box** (Col 1-6, ~250px height): Solid colored tile (`sienna` or project theme color) containing the full project description text from `constants.js`.
   - **Bottom Left Box** (Col 1-6, ~600px height): The **Project Media Carousel** (`charcoal` background), auto-playing images and mockups from `src/assets/projects/{id}/**`.
   - **Top Right Box** (Col 7-8): Lemon CTA Tile:
     - Shows CTA button (`Open Github` with GitHub icon, or `Visit` with link icon).
     - Clicking opens the external project URL in a new tab.
   - **Bottom Right Box** (Col 7-8): Sienna Bullet Points Tile:
     - Header: `Project Details:`
     - Bullet points rendered cleanly with white dot bullets (e.g. *"Flutter as frontend framework"*, *"Websocket for real-time data"*, etc.).
   - **Rightmost Decorative Filler**: Consistent vertical coral bar.
3. **Closing**: Clicking `Close` restores the category bar and project grid with reverse animation without resetting the active category filter.

---

### 4.4 Auto-Scrolling Media Carousel
Component: `ProjectMediaCarousel.jsx`
- Loads all images inside the project's folder using Vite's dynamic glob.
- If images exist:
  - Continuously and smoothly loops through images using Framer Motion or an infinite scroll slider.
  - Cross-fades or slides horizontally every 3.5 seconds.
  - Pauses on mouse hover so the user can inspect screenshots.
- If no media folder (e.g. `You're here!`): Displays an aesthetic typographic placeholder: *"Interactive Web Experience - You're exploring it right now!"*.

---

## 5. Board 3: Experience Board Specification

Reference Figma Node: `4041:775` (Screenshot: `agent_guides/figma_export/Experience.png`).

### 5.1 3-Column Structure
- **Top Row**:
  - `← Home` Tile (Col 1, ~150×150): Sienna background (`#942911`).
  - Filler Tile (Col 2): Charcoal box.
  - Title Banner (Col 3, right-aligned, ~652×150): Lemon background (`#FFF0C2`), text `EXPERIENCES` in `Akira Expanded` (`charcoal`).

### 5.2 Interactive Settings Panel
Located in the Left Column:
- **Title**: `Settings:` (`paper`, bold `SF Pro`).
- **Control 1: Stop Carousel**:
  - Interactive toggle button: toggles between `Playing ▶` and `Paused ⏸`.
  - Immediately pauses or resumes the middle auto-scroll.
- **Control 2: Carousel Speed**:
  - Interactive stepper: toggles between `Normal (1x)`, `Fast (2x)`, and `Slow (0.5x)`.
- **Control 3: Reverse**:
  - Toggle button: reverses the vertical scroll direction (Upwards $\leftrightarrow$ Downwards).
- **Control 4: Fun Mode**:
  - Toggle button: triggers floating playful physics on experience tiles.
- **Below Settings (Quote Tile)**:
  - Lemon tile (`#FFF0C2`), text: `STILL LEARNING, ALWAYS SHIPPING` (`charcoal`, bold `JetBrains Mono`).

### 5.3 Seamless Auto-Scrolling Carousel
Located in the Middle Column:
- Displays the 3 real career experiences defined in `constants.js`:
  1. **Role 1**: `Project Based Frontend & Mobile Developer`
     - Company: `Cross Network Indonesia` | Date: `AUG 2024 — JAN 2025`
     - Background: `coral` (`#FD8451`)
     - Bullets: LMS client-specific, Flutter & Svelte, REST APIs, 5-member team.
  2. **Role 2**: `Mobile Application Developer Intern`
     - Company: `Cross Network Indonesia` | Date: `JAN 2025 — JUN 2025`
     - Background: `charcoal` (`#25424C`)
     - Bullets: Clinic admin and nurse app in Flutter, REST & WebSocket, screening input, feature testing.
  3. **Role 3**: `Freelance Web Developer`
     - Company: `Self-employed` | Date: `AUG 2025 — PRESENT`
     - Background: `sienna` (`#942911`)
     - Bullets: Next.js, Laravel, Tailwind CSS, cableguitar.com e-commerce, Narasatya 3D portfolio.
- **Scroll Behavior**:
  - Uses requestAnimationFrame or Framer Motion continuous translation to smoothly scroll vertically.
  - Seamless loop: duplicates entries or wraps scroll position so it never hits an awkward blank end.
  - Automatically pauses on mouse enter or touch.
  - Responds immediately to the Settings panel controls (Speed, Reverse, Pause).

### 5.4 Education & Unrelated Experience
Located in the Right Column:
- **Education Tile** (Col 3, Middle, Sienna `#942911`):
  - Graduation Cap icon (`education.svg`)
  - `Petra Christian University` (bold `paper`)
  - `Informatics Engineering` (`lemon`, `JetBrains Mono`)
  - Period: `(2022 - 2026)`
- **Software Unrelated Experience Tile** (Col 3, Bottom, Coral `#FD8451`):
  - Header: `Software Unrelated Experience:` (`lemon`, `JetBrains Mono`)
  - `• Administrative Assistant Internship` (bold `paper`)
  - `School of Business and Management, Petra Christian University`
  - Period: `(Aug 2023 - Apr 2024)`

---

## 6. Asset Pipeline & Dynamic Glob Mapping

All assets are cleanly organized in `src/assets/`. To ensure zero missing image links, implement `src/utils/assetLoader.js`:

```javascript
// src/utils/assetLoader.js
// Vite dynamic globbing for project media screenshots
const projectImages = import.meta.glob('/src/assets/projects/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  as: 'url'
});

export function getProjectMedia(folderName) {
  if (!folderName) return [];
  const prefix = `/src/assets/projects/${folderName}/`;
  return Object.entries(projectImages)
    .filter(([path]) => path.startsWith(prefix))
    .map(([_, url]) => url);
}

// Icon mapper for SVG icons
const iconFiles = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  as: 'url'
});

export function getIconUrl(iconName) {
  const match = Object.entries(iconFiles).find(([path]) => path.endsWith(`/${iconName}`));
  return match ? match[1] : '';
}
```

---

## 7. Dependencies & Setup

Install the required lightweight dependencies:
```bash
npm install react-github-calendar
```
*(Verify that `framer-motion`, `react`, `react-dom`, and `@remixicon/react` are already in `package.json`).*

---

## 8. Step-by-Step Execution Sequence

When the executing agent begins work, follow this exact linear sequence:

### Step 1: Font Face & Tailwind Configuration
1. Update `src/index.css`:
   - Add `@font-face` rules for `Akira Expanded`, `JetBrains Mono`, `SF Pro Rounded`, `SF Pro Display`.
   - Add utility classes for `.font-display`, `.font-mono`, `.font-rounded`, `.font-body`.
   - Remove legacy blur background and legacy container styles.
2. Update `tailwind.config.js`:
   - Extend `colors` with all 9 design tokens (`lemon`, `paper`, `charcoal`, `ink`, `coral`, `sienna`, `falu`, `coralDark`, `faluLight`).
   - Extend `fontFamily` with `display`, `mono`, `rounded`, `body`.

### Step 2: Data & Asset Helper Setup
1. Create `src/constants/portfolioData.js`:
   - Port all data from `agent_guides/constants.js`.
   - Verify all 4 featured project flags, 11 project definitions, 3 experience entries, 13 skills, and profile info.
2. Create `src/utils/assetLoader.js`:
   - Implement `getProjectMedia()` and `getIconUrl()` using `import.meta.glob`.

### Step 3: Base Tile & Utility Components
1. Create `src/components/common/Tile.jsx`:
   - Prop-driven tile component supporting background color tokens, rounded corners, padding, hover scale, and Framer Motion integration.
2. Create `src/components/common/ClockTile.jsx`:
   - Real-time WIB clock updater with formatting `HH:mm WIB`.
3. Create `src/components/common/GithubContributionTile.jsx`:
   - Integrated `react-github-calendar` with dark slate ink palette and green accents.

### Step 4: Home Board & Expanded States
1. Create `src/components/home/SkillsExpandedTile.jsx`:
   - 13 tech skill icons grid + soft skills list + collapse button.
2. Create `src/components/home/ContactExpandedTile.jsx`:
   - "LETS BUILD SOMETHING" banner + email copy action + collapse button.
3. Create `src/components/boards/HomeBoard.jsx`:
   - Desktop grid matching `Home.png`.
   - Handles `expandedTile` state (`null` | `'skills'` | `'contact'`).
   - Handles `isPuzzleMode` (draggable items) and `isFunMode` (spring physics).

### Step 5: Projects Board & In-Place Detail
1. Create `src/components/projects/ProjectMediaCarousel.jsx`:
   - Auto-scrolling crossfade carousel using images from `getProjectMedia()`.
2. Create `src/components/projects/ProjectDetailView.jsx`:
   - Left: Description + Media Carousel. Right: CTA Button + Project Details bullets.
3. Create `src/components/boards/ProjectsBoard.jsx`:
   - Top banner + category tab filters + dynamic category descriptions.
   - Grid rendering 4 featured wide cards + square cards + currently working on status.
   - In-place transition between grid and ProjectDetailView.

### Step 6: Experience Board & Auto-Carousel
1. Create `src/components/experience/SettingsPanel.jsx`:
   - Play/pause toggle, speed control, reverse direction, fun mode toggle.
2. Create `src/components/experience/ExperienceCarousel.jsx`:
   - Infinite vertical auto-scroller displaying the 3 career experience cards.
3. Create `src/components/boards/ExperienceBoard.jsx`:
   - 3-column layout matching `Experience.png` with Education and Unrelated Experience.

### Step 7: Application Shell & Router
1. Modify `src/App.jsx`:
   - Replace legacy components with the Metro board switcher (`HomeBoard`, `ProjectsBoard`, `ExperienceBoard`).
   - Add `<AnimatePresence mode="wait">` for board-to-board transitions.
   - Retain `@vercel/analytics`.

---

## 9. Verification & Acceptance Checklist

Before concluding the revamp, verify:
- [ ] **Aesthetics & Theme**: Background color is `#16262B` (ink), tiles use exact hex codes from Section 1. No generic blur or gradients.
- [ ] **Typography**: `Akira Expanded` displays on headlines, `JetBrains Mono` on dates/clock, `SF Pro Rounded` on taglines.
- [ ] **Home Board**:
  - [ ] Live WIB clock updates real-time.
  - [ ] GitHub contribution graph renders correctly for `xdKeto`.
  - [ ] Skills & Tools expands across rows 3-4 on click, and collapses cleanly.
  - [ ] Contact expands across row 5 on click, reveals email, and collapses cleanly.
  - [ ] Puzzle Mode enables drag-and-drop on tiles, resets when toggled off.
  - [ ] Fun Mode triggers floating spring motion without breaking layout.
- [ ] **Projects Board**:
  - [ ] "← Home" returns to Home board smoothly.
  - [ ] Category tabs filter the grid correctly with active tab highlights.
  - [ ] 4 featured projects render as wide 2x1 tiles at the top.
  - [ ] Clicking a project transitions in-place to Project Detail with auto-playing media carousel.
  - [ ] "Close" button returns back to the filtered project grid.
- [ ] **Experience Board**:
  - [ ] Auto-scrolling carousel advances vertically through the 3 experience cards.
  - [ ] Settings panel "Stop Carousel" pauses and resumes scrolling.
  - [ ] "Reverse" flips the scroll direction.
  - [ ] Education and Software Unrelated Experience tiles render accurately on the right.
