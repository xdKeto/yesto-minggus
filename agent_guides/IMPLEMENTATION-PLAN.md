# Tileboard Portfolio Implementation Plan

## Objective

Bring the React portfolio implementation back into visual and interaction alignment with the supplied Figma exports and the project design documents.

The implementation must preserve the Metro tileboard identity while fixing the structural problems visible in the implemented screenshots:

- Home uses the exact reference composition in its normal state.
- Skills and Contact expand into the regions defined by Figma.
- Projects uses a stable curated overview grid and reliable category states.
- Project detail fits inside the board viewport.
- Experience uses a continuous, controllable carousel.
- Every board remains usable at desktop and mobile widths without accidental page overflow.

This plan is for the next implementation agent. It describes the required result and the order of work. Do not begin with typography polish or animation tuning until the static geometry is correct.

## Source of truth

Use the sources in this order when they disagree:

1. Figma PNG exports in `agent_guides/figma_export/` define geometry, visual composition, visible artwork, and reference states.
2. `agent_guides/INTERACTION-SPEC.md` defines triggers, state changes, animation intent, and accessibility behavior.
3. `agent_guides/DESIGN-SYSTEM.md` defines palette, typography roles, tile rules, and board principles.
4. `agent_guides/FIGMA-REFERENCE.md` defines measured Figma node positions and dimensions.
5. `src/constants/portfolioData.js` supplies current project and experience content, unless it visibly conflicts with the export.
6. Existing React/CSS is an implementation reference only. Do not preserve behavior that causes the screenshot gaps.

The implemented screenshots are evidence of current defects, not a visual target.

## Reference canvas and shared rules

- Desktop reference: 1920 x 1080.
- Board inset: 16px on desktop.
- Tile gap: 10px.
- Tile radius: approximately 6px.
- Board grout/background: Ink `#16262B`.
- Keep boards inside one viewport at desktop. The board itself must not create a document scrollbar.
- Use local fonts already present in `src/assets/fonts/`:
  - Akira Expanded for display titles and nav labels.
  - JetBrains Mono for dates, clock, tags, status labels, and data-like copy.
  - SF Pro Rounded for expressive taglines and emphasis.
  - SF Pro for regular interface and body text.
- Preserve visible keyboard focus and reduced-motion behavior.
- Keep Puzzle Mode and Fun Mode mutually exclusive.

## Current root causes

### 1. Viewport contract is not enforced

`html`, `body`, `#root`, and `.tile-board` use `min-height` instead of a fixed viewport contract. Several board grids also use fixed row totals that can exceed the available height. This explains the vertical scrollbars and clipped controls in the captures.

Required direction:

- Set the root chain to `width: 100%; height: 100%; overflow: hidden`.
- Give each board root `height: 100dvh; overflow: hidden`.
- Make board interiors use `height: 100%` and `min-height: 0` through every grid/flex ancestor.
- Use fractional tracks or calculated tracks derived from the available board area.
- Allow an internal scroll region only where the design explicitly requires one, such as the Projects project list.

### 2. Home normal layout is coupled to Puzzle ordering

`HomeBoard` stores one flat `homeOrder` array and slices it into three unrelated grids. The same wrappers are also animated with Framer Motion layout transforms. This causes normal social tiles to collapse or appear in the wrong widths when layout state changes.

Required direction:

- Define a stable named-slot layout for the normal Home board.
- Keep Puzzle Mode ordering separate from the normal visual slot map.
- Do not derive the normal board by slicing a mutable order array.

### 3. Home expansions are nested and positioned twice

The expanded Skills and Contact components are inserted into the collapsed tile wrapper, while CSS targets both wrapper and child with the same expansion class and absolutely positions them. This causes misplaced panels and incorrect reflow.

Required direction:

- Render one board-level expansion layer as a sibling of the Home columns.
- Skills replaces the exact left-to-middle region shown in the Figma Skills export.
- Contact replaces the exact lower left-to-middle region shown in the Figma Contact export.
- Keep unrelated tiles in their original slots.
- Animate the expansion layer from the collapsed tile bounds and reverse the same transition when closing.

### 4. Projects mixes explicit grid coordinates with layout transforms

The Projects grid uses named CSS positions while project wrappers also use Framer `layout`. The grid defines four rows even though the Figma overview has three visible rows. Utility tiles are rendered for every category and lack stable animation keys.

Required direction:

- Stabilize the static grid first.
- Remove `layout` transforms from explicitly positioned overview cards until the composition is correct.
- Render utility tiles only in the ALL overview state.
- Give all animated direct children stable keys.
- Give filtered categories a separate deterministic layout.

### 5. Experience carousel uses an unmeasured percentage loop

The carousel animates duplicated entries from `0%` to `-50%` without measuring one loop segment. Speed and direction are part of the animation key, so changing controls remounts the track. Reduced motion pauses the carousel completely.

