---
name: ThreadBind Studios
description: The studio site as a stitched sampler; Weave's page in the game's Cozy theme.
colors:
  forest-aida: "#0E3A25"
  forest-deep: "#0A2E1D"
  oxblood-aida: "#5C2230"
  saffron-aida: "#F2B705"
  vermilion-floss: "#E8452A"
  floss-cream: "#F6EBD3"
  floss-sage: "#CFDCCB"
  rose-floss: "#F0C9C2"
  cozy-forest-900: "#023019"
  cozy-forest-800: "#024022"
  cozy-forest-700: "#03502A"
  cozy-forest-500: "#046A38"
  cozy-trace: "#E34222"
  cozy-trace-deep: "#C83A1E"
  cozy-salmon: "#F2B8A1"
  cozy-parchment: "#F9EBD7"
  cozy-paper: "#FCF5EB"
  cozy-sage: "#72A480"
  cozy-dim: "#B0C4A7"
typography:
  display:
    fontFamily: "Stitched 5x7 (SVG cross-stitch, src/components/Stitched.astro)"
    fontSize: "fills its column; WEAVE spans ~55% of a 1440px hero"
  headline:
    fontFamily: "Fraunces Soft, Georgia, serif"
    fontSize: "clamp(2.2rem, 4.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Fraunces Soft, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.1
  lead:
    fontFamily: "Nunito Variable, Nunito, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Nunito Variable, Nunito, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "Nunito Variable, Nunito, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 800
rounded:
  none: "0px"
  tile: "8px"
  board: "14px"
  screen: "clamp(18px, 2.4vw, 28px)"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(88px, 11vw, 160px)"
  column-gap: "clamp(32px, 6vw, 96px)"
  container: "1328px"
components:
  button-primary:
    backgroundColor: "{colors.saffron-aida}"
    textColor: "{colors.forest-aida}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "#FFC92E"
  button-forest:
    backgroundColor: "{colors.forest-aida}"
    textColor: "{colors.floss-cream}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  button-forest-hover:
    backgroundColor: "#134A30"
  button-trace:
    backgroundColor: "{colors.cozy-trace-deep}"
    textColor: "{colors.cozy-paper}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  button-trace-hover:
    backgroundColor: "#A93018"
  loom-tile-cozy:
    backgroundColor: "{colors.cozy-parchment}"
    textColor: "{colors.cozy-forest-900}"
    typography: "{typography.title}"
  loom-tile-cozy-traced:
    backgroundColor: "{colors.cozy-salmon}"
    textColor: "{colors.cozy-parchment}"
---

# Design System: ThreadBind Studios

## Overview

**Creative North Star: "The Studio Sampler"**

The site is a sampler the studio stitched: every section is a whole piece of aida cloth, headlines are worked in cross-stitch on a 5×7 grid, and the signature object is a playable loom stretched on a scroll frame. Colour arrives as cloth at page scale, never as accents on a neutral template. Type is thread: stitched letters for display, then Fraunces Soft and Nunito (the two faces Weave itself ships) for everything set.

The home page is the studio: THREADBIND stitched as the heading and the lattice mark sewn in satin half-stitches. Weave's page carries the game, with the playable loom, scoring, the run and the screens. It changes cloth but not grammar, wearing the game's Cozy theme from header to footer (forest, vermilion trace, parchment, salmon), so the site and the game read as one object.

Density is generous. One idea per section, large type, square-cornered controls, and no ornament that isn't thread or cloth.

**Key Characteristics:**
- Whole-section cloths with a visible hole grid; colour changes happen at section edges.
- Stitched 5×7 display lettering; Fraunces Soft headings; Nunito text.
- A live loom as the signature: traced cells fill with stitches, the trace is a dashed backstitch.
- Flat surfaces, no shadows at rest, square buttons.
- One authored motion: top-of-page stitching sews in; the opening trace sews itself and the score counts up.

## Colors

Saturated textile colours used as whole cloths, with cream floss for thread on dark grounds.

