# Luna-High Remediation & Fix Plan: Figma & Design System Alignment

> **Document Version**: 3.0 (Post-Review Remediation)  
> **Target Execution Agent**: Luna-High  
> **Source Documents**: `agent_guides/figma_export/*.png`, `agent_guides/FIGMA-REFERENCE.md`, `agent_guides/DESIGN-SYSTEM.md`, `agent_guides/INTERACTION-SPEC.md`  
> **Objective**: Resolve all layout discrepancies, broken grid geometries, visual contrast flaws, broken mode states, and missing Figma details to achieve 1:1 fidelity with the Figma reference.

---

## 1. Summary of Identified Defects & Required Fixes

| Area | Major Defect | Required Correction | Target File(s) |
|---|---|---|---|
| **Home Grid Architecture** | Mashing 3 distinct column rhythms into 1 rigid 5-row CSS grid caused tile heights to collide (Experience overlapping with Puzzle & Fun). | Restructure Home layout into 3 synchronized columns (Left: 340px, Middle: flex-1 / ~1039px, Right: ~489px) with column-specific flex/grid flows, matching exact Figma geometry. | `src/index.css`, `HomeBoard.jsx` |
| **Projects Grid Layout** | Configured for 4 columns instead of 5 content columns + 1 strip, pushing featured & square cards out of order. Featured cards have 42px empty gaps due to row height mismatch. | Redefine project grid as 5 columns (`repeat(5, minmax(0, 1fr)) 135px`) so Row 1 holds 2 featured wide cards (4 cols) + Narasatya (1 col) + strip (135px). Align row heights strictly. | `src/index.css`, `ProjectsBoard.jsx` |
| **Experience Board Layout** | Full-width `.board-header` pushes the auto-scrolling middle cards 150px down with a dead gap above. | Remove full-width header. Let middle column start at `y=16` (top of the board). Top row has `← Home` + charcoal square on the left, and `EXPERIENCES` header on the right. | `src/index.css`, `ExperienceBoard.jsx` |
| **Experience Contrast Bug** | Text on the second (Charcoal) card uses `text-charcoal` on charcoal background, making text completely invisible! | Map text colors per card theme: on dark cards (`charcoal`, `sienna`), use `paper` (`#FFFBF0`) for role & bullets, and `lemon` (`#FFF0C2`) for company & period. | `ExperienceCarousel.jsx` |
| **Status Badge Asset** | `opentowork.svg` was ignored; crude tailwind div used in Home and completely missing in Projects "Currently working on". | Use `src/assets/icons/opentowork.svg` in both `HomeBoard.jsx` and `ProjectsBoard.jsx`. | `HomeBoard.jsx`, `ProjectsBoard.jsx` |
| **Nav Tile Alignments** | `PROJECTS` and `EXPERIENCE` labels in Home used `self-end` (aligning right). | Align all nav tile labels to bottom-left (`self-start` / text-left) matching Figma. | `HomeBoard.jsx` |
| **Tab Filter Active State** | All 4 tabs show 100% vibrant background simultaneously; no active tab indicator. | Dim inactive tabs (subtle background/border) and illuminate the active tab with full brand color. | `ProjectsBoard.jsx` |
| **Project Detail Missing Strip** | Decorative vertical coral strip is missing from the detail view. | Add the rightmost vertical coral strip (`w-[135px] bg-coral`) to match `Project Detail.png`. | `ProjectDetailView.jsx` |
| **Puzzle Mode Fake Logic** | Dragging shifts entire array by 1; `grid-area` ignores DOM order; coordinates don't reset on OFF. | Implement clean swap-based or freeform drag coordinates with proper spring reset upon deactivation. | `HomeBoard.jsx` |
| **Asset Path Typo** | Stellaron Raiders cover fails to load because filename on disk is `prokect_stellaron.png`. | Fix typo in `portfolioData.js` or rename file to `project_stellaron.png`. Also sync spelling to `Steallron Raiders` per Figma. | `src/constants/portfolioData.js` |
| **Contact Expanded Alignment** | Content is right-aligned and uses `#7A3B30` instead of Falu `#772014`. | Center headline `LETS BUILD SOMETHING` and email; use `#772014`. | `ContactExpandedTile.jsx` |
| **Skills Expanded Cards** | Blanket `bg-paper` white boxes applied behind every icon regardless of logo design. | Remove artificial white backgrounds on logos that have their own colored bounds (JS, TS, PHP, Next.js). Format in 10-top + 3-bottom grid. | `SkillsExpandedTile.jsx` |
| **Settings Panel UI** | Replaced clean Metro typography with clunky mini buttons (`0.5x 1x 2x`). | Restore clean typographic controls with active state highlights matching `Experience.png`. | `SettingsPanel.jsx` |
| **GitHub Calendar Widget** | Minimal custom fetch omitted months, day labels, legend, and tooltips. | Install `react-github-calendar` or enrich the widget with complete GitHub calendar styling. | `GithubContributionTile.jsx` |