Required direction:

- Use a fixed viewport and two measured list groups.
- Move by pixel distance or a motion value based on the measured group height.
- Preserve offset when pausing, changing speed, or reversing.
- Provide a stable reduced-motion presentation instead of silently freezing a moving carousel.

## Implementation phases

### Phase 1: Lock the board viewport and shared tokens

Files:

- `src/index.css`
- `tailwind.config.js`
- `src/components/common/Tile.jsx`

Tasks:

1. Enforce the root and board viewport contract described above.
2. Replace board `min-height` assumptions with `height` and `min-height: 0` where appropriate.
3. Keep the desktop 16px inset and 10px grout.
4. Define shared CSS variables or Tailwind tokens for the documented palette.
5. Remove any overflow rule that hides unreachable content. Hidden overflow is acceptable only inside a deliberate carousel or media viewport.
6. Make text and icons scale with their tile at widths below the reference canvas.
7. Preserve a visible focus ring and reduced-motion media rules.

Acceptance:

- At 1920 x 1080, every board fits in one viewport.
- There is no document-level horizontal or vertical scrollbar.
- The only intentional scroll region on Projects is its project area.

### Phase 2: Rebuild normal Home as named slots

Files:

- `src/components/boards/HomeBoard.jsx`
- `src/index.css`
- `src/components/common/ClockTile.jsx`
- `src/components/common/GithubContributionTile.jsx`

Tasks:

1. Implement the Figma Home slots directly:
   - Profile photo.
   - Hero.
   - Clock and location.
   - Education and status.
   - GitHub, LinkedIn, and CV.
   - Quote banner.
   - Contribution graph.
   - Skills, Contact, Projects, and Experience tiles.
   - Puzzle and Fun controls.
2. Match the measured Figma rhythm: left 340px, center 1039px, right 489px at 1920px, with fluid scaling below that size.
3. Reserve arrow space in navigation tiles and anchor nav labels at bottom left.
4. Make the contribution graph fit its slot instead of determining the slot width from fixed cell sizes.
5. Keep the clock in Asia/Jakarta and update it live.
6. Keep loading and error states inside the contribution tile.
7. Move Puzzle ordering into a separate model so normal Home never changes shape when Puzzle is inactive.

Acceptance:

- Normal Home visually matches `agent_guides/figma_export/Home.png` in tile positions, proportions, colors, and major text anchors.
- Social tiles have equal intended widths.
- No tile title overlaps an arrow or escapes its tile.

### Phase 3: Implement board-level Skills and Contact expansion

Files:

- `src/components/boards/HomeBoard.jsx`
- `src/components/home/SkillsExpandedTile.jsx`
- `src/components/home/ContactExpandedTile.jsx`
- `src/index.css`

Tasks:

1. Render expansion panels as one sibling overlay/layer at board level.
2. Skills expanded state:
   - Replace the collapsed Skills tile plus the GitHub, LinkedIn, CV, and quote region shown in the Figma export.
   - Preserve Contact and the contribution graph in their normal slots.
   - Use a fixed title column, ten-icon first row, three-icon second row, unrelated-skills block, and close arrow.
3. Contact expanded state:
   - Replace the collapsed Contact and contribution region shown in the Figma export.
   - Keep upper Home tiles, right navigation tiles, and mode controls fixed.
   - Use the `CONTACT` label, close arrow, large CTA, and email placement from the export.
4. Support click/tap, close button, outside click, and Escape.
5. Keep only one expansion active at a time.
6. Use enter and exit animation. Respect reduced motion.

Acceptance:

- Skills matches `agent_guides/figma_export/Skill & Tools.png` without clipping.
- Contact matches `agent_guides/figma_export/Contact.png` without moving below the viewport.
- Opening one expansion closes the other without changing browser scroll position.

### Phase 4: Rebuild Projects overview and category layouts

Files:

- `src/components/boards/ProjectsBoard.jsx`
- `src/index.css`
- `src/constants/portfolioData.js` if explicit display flags are needed

Tasks:

1. Implement the fixed header and category bar separately from the project area.
2. Build the ALL overview as a curated three-row composition:
   - Four featured wide cards in the upper two rows.
   - Narasatya and utility tiles in their documented slots.
   - Three lower square project cards, filler, Currently Working On, and the coral strip.
3. Do not append extra project rows to the reference overview. Add a display/order flag if the current data set contains projects not represented in the export.
4. Render GitHub and Currently Working On only where the intended design calls for them, not repeatedly in every filtered category.
5. Build deterministic filtered layouts for WEB, MOBILE, and PERSONAL. Cards must fill available space without collapsing into strips.
6. Animate only the project area when changing category. Keep header and filter controls stable.
7. Use stable keys for every animated child.
8. Preserve the active category when opening and closing Project Detail.

