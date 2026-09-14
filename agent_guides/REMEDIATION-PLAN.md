# Tileboard Portfolio Remediation Plan

## Goal

Bring the React implementation back to the exported Figma composition at the 1920x1080 desktop reference size, then preserve that visual system at smaller widths. The Figma PNGs are the visual source of truth; the written guides define interaction, accessibility, and fallback behavior where the exports cannot show behavior.

## Current State Audit

- `npm run build` and `npm run lint` pass, so the next agent can focus on behavior and fidelity rather than a compile failure.
- The app shell has three board states and Framer Motion transitions, but board changes are simple fade/scale transitions; there is no shared tile transition.
- Home uses three nested CSS grids with mostly correct desktop dimensions, but the implementation does not yet reproduce the export's type scale, alignment, color mapping, or expansion states closely enough.
- Puzzle mode stores per-tile drag offsets. It does not reorder a grid or reflow neighboring tiles, so it does not behave like the specified puzzle interaction.
- Fun mode applies random transforms to wrappers, but the mode toggles are not isolated from the chaos and reduced-motion mode only clears movement.
- Projects has the intended header/filter/detail structure, but filtered layouts, utility tile behavior, card artwork treatment, and detail proportions need visual verification against the exports.
- Experience has the intended three-column DOM, but carousel card content/colors, settings typography, and continuous scrolling need correction.

## Source of Truth and Open Decisions

1. Use the six PNG exports for geometry, visible copy, alignment, and artwork placement.
2. Use `DESIGN-SYSTEM.md` for tokens and typography roles, `INTERACTION-SPEC.md` for states/transitions, and `TECH-NOTES.md` for implementation options.
3. Keep the existing data values unless an export visibly contradicts them. Resolve the project spelling as `Steallron Raiders` to match the export, and keep the on-disk `prokect_stellaron.png` path until an asset rename is intentional.
4. Puzzle mode should reset to the canonical Home order when switched off. Puzzle and Fun remain mutually exclusive. These choices remove ambiguity for implementation and QA.

## Execution Order

### 1. Establish the desktop canvas and tokens

Files: `src/index.css`, `tailwind.config.js`, `src/components/common/Tile.jsx`.

- Define a desktop board viewport based on the 1920x1080 export: 16px outer inset, 10px grout, 6px radius, and exact column widths (Home 340 / 1039 / 489; Projects 150 / 150 / 1319 / 239; Experience 390 / 826 / 652).
- Keep the 1920 composition stable at large widths; add a deliberate scale/overflow strategy below the reference width instead of allowing nested rows to distort unpredictably.
- Normalize all token usage to `COLORS`; remove ad hoc `#7A3B30`/other duplicates where the export expects Falu or Coral Dark.
- Add explicit typography utilities and line-height/letter-spacing rules for Akira headlines, JetBrains data, SF Rounded taglines, and SF UI text.
- Make Tile expose consistent focus-visible, hover, pressed, and disabled styles without changing tile geometry during keyboard focus.

### 2. Rebuild Home against the export

Files: `src/components/boards/HomeBoard.jsx`, `src/components/home/SkillsExpandedTile.jsx`, `src/components/home/ContactExpandedTile.jsx`, `src/components/common/ClockTile.jsx`, `src/components/common/GithubContributionTile.jsx`.

- Match every Home tile's exact background, content anchor, icon size, and text scale from `Home.png`.
- Make hero copy a two-level composition: Akira `HELLO, I'M YESTO` with Yesto coral, then right-aligned role/tagline in SF Rounded.
- Match education/status/social/download layout and use the supplied Open to Work, location, education, and download assets.
- Keep Skills expansion at x=16/y=427 and Contact expansion at x=16/y=751, spanning through the middle column. Animate tile growth and sibling reflow with enter/exit states; close on close button and outside click; keep only one expanded state.
- Rework Skills content to the exact 10-icon top row, 3-icon bottom row, and right-side unrelated-skills block shown in the export. Do not add arbitrary white backing to colored logos.
- Rework Contact to the export's top-left label, giant centered headline, bottom email, and close arrow; preserve clipboard/mail fallback.
- Ensure contribution loading, success, and failure states occupy the same tile geometry and do not clip month labels or the grid.

### 3. Replace fake Home modes with real state machines

Files: `src/components/boards/HomeBoard.jsx` plus a new focused mode component if useful.