---

## 2. Detailed Technical Specifications & Changes

### Step 1: Asset & Data Fixes
1. **Asset File Name Correction**:
   - In `src/constants/portfolioData.js`:
     Update `cover: 'projects/prokect_stellaron.png'` (or rename `src/assets/projects/prokect_stellaron.png` to `project_stellaron.png`).
     Update project name: `Steallron Raiders` to match Figma text.
2. **Color Constants Alignment**:
   - Ensure Falu `#772014` is used for Contact tiles instead of `#7A3B30`.

### Step 2: Home Board Architecture & Grid Overhaul
In Figma, the desktop layout is composed of 3 primary columns:
```
[ LEFT: 340px ]        [ MIDDLE: 1039px ]               [ RIGHT: 489px ]
┌──────────────┐       ┌────────────────────────┐       ┌───────────────┐
│ Photo (399)  │       │ Hero (200)             │       │ Clock │ Loc   │ (200)
├──────────────┤       ├───────────┬────────────┤       ├───────────────┤
│ Skills (313) │       │ Edu (190) │ Status(190)│       │ Projects Nav  │ (313)
├──────────────┤       ├─────┬─────┴──────┬─────┤       ├───────────────┤
│ Contact(313) │       │GH(151)│LI(151)│CV (151)│       │ Experience Nav│ (313)
└──────────────┘       ├────────────────────────┤       ├───────┬───────┤
                       │ Tagline (151)          │       │ Puzzle│  Fun  │ (185)
                       ├────────────────────────┤       └───────┴───────┘
                       │ GitHub Calendar (316)  │
                       └────────────────────────┘
```
**Required CSS & Component Refactor**:
- Create 3 separate flex/grid containers for Left, Middle, and Right columns, or a unified grid that accurately calculates row heights:
  - When **Skills & Tools** is expanded: It expands from the Left column across rows 3-4 of the Middle column (replacing GitHub, LinkedIn, CV, and Tagline).
  - When **Contact** is expanded: It expands across row 5 (replacing GitHub calendar).
- Align `PROJECTS` and `EXPERIENCE` labels to bottom-left (`self-start text-left`).
- Replace the ad-hoc green box in the Status tile with `opentowork.svg`.
- Make `HELLO, I'M YESTO` all-caps, with `HELLO, I'M` in paper (`#FFFBF0`) and `YESTO` in coral (`#FD8451`).

### Step 3: Projects Board 5-Column Grid Fix
In `Projects.png`:
- Top row: `← Home` (150px), Charcoal box (150px), `PROJECTS` banner (Lemon, ~1319px), Falu box (~240px).
- Category Bar:
  - Active tab receives bright background (`ALL` = Lemon, `WEB` = Coral, `MOBILE` = Sienna, `PERSONAL` = Falu).
  - Inactive tabs receive subdued dark background (`#1A2E35` with light text).
