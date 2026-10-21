# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Players** who like word puzzles and roguelikes (Wordscapes, Balatro, Letterpress crowds), usually arriving from a social post or a store search on their phone. Job: understand in seconds what Weave plays like and decide whether to be told when it launches.
- **Press and creators** covering indie mobile games. Job: get facts, screenshots, the icon, and a contact address without emailing first.
- **Existing players** (later): find support, the FAQ, privacy and terms. App stores require the privacy policy URL.

## Product Purpose

The website of ThreadBind Studios, an independent studio whose first game is **Weave**. The site presents the studio, sells Weave before launch, and collects launch-notification sign-ups. Success: a visitor understands Weave's mechanism from the first viewport and leaves an email address.

## Positioning

Weave is a roguelike word game where the *shape* of a word's path scores, not only its letters: you trace words orthogonally through a letter grid (the loom), and every 90° bend adds to the multiplier, uncapped. Base × Mult, eight rising targets, miss one and the run ends. No other word game scores the geometry of the trace.

## Operating Context

- Weave is a portrait mobile game (iOS and Android), built in Godot 4.7. Pre-alpha; no store pages, no release date, no pricing announced.
- The game's live visual theme is **Cozy** (forest green, vermilion trace, parchment tiles); the other five themes in old material are no longer shipped and must not be advertised.
- Site visitors mostly arrive on phones.

## Capabilities and Constraints

- Stack: Astro (static output), plain CSS. Existing codebase; kept.
- Domain: `threadbindstudios.com`.
- Single contact address for now: `threadbindstudios@proton.me` (press, support, privacy, legal). Kept in one config value.
- Social profiles (Discord, X, Instagram, YouTube) do not exist yet; placeholders live in one config value.
- Forms: waitlist is a Google Form; contact and feedback are Atlassian Jira forms (links in `src/site.config.ts`).
- Analytics: Google Analytics 4, tag `G-7149QJJGP9`, once per page, behind a cookie-consent banner (Consent Mode).
- Undecided: release date, platforms launch order, price/monetisation model, final names for game terms (Pick, Pouch, Thread, Skein are working names).

## Brand Commitments

- Studio name: **ThreadBind Studios** (capital B). Studio mark: the woven diamond lattice, sewn in half-stitches for the logo (`public/press/threadbind-logo-stitched.svg`).
- Game name: **Weave**, tagline "Trace words. Bend the thread. Beat the target." App icon: `public/images/weave-icon.png`.
- Vocabulary comes from weaving: weave, loom, trace, pick, pouch, thread, skein, tapestry.

## Evidence on Hand

- Current Cozy screen renders: `D:\Game Dev\word-search\Weave\data\themes\cozy\png\screens\*@2x.png` (title, loom, reveal, shop, run track, scorecard, pouch picker, daily, profile and more). These are authored mockups of the game's UI, not captures of finished gameplay.
- Game design of record: `Weave/design.md` (scoring, run structure, pouches, modifiers).
- Old screenshots in `public/images/screenshots/` show retired themes; do not use except `cozy-*` as historical.
- No testimonials, review quotes, awards, player counts, or press coverage exist. Do not fabricate any.

## Product Principles

1. Show the mechanism, don't describe it: a bent trace scoring is the whole pitch.
2. Honest about stage: pre-alpha, no dates or prices promised.
3. Small studio, plain voice: specific nouns, no hype, no "revolutionary".
4. Mobile first: most visitors are on phones, and so is the game.

## Accessibility & Inclusion

WCAG 2.2 AA. Respect `prefers-reduced-motion`. Every image carries alt text.
