# Implemented Screen Gap Report and Final Remediation Plan

## Objective

Make every portfolio board occupy exactly one browser viewport with no page scrollbar and no internal scrollbar at the desktop target. All tiles must resize from the available viewport dimensions while preserving the visual proportions of the 1920x1080 Figma exports. Then correct the Home expanded states, Projects grid/filter behavior, Project Detail, and Experience carousel.

## Evidence Reviewed

- Original exports: `figma_export/Home.png`, `Skill & Tools.png`, `Contact.png`, `Projects.png`, `Project Detail.png`, and `Experience.png`.
- Implemented captures: every image in `figma_export/implemented_screen/`.
- Design and behavior documents: `DESIGN-SYSTEM.md`, `FIGMA-REFERENCE.md`, `INTERACTION-SPEC.md`, and `TECH-NOTES.md`.
- Current React components, data, asset loading, and CSS.

## Source-of-Truth Priority

1. Original Figma exports define visible geometry, composition, content placement, and the intended screen state.
2. Interaction Spec defines state transitions and controls.
3. Design System defines colors and typography.
4. Current data may add content, but added content must not distort the reference board. Content not present in the reference should not silently create extra rows or scrolling.

## Executive Diagnosis

The current implementation is not failing because of small spacing differences. Its layout foundation is wrong for the requested behavior.

- Boards use `min-height` and fixed pixel rows whose total content can exceed the viewport. The document is therefore allowed to grow and scroll.
- Home expansion is inserted inside a reordered grid item while CSS also absolutely positions elements with the same expansion class. This creates nested positioned elements, moves the remaining left-column item into another grid slot, and expands content in the wrong part of the page.
- Projects combines explicit CSS grid coordinates with Framer `layout` transforms. During filtering, utility tiles inside `AnimatePresence` have no stable unique keys and are rendered for every category. This explains the duplicated GitHub/Working On tiles and contributes to the collapsed project-card transforms shown in the captures.
- The Projects ALL state defines four project rows even though the Figma screen has three visible project rows. The current data also contains projects beyond the curated Figma board.
- Experience relies on a percentage-based Framer translation of a duplicated list without measuring the loop segment. It has no dedicated viewport/track height contract, and reduced-motion pauses it entirely. The behavior is fragile and visibly does not satisfy the requested carousel.

## Mandatory Viewport-Fit Foundation

This phase must be completed before board-specific styling.

### Required page contract

- Set `html`, `body`, and `#root` to `width: 100%; height: 100%; overflow: hidden`.
- Every board root must use `width: 100vw; height: 100dvh; overflow: hidden`.
- `.tile-board` must use a fixed viewport box, not `min-height`: `height: 100dvh; padding: var(--board-pad); overflow: hidden`.
- Board interiors must use `height: 100%` and `min-height: 0` throughout the grid/flex ancestor chain.
- Remove visible scrollbar styling because no desktop board should scroll. Do not hide a scrollbar while leaving clipped, unreachable content.

### Fluid Figma geometry

Use the Figma coordinates as ratios of the available board area instead of copying all row heights as independent fixed pixels.

- Define `--board-w: calc(100vw - 2 * var(--board-pad))` and `--board-h: calc(100dvh - 2 * var(--board-pad))`.
- Use fractional tracks derived from the Figma dimensions. Example: Home columns use `340fr 1039fr 489fr`; their internal rows use the Figma row proportions.
- Project and Experience tracks must likewise be fractional and fill exactly `--board-h` after subtracting gaps.
- Apply `clamp()` or container-query-based text/icon sizes so content shrinks with the tiles. Fixed `md:text-6xl` values are currently too large for some implemented tiles and cause arrow/title collisions.
- At desktop/tablet widths, every reference state must fit inside the viewport. For mobile, create a separate compact board composition that also fits one viewport where feasible; do not fall back to a long vertically stacked page.

### Acceptance checks

- For every board/state: `document.documentElement.scrollHeight === window.innerHeight` and `scrollWidth === window.innerWidth` (allow at most a 1px rounding difference).
- No component is cut off at the bottom/right edge.
- No hidden content requires scrolling to reach an interactive control.

## Home Board Findings and Fixes

### Normal Home

Observed differences:

- Right-column tiles are narrower/shorter than the reference and labels collide with arrow icons.
- Social tiles have large empty gaps because the current canonical reorder array is forced back into rigid semantic slots.
- The contribution tile visually loses its surrounding tile proportion and dominates unused middle space.
- Home typography and icon scaling do not follow the tile size.

Required implementation:

- Separate the canonical visual grid definition from Puzzle order. Normal mode must render named Figma slots directly; it must not derive columns by slicing a mutable flat array.
- Create a slot map for each normal Home tile with explicit grid areas or CSS custom properties. Puzzle mode may render a separate sortable representation, but it must not mutate the normal layout structure.
- Match the original 340/1039/489 horizontal rhythm and exact row ratios.
- Reserve arrow space in nav tiles and anchor titles bottom-left.
- Size text/icons using tile/container dimensions, not only viewport breakpoints.

### Skills & Tools expansion

Observed failure:

- Contact moves into the former Skills position.
- The expanded Skills panel appears at the bottom of the screen and is clipped.
- It overlaps the contribution graph rather than replacing the exact social/quote region.
- The skills panel uses three wrapped icon rows instead of the Figma's ten-icon first row and three-icon second row.
- Several logo backgrounds still differ from the export.

Root cause:

- `SkillsExpandedTile` replaces the Skills child inside `.home-left`, while both the wrapper and child receive `.home-skills-expanded`. CSS then absolutely positions nested elements using the same class.
- The surrounding grid still reflows because the expanded wrapper is removed from normal layout.

Required implementation:

- Do not render expanded content inside the collapsed tile's wrapper.
- Keep normal Home tiles in their canonical slots and render one board-level expansion layer as a sibling of the three columns.
- Give the expansion layer one unambiguous class and grid area. Skills must occupy x=16 through x=1405 and y=427 through y=740 in the reference coordinate system.
- Hide/reveal only the tiles covered by that region: collapsed Skills plus GitHub, LinkedIn, CV, and quote. Contact and contribution graph remain in their original locations.
- Animate the expansion layer from the collapsed Skills tile bounds using Framer Motion `layoutId` or measured FLIP coordinates.
- Build the panel with fixed internal regions: title column, ten-icon top row, three-icon bottom row, unrelated-skills block at lower right, close arrow at upper right.

### Contact expansion

Observed failure:

- The capture is scrolled far down, with only the contribution graph, mode controls, and Contact panel visible.
- The expanded panel is only part-width and sits at the bottom instead of replacing Contact plus the contribution region.

Required implementation:

- Use the same board-level expansion layer architecture as Skills.
- Contact must occupy x=16 through x=1405 and y=751 through y=1064 in reference coordinates.
- Hide/reveal only collapsed Contact and the contribution graph. All upper Home tiles and right-column controls stay fixed.
- Render `CONTACT` top-left, close arrow top-right, headline centered, and email bottom-center.
- Opening either expansion closes the other. Close button, outside click, and Escape must reverse the same transition without changing page scroll position.

### GitHub contribution component

- The graph must be a self-contained tile that accepts the exact size of its grid slot.
- Its internal grid must scale to available width/height. Avoid a fixed 12px cell size that determines the parent width.
- Set accessible overflow clipping inside the tile only; it must never create page overflow or change Home expansion coordinates.

## Projects Board Findings and Fixes

### Broken ALL grid

Observed failure:

- Project cards collapse into narrow vertical strips.
- Large empty regions replace the intended featured cards.
- The board has a visible vertical page scrollbar.

Required implementation:

- Remove Framer `layout` from project-card wrappers until the base CSS grid is stable. Do not combine FLIP transforms with explicit named grid coordinates for the ALL composition.
- Use a deterministic Figma grid with five equal content columns plus the 135-unit strip, and exactly three rows for the visible reference composition: 255fr, 255fr, 297fr.
- Place the four featured projects, Narasatya, Open GitHub, three bottom projects, blank filler, Working On, and Coral strip in named grid areas.
- The Figma ALL screen is curated. Add an explicit data flag/order such as `showOnOverview` and render only the projects represented in the export. Additional projects can appear in category-specific replacement slots, but they must not append new rows.
- Fit project images with the same crop/overlay as the export and reserve title/tag/arrow space.

### Category utility duplication bug

Observed failure:

- Category views render multiple GitHub and Working On tiles.
- Project cards remain as narrow strips alongside them.

Root cause:

- GitHub, Working On, and the Coral strip are unconditionally rendered inside the same `AnimatePresence` as filtered project children.
- Utility children do not have explicit stable keys.
- The filtered grid removes named positions and relies on auto-placement while old layout transforms exit.

Required implementation:

- Render utility tiles only for `category === 'ALL'`.
- Keep utilities outside the mapped filtered project list and give every animated direct child a stable key.
- For WEB/MOBILE/PERSONAL, render only matching project cards. No GitHub, Working On, blank filler, or repeated utility tiles.
- Give filtered views their own deterministic fit-to-screen grid. Calculate columns/rows from result count so all matching cards fill the available area without scroll. Use a small function that maps counts to layouts (1, 2, 3, 4, 5+), or a fixed maximum visible curated list.
- Use `AnimatePresence mode="popLayout"` or a simple keyed crossfade after the correct grid is established. Never leave exiting utility elements in the new category grid.