- Grid layout:
  - 5 content columns + 1 vertical strip:
    `grid-template-columns: repeat(5, minmax(0, 1fr)) 135px;`
  - Row 1: Featured 1 (cols 1-2) + Featured 2 (cols 3-4) + Narasatya (col 5) + Coral Strip (col 6).
  - Row 2: Featured 3 (cols 1-2) + Featured 4 (cols 3-4) + Open GitHub (col 5) + Coral Strip (col 6).
  - Row 3: Youth Festival (col 1) + PetraEats (col 2) + Personal Portfolio (col 3) + Blank Charcoal (col 4) + Currently Working On (col 5) + Coral Strip (col 6).
- Row heights: Use matching height tokens so cards align flush without vertical gaps.
- Include the green squircle status badge (`opentowork.svg`) in the "Currently working on" tile.
- Add arrow in the top-right of the "Open GitHub" tile.

### Step 4: Project Detail View Alignment
- Restore the vertical coral strip (`w-[135px] bg-coral`) on the far right of the layout.
- Ensure the header row matches `Project Detail.png`:
  - `Close` button (~310px width, Lemon background `#FFF0C2`, bold dark charcoal text).
  - `Project Name` header (Charcoal background `#25424C`, white text).
- Left Column: Description tile on top (Sienna `#942911`), auto-playing Media Carousel below (Charcoal `#25424C`).
- Right Column: CTA tile on top (Lemon `#FFF0C2`), Project Details bullet list below (Sienna `#942911`).

### Step 5: Experience Board Layout & Contrast Restoration
- **Eliminate Full-Width Header**:
  - Left Column: Top has `← Home` (150px) + Charcoal block (230px). Middle has Settings Panel (580px). Bottom has Quote tile (298px).
  - Middle Column: Auto-scrolling carousel column starts at the very top of the board (`y=16`) flush with the top row!
  - Right Column: Top has `EXPERIENCES` header banner (652×150px). Middle has Education (580px). Bottom has Software Unrelated Experience (298px).
- **Fix Invisible Text on Charcoal Card**:
  - On the Charcoal card, apply `text-lemon` to the company name and period, and `text-paper` to role title and bullet points.
- **Settings Panel Polish**:
  - Remove the cluttered `0.5x 1x 2x` button grid. Use clean typographic items with a subtle dot/badge or color toggle matching the Figma design.
- **Auto-scroll Enhancements**:
  - Add pause-on-hover so users can easily read experience details without rushing.

### Step 6: Mode Toggles: Puzzle & Fun Modes
- **Puzzle Mode**:
  - Store relative drag offsets or use Framer Motion layout animations properly.
  - When Puzzle Mode is toggled OFF, animate all tiles smoothly back to `x: 0, y: 0`.
- **Fun Mode**:
  - Use continuous interval-driven randomized spring offsets (`±15px`, `±3deg`) with smooth spring transition.
  - Respect `prefers-reduced-motion`.

---

## 3. Execution Checklist for Luna-High

- [ ] Rename `prokect_stellaron.png` or update path in `portfolioData.js` to restore Stellaron Raiders cover.
- [ ] Refactor `HomeBoard` and `src/index.css` to 3-column architecture, preventing Experience tile collision.
- [ ] Fix text contrast on the second experience card (`text-paper` / `text-lemon` on charcoal background).
- [ ] Reconfigure `ProjectsBoard` grid to 5 content columns + 1 strip, positioning all 11 tiles properly.
- [ ] Add active/inactive states to category filter tabs.
- [ ] Add `opentowork.svg` badge to both Home status tile and Projects "Currently working on" tile.
- [ ] Align all Home nav tile labels to bottom-left (`SKILLS & TOOLS`, `CONTACT`, `PROJECTS`, `EXPERIENCE`).
- [ ] Add the vertical coral strip to `ProjectDetailView`.
- [ ] Reposition Experience board middle carousel to start at `y=16` flush with top row.
- [ ] Clean up Settings panel UI to match Figma typography.
- [ ] Test build (`npm run build`) with 0 errors.
