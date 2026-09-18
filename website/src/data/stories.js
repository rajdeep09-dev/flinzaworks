/*
 * stories.js — the story strip above the voice notes on the home page.
 *
 * ── Why there are no names ──
 *
 * The strip used to be headed with the first names of three "clients" whose thumbnails were the
 * same four avatar files used for the team on /about. The names were invented; the faces belonged
 * to other people. Each entry is now labelled by the kind of business it came from and illustrated
 * with production stills rather than a portrait, which is honest and needs nobody's permission.
 *
 * Each item declares its own aspect, so a portrait story and a 16:9 clip can sit in the same
 * strip: the strip is a strip of mixed media, not a row of squares, and letting the data carry
 * the shape is what keeps `FramerStory` from having to guess.
 */

export const founderStories = [
  {
    id: 'dtc-home',
    title: 'DTC Home',
    time: '2h',
    image: { src: '/images/story_action.jpg', alt: 'Production still from a client shoot' },
    items: [
      { kind: 'image', image: { src: '/images/story_portrait.jpg', alt: 'Product still from a client shoot' }, durationMs: 4600, aspect: '9:16', caption: 'Day 40 in the account.' },
      { kind: 'video', videoFile: '/videos/story1.mp4', aspect: '16:9', caption: 'Creative we shipped this week.' },
    ],
  },
  {
    id: 'dtc-apparel',
    title: 'DTC Apparel',
    time: '5h',
    image: { src: '/images/story_traffic.jpg', alt: 'Traffic dashboard from a live account' },
    items: [
      { kind: 'image', image: { src: '/images/story_traffic.jpg', alt: 'Traffic dashboard from a live account' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story2.mp4', aspect: '16:9' },
    ],
    ctaLabel: 'See the audit',
    ctaLink: '/contact',
  },
  {
    id: 'stillring',
    title: 'StillRing',
    time: '1d',
    image: { src: '/images/story_portrait.jpg', alt: 'Product still from the StillRing campaign' },
    items: [
      { kind: 'image', image: { src: '/images/story_action.jpg', alt: 'Production still' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story3.mp4', aspect: '16:9' },
    ],
  },
];

export default founderStories;