- Represent canonical tile order separately from the rendered order.
- Use a grid-capable reorder implementation (prefer `dnd-kit` for mixed spans; Framer Reorder is acceptable only if the agent can prove the mixed-span layout remains correct).
- Exclude both mode controls from dragging and keep them fixed/elevated while a mode is active.
- Reset order and transforms with a spring when Puzzle turns off. Turning one mode on must turn the other off and show a concise toast.
- Fun mode should randomize bounded offsets/rotation on an interval, preserve layout flow, and provide a reduced-motion alternative with no positional chaos.

### 4. Correct Projects grid and detail state

Files: `src/components/boards/ProjectsBoard.jsx`, `src/components/projects/ProjectDetailView.jsx`, `src/components/projects/ProjectMediaCarousel.jsx`, `src/constants/portfolioData.js`.

- Make the ALL grid match the export: four featured cards in two wide rows, Narasatya in the right content column, utility tiles below, a blank filler, and a full-height 135px Coral strip.
- Use the actual project cover/logo artwork with the correct overlay strength; preserve readable title/tag anchors and arrow placement.
- Make category tabs show the category color only for the active tab while retaining the fixed header/description bar. Animate only the scrollable grid on filter changes.
- Keep the grid independently scrollable and preserve the selected category when opening/closing detail.
- Transform the filter row into Close + project-name header in detail. Match the export's description height, large media region, CTA tile, bullet tile, and Coral strip.
- Make media discovery deterministic and auto-crossfade continuously; show a designed placeholder for projects with no media and pause on hover.
- Fix utility tile semantics: GitHub opens externally, Currently Working On is either a link to GuitarCable detail or clearly non-interactive, and all interactive tiles are keyboard reachable.

### 5. Correct Experience composition and controls

Files: `src/components/boards/ExperienceBoard.jsx`, `src/components/experience/ExperienceCarousel.jsx`, `src/components/experience/SettingsPanel.jsx`, `src/index.css`.

- Ensure the middle carousel begins at the board's top edge (y=16), while Home/filler occupy the left top row and Experiences occupies the right top row.
- Match the three card backgrounds and per-theme text contrast: coral cards use charcoal body text where shown; charcoal/sienna cards use paper text with lemon data accents.
- Format periods exactly as the export (uppercase JetBrains Mono with the shown dash), show the intended three bullets, and keep card heights/spacing stable in the loop.
- Implement a seamless vertical loop with pause on hover/touch, speed changes that take effect immediately, reverse direction, and a clear paused state.
- Match Settings typography and control labels to the export. Keep Experience Fun Mode local unless a later product decision explicitly makes it global.

### 6. Motion, accessibility, and responsive pass

Files: `src/App.jsx`, all board/tile components, `src/index.css`.

- Add shared board entrance/exit variants with staggered tile reveal and use `layoutId` for Projects/Experience navigation tiles where feasible.
- Add outside-click handling and Escape-key close for expanded Home tiles and project detail.
- Add `aria-pressed`, labels, focus rings, and reduced-motion variants for every control.
- Treat desktop as the fidelity target; at tablet/mobile widths stack tiles in a stable reading order with no horizontal page scroll, while preserving the same token and type hierarchy.

## Verification Protocol

1. Run `npm run lint` and `npm run build`.
2. Run the app at a 1920x1080 viewport and compare screenshots for Home, Skills, Contact, Projects, Project Detail, and Experience. Check tile edges, column widths, row heights, colors, text anchors, and icon placement before tuning animation.
3. Exercise every state: board navigation, expand/collapse, outside click, Escape, each project filter, project detail close, carousel pause/speed/reverse, Puzzle reorder/reset, Fun toggle, clipboard fallback, and contribution failure fallback.
4. Repeat at 1440px and a mobile width to catch overflow and hit-target regressions.
5. Verify `prefers-reduced-motion` and keyboard-only navigation.

## Acceptance Criteria

- At 1920x1080, each export has the same macro geometry and color mosaic with no overlapping or drifting rows.
- Home expansion states replace the exact neighboring regions shown in the exports.
- Projects ALL and filtered/detail states preserve the fixed header and independent grid scroll.
- Experience starts at the top, remains readable on every card theme, and loops without a blank jump.
- Puzzle, Fun, and reduced-motion states behave as specified rather than only changing visual transforms.
- No missing assets, console errors, or lint/build failures remain.