### Project Detail

Observed differences:

- The page still scrolls vertically.
- Description and CTA/detail proportions differ from Figma.
- Media is shown as a single contained screenshot rather than a designed full tile presentation.
- Projects without CTA show `No public link`, while the Figma composition expects an intentional CTA/blank tile treatment.

Required implementation:

- Header 150 units, transformed filter/detail bar 50 units, and remaining content must sum to the viewport height after gaps.
- Detail content uses three columns proportional to Figma: main content, 340-unit side column, 135-unit Coral strip.
- Main column uses a fixed proportional description row and a flexible media row with `min-height: 0`.
- Media images fill the available tile without increasing its intrinsic height. Use a deliberate `contain`/`cover` decision per media type.
- Keep carousel autoplay, hover pause, and index state inside the fixed media region.
- Use a designed inactive CTA tile when there is no public link rather than small text floating in the corner.

## Experience Board Findings and Fixes

### Visual comparison

- Macro columns are closer than the other boards, but settings and quote sizing differ.
- The third card is cut at the bottom, and the board relies on clipping rather than a visibly continuous loop.
- Card typography is smaller and vertically positioned differently from Figma.

### Carousel failure

Root risks in the current approach:

- The moving track translates from `0%` to `-50%` without measuring the height of one duplicated segment.
- The carousel viewport has no explicit CSS height/position contract of its own.
- Changing speed/direction remounts the track and restarts it.
- `prefers-reduced-motion` makes `shouldPause` true, so on some machines the carousel never moves at all.

Required implementation:

- Implement a measured vertical marquee rather than a percentage animation.
- Structure: fixed-height `.experience-carousel` viewport with `overflow: hidden`; inside it, two identical list groups; measure one group with `ResizeObserver`.
- Drive a pixel motion value with `requestAnimationFrame` or Framer `animate`, wrapping seamlessly at the measured group height.
- Pause/resume must preserve the current offset. Speed changes update velocity without jumping. Reverse changes velocity sign without remounting.
- Hover and touch pause temporarily. The Stop Carousel setting explicitly pauses/resumes.
- Reduced motion should show one stable, manually selectable card or a very slow crossfade; it must not accidentally masquerade as a broken carousel.
- Keep card heights proportional to the available viewport so at least the same one-and-a-half/two-card rhythm shown in Figma is visible.

## Interaction Requirements

- Normal mode and expanded states must never change browser scroll position.
- Skills/Contact: click to expand, close control, outside click, and Escape; only one open.
- Project filters: only project region transitions; header/filter controls remain stable.
- Project detail: preserve active category after closing.
- Experience controls: pause, speed, reverse, and local Fun Mode update without remount jumps.
- All interactive tiles need visible focus and keyboard activation.
- Puzzle and Fun remain mutually exclusive and cannot alter the viewport-fit contract.

## Implementation Sequence for Luna-Low

1. Lock the root and board containers to one viewport and remove all page/internal scrolling.
2. Convert board track sizes to viewport-fitting fractional geometry.
3. Restore normal Home as a fixed named-slot composition independent of Puzzle order.
4. Rebuild Skills and Contact as board-level overlays/shared-layout states.
5. Make the GitHub graph size itself inside its slot.
6. Replace Projects overview and filtered layouts with separate deterministic grids; remove layout transforms during this repair.
7. Fit Project Detail into the remaining viewport height.
8. Replace Experience carousel with a measured pixel loop.
9. Tune typography/icons against screenshot comparisons.
10. Reintroduce motion only after every static state matches and fits.

## Verification Matrix

Test at 1920x1080, 1440x900, 1366x768, and one mobile viewport.

For each size verify:

- Home, Skills, Contact, Projects ALL, each Project category, Project Detail, and Experience have no horizontal or vertical scrollbar.
- `scrollHeight`/`scrollWidth` do not exceed the viewport.
- No text overlaps an arrow or escapes a tile.
- Skills and Contact occupy the correct replacement regions.
- Category screens contain no GitHub/Working On utility tiles.
- Project cards have normal widths and stable positions before, during, and after filter transitions.
- Experience moves continuously for at least 45 seconds, wraps without a blank gap, and responds to every setting.
- Project media advances at least twice and never changes detail layout height.
- Escape, outside-click, keyboard focus, and reduced-motion behavior work.

Run `npm run lint` and `npm run build` after implementation.

## Completion Standard

The task is complete only when the implementing agent supplies fresh screenshots for every reference state at the same viewport size, plus category screenshots, and they can be compared side-by-side without page scroll, collapsed tiles, duplicated utilities, misplaced expansion panels, or a stationary Experience carousel.