Acceptance:

- ALL matches `agent_guides/figma_export/Projects.png`.
- Category views match the supplied category capture without duplicate utility tiles.
- Cards keep readable widths and artwork crops.
- Header and category bar do not jump when filtering.

### Phase 5: Fit Project Detail to the viewport

Files:

- `src/components/projects/ProjectDetailView.jsx`
- `src/components/projects/ProjectMediaCarousel.jsx`
- `src/index.css`

Tasks:

1. Keep the 150px board header and 50px detail bar within the fixed viewport.
2. Use a detail grid with proportional main content, 340px side column, and 135px coral strip at the desktop reference size.
3. Give the description a deliberate fixed/proportional row and the media tile the remaining height with `min-height: 0`.
4. Keep the carousel autoplaying, cross-fading, and pausing on hover/touch.
5. Ensure images do not change the parent tile height. Use `contain` or `cover` intentionally based on the media content.
6. Render a designed inactive CTA tile for projects without a public link instead of a small floating label.
7. Keep close behavior animated and preserve the selected category.

Acceptance:

- Project Detail matches `agent_guides/figma_export/Project Detail.png` compositionally.
- The full detail state is visible at 1920 x 1080 without page scroll.
- Media advances without changing layout height.

### Phase 6: Replace the Experience carousel implementation

Files:

- `src/components/experience/ExperienceCarousel.jsx`
- `src/components/boards/ExperienceBoard.jsx`
- `src/components/experience/SettingsPanel.jsx`
- `src/index.css`

Tasks:

1. Keep the Figma three-column board geometry and fixed header/settings/quote/education regions.
2. Give the middle column an explicit viewport with `overflow: hidden`.
3. Render two identical measured groups of experience cards.
4. Drive a continuous pixel offset and wrap it at the measured group height.
5. Pause on hover/touch and with Stop Carousel.
6. Change speed without remounting or jumping.
7. Reverse direction without remounting or losing the current offset.
8. Keep board-local Fun Mode behavior separate from Home Fun Mode unless the user later chooses to unify them.
9. For reduced motion, use a stable card or slow cross-fade instead of treating the carousel as broken.

Acceptance:

- Experience matches `agent_guides/figma_export/Experience.png` in macro geometry and text hierarchy.
- The list loops continuously with no blank gap.
- Every settings control changes behavior immediately and preserves position.

### Phase 7: Motion, interaction, and responsive pass

Files:

- All board and interaction components touched above.
- `src/index.css`

Tasks:

1. Add shared-element or measured transitions for board navigation where practical. The current App transition is only fade/scale and does not satisfy the intended tile-origin transition.
2. Ensure every interactive tile has default, hover, pressed, focus, and reduced-motion states.
3. Keep Fun Mode's own toggle accessible and stable.
4. Make Puzzle Mode draggable behavior understandable and keyboard reachable. If full 2D drag/reflow is implemented, use a grid-aware strategy rather than a one-step flat-array swap.
5. Define intentional mobile compositions instead of allowing desktop fixed rows to become a long accidental page.
6. Verify all outside-click listeners and timers clean up correctly.

Acceptance:

- Board navigation, expansion, filtering, detail open/close, carousel controls, Puzzle Mode, and Fun Mode all have visible state feedback.
- Reduced motion removes large physical movement while preserving state changes.
- Mobile remains readable and controls remain reachable.

## Verification matrix

Compare fresh screenshots against the matching Figma export at:

- 1920 x 1080.
- 1440 x 900.
- 1366 x 768.
- One narrow mobile viewport.

For each viewport verify:

- Home normal.
- Home Skills expanded.
- Home Contact expanded.
- Projects ALL.
- Projects WEB, MOBILE, and PERSONAL.
- Project Detail for a project with a CTA.
- Project Detail for a project without a CTA.
- Experience with carousel playing.
- Experience paused, reversed, and speed changed.

Check each state for:

- No unintended document scrollbar.
- No horizontal overflow.
- No clipped interactive control.
- No text overlapping icons or arrows.
- Correct tile colors and radius.
- Correct major text anchors and type roles.
- Correct image crop and media behavior.
- Stable state transitions and reverse transitions.

## Suggested execution order for another agent

1. Fix the root viewport contract.
2. Rebuild static Home named slots.
3. Rebuild static Projects ALL and filtered grids.
4. Fit Project Detail.
5. Rebuild Experience carousel.
6. Add board-level Skills and Contact states.
7. Add or tune motion and Puzzle/Fun behavior.
8. Tune typography, colors, image crops, and responsive details.
9. Produce fresh screenshots and compare them side by side with every supplied reference state.

Do not mark the work complete based on a successful build alone. Completion requires visual comparison and interaction verification against the matrix above.
