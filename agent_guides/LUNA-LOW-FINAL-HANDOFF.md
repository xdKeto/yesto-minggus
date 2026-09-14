# Luna-Low Final Remediation Handoff

You are Luna-Low implementing the final visual and interaction remediation for this portfolio.

Repository: `D:\Coding\portfolio-web\yesto-minggus`

Your job is to fix the current implementation, not write another assessment. Read these sources before editing:

1. `agent_guides/IMPLEMENTED-SCREEN-GAP-REPORT.md` — primary execution plan.
2. `agent_guides/DESIGN-SYSTEM.md`
3. `agent_guides/FIGMA-REFERENCE.md`
4. `agent_guides/INTERACTION-SPEC.md`
5. `agent_guides/TECH-NOTES.md`
6. Original reference images in `agent_guides/figma_export/`.
7. Failed implementation images in `agent_guides/figma_export/implemented_screen/`.

The original Figma images are the visual source of truth. The interaction spec is the behavior source of truth. The current screenshots are evidence of bugs, not a target to preserve.

## Non-negotiable result

Every screen and state must fit inside one browser viewport. There must be no horizontal or vertical page scrollbar and no independently scrolling Projects region. Components must size from the available viewport while preserving the Figma proportions.

Test the viewport-fit contract at 1920x1080, 1440x900, and 1366x768. At each size, `document.documentElement.scrollHeight` and `scrollWidth` must not exceed the viewport by more than one rounding pixel.

## Work in this order

### 1. Fix the layout foundation

- Make `html`, `body`, and `#root` fill the viewport and use `overflow: hidden`.
- Make every `.tile-board` exactly `100dvh` high with overflow hidden.
- Replace fixed pixel totals/min-heights with fractional Figma-derived grid tracks that consume exactly the available board width and height after padding/gaps.
- Ensure all grid/flex ancestors use `min-height: 0` and `min-width: 0` where required.
- Use `clamp()` or container-relative typography and icon sizing so labels cannot collide with arrows.
- Do not solve overflow by clipping required content or hiding an existing scrollbar.

### 2. Restore Home's canonical composition

- Normal Home must render from fixed named Figma slots.
- Do not slice a mutable flat `homeOrder` array to decide which semantic tile belongs in each column/row.
- Puzzle Mode must use a separate layout/order state and must not corrupt normal Home geometry.
- Match the original 340/1039/489 column rhythm and internal row proportions.
- Keep navigation labels bottom-left and reserve top-right arrow space.
- Make the GitHub contribution component scale within its tile rather than determine the tile size.

### 3. Rebuild expanded Skills and Contact states

The current architecture is wrong because expanded content replaces a child inside the left grid and duplicates expansion class names on nested elements.

- Keep the normal Home grid intact.
- Render one board-level expansion layer as a sibling of the Home columns.
- Skills replaces exactly the collapsed Skills tile, GitHub, LinkedIn, CV, and quote region. Contact and the contribution graph stay in place.
- Contact replaces exactly the collapsed Contact tile and contribution graph. Upper Home content stays in place.
- Never move Contact into the Skills slot.
- Never place either expanded panel below the viewport.
- Give the expansion layer one class; do not use the same positioning class on its wrapper and inner Tile.
- Animate from/to the collapsed tile using `layoutId` or measured FLIP bounds.
- Skills internal layout must be ten icons on the first row, three on the second, title left, unrelated skills lower-right, close arrow upper-right.
- Contact internal layout must match the original export: label upper-left, close upper-right, large centered headline, email at the bottom center.
- Support close button, outside click, Escape, and mutual exclusivity.

### 4. Replace the Projects grids

- Remove Framer `layout` from explicitly positioned project wrappers while repairing the grid.
- Build a deterministic ALL grid with five content columns plus the Coral strip and exactly the three rows visible in the Figma export.
- Use named grid areas for the four wide featured cards, Narasatya, Open GitHub, Working On, three bottom projects, blank filler, and Coral strip.
- Explicitly curate which projects appear on the ALL overview. Extra data must not append rows or create scrolling.
- Render GitHub, Working On, blank filler, and Coral strip only in ALL.
- Never render utility tiles in WEB, MOBILE, or PERSONAL.
- Give every animated direct child a unique stable key.
- Give filtered categories their own fit-to-screen card layout based on result count. Only matching project cards may be present.
- Use a simple keyed crossfade or `AnimatePresence mode="popLayout"` after the static grids work. Do not let exit transforms collapse card widths.

### 5. Fit Project Detail

- Header, transformed filter bar, and content must total exactly the available viewport height.
- Use Figma-proportional main, side, and Coral-strip columns.
- Keep description, media, CTA, and details inside their assigned grid regions with no intrinsic-height overflow.
- Carousel images must fill their media tile without growing the page.
- Keep autoplay and hover/touch pause.
- Replace small `No public link` corner text with a deliberate inactive CTA presentation.

### 6. Replace the Experience carousel

Do not use an unmeasured `0%` to `-50%` Framer keyframe loop.

- Build a fixed-height carousel viewport with overflow hidden.
- Render two identical list groups inside a moving track.
- Measure one group with `ResizeObserver`.
- Move the track in pixels using `requestAnimationFrame` or a motion value and wrap at the measured group height.
- Pause/resume without resetting offset.
- Speed changes adjust velocity without remounting.
- Reverse changes direction without jumping.
- Hover/touch pause temporarily.
- Reduced motion shows a stable manually selectable card or slow crossfade; do not silently stop and appear broken.
- Keep the same visible card rhythm as the Figma and ensure the loop runs continuously for at least 45 seconds.

### 7. Tune design and interactions

- Compare all states against the original exports at the same viewport.
- Tune typography, icon size, crop, overlay strength, padding, and content anchors only after geometry is correct.
- Preserve focus-visible states, keyboard activation, Escape/outside-click behavior, and Puzzle/Fun mutual exclusivity.
- Do not introduce gradients, glassmorphism, large shadows, or generic rounded-card styling.

## Mandatory validation

Run:

```powershell
npm run lint
npm run build
```

Manually verify:

- Home fits with no scrollbar.
- Skills expansion occupies the correct region and does not move Contact.
- Contact expansion occupies the correct region and does not move upper Home tiles.
- Projects ALL contains one GitHub tile and one Working On tile.
- WEB/MOBILE/PERSONAL contain no utility tiles.
- Project cards never collapse into vertical strips during filtering.
- Project Detail fits with no scrollbar and its media advances.
- Experience scrolls continuously, wraps seamlessly, and responds to pause, speed, reverse, hover/touch, and Fun Mode.
- All tests pass at 1920x1080, 1440x900, and 1366x768.

Create fresh screenshots matching the original filenames plus category screenshots and save them to a new directory such as `agent_guides/figma_export/final_screen/`.

When finished, report:

- Files changed.
- Root causes fixed.
- Screenshot paths.
- Viewports tested and overflow measurements.
- Interaction checks performed.
- Lint/build results.
- Any remaining deviation from Figma.