### Primary
- **Forest Aida** (#0E3A25): the default page cloth, the hero ground and the header; forest-deep (#0A2E1D) is its tone step for alternate sections and the mobile menu.
- **Saffron Aida** (#F2B705): the action colour (primary buttons, the header button, the studio mark) and a light cloth for scoring, factsheet and closing sections, always with forest text.

### Secondary
- **Oxblood Aida** (#5C2230): the cloth stretched on the loom's scroll frame, the screens section and the footer.

### Tertiary
- **Vermilion Floss** (#E8452A): stitched display lettering on forest and the bend cells of the loom. Display-size only; never body text.

### Neutral
- **Floss Cream** (#F6EBD3): text on every dark cloth.
- **Sage Floss** (#CFDCCB): secondary text on forest.
- **Rose Floss** (#F0C9C2): secondary text on oxblood; the loom's warning state.

### Weave (Cozy theme)
Taken unchanged from `Weave/data/themes/cozy/tokens.json`. The cloth is Cozy forest-900 (#023019), with forest-700 (#03502A) and forest-800 (#024022) as steps. Parchment (#F9EBD7) is used for tiles and light cloths. The trace (#E34222) draws on the loom; trace-deep (#C83A1E) is for buttons with paper (#FCF5EB) text. Salmon (#F2B8A1) is for traced cells and headings on Cozy forest. Sage (#72A480) and dim (#B0C4A7) are for secondary text.

### Named Rules
**The Whole Cloth Rule.** A colour that isn't text owns a whole section edge to edge. If a colour would appear as a small accent tile on another cloth, it's the wrong colour.

**The Cozy Page Rule.** Anything inside `html[data-cloth='cozy']` (the Weave page) uses only Cozy tokens, including the header button, nav accent and footer. Saffron and oxblood never appear there.

**The Large Vermilion Rule.** Vermilion (#E8452A / #E34222) on forest falls below 3:1 at text sizes, so it only sets stitched display type or fills. Headings on Cozy forest use salmon instead.

## Typography

**Display Font:** stitched 5×7 cross-stitch alphabet (SVG, generated at build), A–Z, 0–9 and `. , ' ! ? - + = ×`
**Headline Font:** Fraunces Soft ExtraBold (self-hosted from Weave's own font files, with Georgia)
**Body Font:** Nunito Variable (with system-ui)

**Character:** The stitched alphabet is the hand. Fraunces Soft's rounded serifs are the game's voice, and Nunito's round terminals match the round caps of the thread.

### Hierarchy
- **Display** (stitched, width-driven): the page's name or one formula, once per screen: WEAVE, page words like SUPPORT, 404, 11×8=88, and the footer signature.
- **Headline** (Fraunces 800, clamp(2.2rem, 4.6vw, 4rem), 1.02): section headings, two lines at most.
- **Title** (Fraunces 800, clamp(1.5rem, 2.4vw, 2rem), 1.1): sub-headings, page-head statement lines, FAQ questions.
- **Lead** (Nunito 500, clamp(1.15rem, 1.6vw, 1.4rem), 1.5, max 44–52ch): the one sentence under a heading.
- **Body** (Nunito 500, 18px, 1.55, 64–68ch): running text. Legal prose sits in one 68ch column.
- **Label** (Nunito 800, 15px): captions, fact terms, small notes. Sentence case; no tracked capitals.

### Named Rules
**The Stitched Heading Rule.** Stitched lettering is always either the `<h1>`, with the real title in visually hidden text, or `aria-hidden` decoration beside a real heading. It is never the only copy of meaningful text.

**The Two Faces Rule.** Fraunces Soft and Nunito are the only typefaces. Fraunces appears outside headings only inside game-UI fragments, such as loom tiles.

## Layout

The container is 1328px max, centred, with an equal fluid gutter of clamp(20px, 4vw, 56px) on both sides. Sections are separated by clamp(88px, 11vw, 160px) of their own cloth, not by space between cloths. Most sections use a two-column split, roughly 6fr/5fr (copy and object), with a clamp(32px, 6vw, 96px) gap. Neighbouring sections alternate the side or switch to a full-width row: the patches, the screens or the logo grid.

The hero puts the stitched name and pitch on the left and the loom on the right. The loom's width is capped at max(400px, 100vh − 260px), so the board and tally fit in the first screen. At ≤900px, splits stack to one column. At ≤860px the header collapses to the mark, a Menu disclosure, and the waitlist button; that button is hidden when the hero already carries one. On a 390×844 phone, the full loom and its tally sit inside the first screen.

## Elevation & Depth

The system is flat. Depth comes from cloth: a section is a different fabric, and the hole-grid texture (a 9px SVG dot tile) gives every surface a woven plane. Nothing casts a shadow at rest. The only raised object is the scroll frame's wooden rollers, drawn as flat SVG wood with highlight and grain bands, not CSS shadows.

### Named Rules
**The Fabric Not Shadow Rule.** Separate surfaces by changing cloth or tone (forest to forest-deep), never with box-shadow or a hairline border. The cookie banner is the single exception, because it floats over the page.

## Shapes

Controls and cloths are square (0px). Rounding is reserved for the game's own UI: loom tiles (8px), the Cozy board (14px) and game screenshots (clamp(18px, 2.4vw, 28px)), which keep the phone screen's corner. Stitches have round caps. The studio lattice is a basket weave turned 45°: cross-stitched in letters, satin half-stitches in the mark.

## Components

### Buttons
- **Shape:** square (0px), 54px tall, 0 28px padding, Nunito 800 17px.
- **Primary:** saffron with forest text. On saffron cloth, use the forest button (forest with cream text). On the Weave page, use the trace button (trace-deep with paper text).
- **Hover / Focus:** hover lightens the fill (#FFC92E saffron, #A93018 trace) and press scales to 0.97 over 160ms on cubic-bezier(0.23, 1, 0.32, 1). Focus is a 3px saffron outline, offset 3px.
- **Loading:** a button that opens an external form shows a running dashed thread after its label for 1.6s.
- **Text links:** Nunito 800, 2px underline offset 5px, dashed on hover.

### Navigation
The wordmark (lattice mark plus name) sits left, with four links: Weave, Studio, Press, Support. The current page gets a dashed underline in saffron, or salmon on the Weave page. The waitlist button sits right. On mobile, a "Menu" disclosure opens a full-width panel on forest-deep. A dashed saffron thread runs along the top of the viewport while the next page loads.

### Cloth section
A full-bleed `section` using one of the cloths (forest, deep, oxblood, saffron, Cozy, Cozy-700, parchment), each with the hole-grid texture.

### Loom (signature)
A playable 6×6 Weave loom that scores with the game's rules and dictionary (`src/scripts/loom.js`). The cloth is stretched on a scroll frame, with wooden rollers wider than the cloth, and the tally reads in Fraunces.
- **Oxblood cloth (studio colours):** traced cells fill with saffron stitches, bends with vermilion, and the trace is a cream dashed backstitch.
- **Parchment cloth (Cozy, used on Weave's page):** traced cells fill with salmon, bends with the vermilion trace, and the backstitch is trace-deep.
- **Motion:** on load, THREAD sews itself in (an SVG mask draws along the path), traced cells fill in order, and the score counts up 0 → 88.
- **States and input:** drag, tap or keyboard (arrows, Enter, Escape). Status shows short visible text, while the full sentence goes to a visually hidden live region.

### Run patches
Eight square cloth patches, one per weave. Cleared patches are crossed with a stitched X and the current one has an inset ring. In the studio colours the tiers are forest, oxblood and deep oxblood; in Cozy they are sage, trace and deep red. Below 760px they wrap into four columns.

### Studio mark and logo
The lattice is sewn in satin half-stitches (`StitchedMark`). Its geometry is shared with the press logo files through `src/lib/stitch.mjs`. The logo stacks the mark over a cross-stitched THREADBIND and a smaller saffron STUDIOS. The solid-bar lattice (`Mark`) is kept for small sizes: the header wordmark and the favicons.

### Cookie banner
A slim bar fixed 16px above the bottom edge, inside the page gutters. It sits on deep forest (Cozy-800 on Weave's page) with a 3px dashed saffron edge, the one stitched border in the system. The only shadow in the system appears here, because the banner genuinely floats. Accept is the primary button and No thanks the ghost button (2px inset floss ring). On phones it stacks.

### Game screen
A phone-ratio game render on its own Cozy-800 cloth that fades in once decoded, served as AVIF with a WebP fallback at 360–1080w and captioned in sentence case.

## Do's and Don'ts

### Do:
- **Do** give every new section a whole cloth from the palette, with the hole-grid texture.
- **Do** set a new page's `<h1>` as stitched lettering with the real title in visually hidden text, and pair it with a Fraunces statement line.
- **Do** use Weave's own screens and the live loom as the page's pictures; caption them as in-development renders.
- **Do** keep vermilion to display stitching and fills; use cream, sage or rose floss for text on dark cloth.
- **Do** honour `prefers-reduced-motion`: all sewing, count-ups and pending threads stop.

### Don't:
- **Don't** add shadows, gradients, glass or hairline borders to separate surfaces; change the cloth instead.
- **Don't** add a third typeface, tracked uppercase labels, or a small label above a heading.
- **Don't** round buttons or cloths; rounding belongs to game UI fragments only.
- **Don't** use saffron or oxblood on the Weave page.
- **Don't** animate section entrances; the one motion is stitching at the top of the page and the loom's opening trace.
