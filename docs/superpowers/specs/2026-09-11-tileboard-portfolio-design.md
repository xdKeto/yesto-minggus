# TILEBOARD Portfolio Revamp Design

## Outcome

Replace the current section-based portfolio with a Vite React single-page portfolio that presents three Metro tileboards matching the supplied Figma exports: Home, Projects, and Experience.

## Visual system

- Use the documented solid palette: lemon, paper, charcoal, ink, coral, sienna, falu, coral dark, and falu light.
- Use local Akira Expanded, JetBrains Mono, SF Pro Rounded, and SF Pro Display fonts.
- Use a 16px board inset, 10px tile gap, small sharp corners, and a dark ink grout background.
- Keep the 1920x1080 desktop composition while collapsing each board into a readable single-column mobile flow.
- Remove the existing blur background, navbar, shadows, gradients, and legacy section styling.

## Application state

`App` owns `currentBoard` with `home`, `projects`, and `experience` values. Board changes use AnimatePresence with reduced-motion fallbacks. Home owns `expandedTile`, `isPuzzleMode`, and `isFunMode`; Puzzle and Fun are mutually exclusive. Projects owns the active category and selected project. Experience owns carousel pause, speed, direction, and board-local fun mode.

## Home

Render the Figma tile geometry with profile, hero, clock, location, education, work status, social links, CV download, navigation tiles, quote, GitHub contribution tile, and mode toggles. Skills and Contact expand in place and are mutually exclusive. Skills shows the 13 documented icons and unrelated skills. Contact shows the build CTA and copies or emails the documented address. Puzzle mode uses draggable tile ordering and resets to the default order when disabled. Fun mode applies bounded spring offsets, respects reduced motion, and leaves its toggle accessible.

## Projects

Render the fixed header and category bar, then an independently scrolling project area. Normalize project categories to uppercase and use the documented featured flags, with four wide featured tiles. Open GitHub and Currently Working On remain utility tiles. Selecting a project transforms the category bar into Close plus the project name and renders description, CTA, details, and an autoplaying media carousel. Close restores the current filter.

## Experience

Render the fixed Home/header tiles, left settings and quote column, middle infinite vertical carousel, and right education/unrelated experience column. The carousel pauses on hover or setting, supports normal/fast/slow speed and reverse direction, and uses a local board-scoped fun toggle.

## Data and assets

Create a single portfolio data module from `agent_guides/constants.js`. Add a Vite glob asset loader for project media and icon files. Preserve `public/resume.pdf`, the Vercel Analytics integration, all existing local project screenshots, and the documented external links. Missing public project CTAs render as unavailable rather than dead links.

## Verification

Run `npm run lint` and `npm run build` until both pass. Manually verify board navigation, Home expansion and collapse, clock rendering, GitHub loading/fallback, both mode toggles, category filtering, project detail open/close, media autoplay/pause, and Experience settings at desktop and mobile widths. Every state transition must have enter/exit motion and a reduced-motion path.

## Boundaries

This change is limited to the portfolio UI, its local data/assets, and the dependency required for the live contribution widget if needed. URL structure, resume content, external destinations, and analytics behavior remain unchanged. If live GitHub data cannot be fetched, the documented styled fallback is the accepted behavior.
