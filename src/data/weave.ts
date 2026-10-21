import title from '../assets/screens/title.png';
import loom from '../assets/screens/loom.png';
import reveal from '../assets/screens/reveal.png';
import shop from '../assets/screens/shop.png';
import runTrack from '../assets/screens/run_track.png';
import scorecard from '../assets/screens/scorecard.png';
import pouchPicker from '../assets/screens/pouch_picker.png';

// Facts about Weave, from Weave/design.md and the Cozy theme tokens. Names are working names.

export const pouches = [
  { id: 'commons', name: 'Commons', theme: 'Everyday English. The starting pouch.', perk: 'No perk; the widest vocabulary', words: 28739, color: '#B8AE9F' },
  { id: 'kinfolk', name: 'Kinfolk', theme: 'People, crowds and what they say to each other.', perk: 'Market Day: the shop offers 8 items', words: 7298, color: '#E65638' },
  { id: 'reverie', name: 'Reverie', theme: 'Thought, feeling and the qualities of things.', perk: 'Deep Water: uncommon words gain +2 mult', words: 5909, color: '#ED8E73' },
  { id: 'forge', name: 'Forge', theme: 'Tools, engines, materials, things made by hand.', perk: 'Own Hands: modifiers cost 15% less', words: 5374, color: '#023A1F' },
  { id: 'fray', name: 'Fray', theme: 'Deeds, contests, trade and effort.', perk: 'Piecework: +25 Thread per weave cleared', words: 3642, color: '#8D2915' },
  { id: 'wildwood', name: 'Wildwood', theme: 'Beasts, plants, weather, stone and the body.', perk: 'Forager: carry 5 notions instead of 3', words: 2635, color: '#046A38' },
  { id: 'wayfarer', name: 'Wayfarer', theme: 'Places, journeys, seasons, time passing.', perk: 'Winding Road: every bend gives +1 extra mult', words: 2320, color: '#9F2E18' },
] as const;

// A run: eight weaves, drawn from three tiers. Miss one target and the run ends.
export const run = [
  { tier: 'Easy', weaves: [1, 2] },
  { tier: 'Medium', weaves: [3, 4, 5, 6] },
  { tier: 'Hard', weaves: [7, 8] },
] as const;

// From the run-track screen: authored example weaves and their targets.
export const exampleRun = [
  { name: 'Open Loom', target: 200, tier: 'Easy' },
  { name: 'Generous', target: 390, tier: 'Easy' },
  { name: 'Thrift', target: 730, tier: 'Medium' },
  { name: 'Crossing', target: 1300, tier: 'Medium' },
  { name: 'Deep Pile', target: 2210, tier: 'Medium' },
  { name: '?', target: null, tier: 'Medium' },
  { name: '?', target: null, tier: 'Hard' },
  { name: '?', target: null, tier: 'Hard' },
] as const;

// Screens from Weave's Cozy theme (Weave/data/themes/cozy/png/screens). They are design
// renders of the in-development UI, so captions say so.
export const screens = {
  title: { src: title, alt: 'Weave title screen: the WEAVE logo over a 3×3 loom with WEAVE traced in red, and Start Weave, Daily Puzzle, Pouch Collection and How to Play buttons on forest green.' },
  loom: { src: loom, alt: 'Weave 4 in play: THREAD traced through a 6×6 letter grid with two bends, scoring base 11 × mult 8 = 88 toward a target of 1,300.' },
  reveal: { src: reveal, alt: 'The Next Weave screen: Unravel, a hard-tier weave with a 5,470 target on a 7×7 loom and 6 picks, where letters of a scored word are removed.' },
  shop: { src: shop, alt: 'The shop between weaves: six modifiers such as Flax Thread (+8 base), Bent Line (+1 mult per bend) and Golden Shuttle (×2 mult), plus Shuffle, Hint and Extra Pick notions, priced in Thread.' },
  runTrack: { src: runTrack, alt: 'The Tapestry screen: a run of eight weaves on a track split into easy, medium and hard. Open Loom, Generous and Thrift are cleared; Crossing, target 1,300, is being played.' },
  scorecard: { src: scorecard, alt: 'Tapestry Complete: a final score of 31,480 with all eight weaves cleared, the Mastery earned and the Skein and Guild points awarded.' },
  pouchPicker: { src: pouchPicker, alt: 'The Pouches screen: Commons, Kinfolk, Reverie, Forge, Fray, Wildwood and Wayfarer, each with its word count and perk.' },
} as const;
