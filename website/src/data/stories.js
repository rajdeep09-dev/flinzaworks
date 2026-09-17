/*
 * The founder stories shown above the voice notes.
 *
 * Each item declares its own aspect, so a portrait story and a 16:9 clip can sit in the same
 * strip: the strip is a strip of mixed media, not a row of squares, and letting the data carry
 * the shape is what keeps `FramerStory` from having to guess.
 *
 * These used to be declared inline in `app/page.jsx`. They are pure data and they never change at
 * runtime, so they live beside the rest of the site's copy.
 */

export const founderStories = [
  {
    id: 'sarah',
    title: 'Sarah M.',
    time: '2h',
    image: { src: '/images/avatar_sarah.jpg', alt: 'Sarah Mitchell' },
    items: [
      { kind: 'image', image: { src: '/images/story_portrait.jpg', alt: 'Founder portrait' }, durationMs: 4600, aspect: '9:16', caption: 'Day 40 in the account.' },
      { kind: 'video', videoFile: '/videos/story1.mp4', aspect: '16:9', caption: 'Creative we shipped this week.' },
    ],
  },
  {
    id: 'marcus',
    title: 'Marcus B.',
    time: '5h',
    image: { src: '/images/avatar_marcus.png', alt: 'Marcus Bell' },
    items: [
      { kind: 'image', image: { src: '/images/story_traffic.jpg', alt: 'Traffic dashboard' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story2.mp4', aspect: '16:9' },
    ],
    ctaLabel: 'See the audit',
    ctaLink: '/contact',
  },
  {
    id: 'charlie',
    title: 'Charlie N.',
    time: '1d',
    image: { src: '/images/avatar_charlie.png', alt: 'Charlie Nguyen' },
    items: [
      { kind: 'image', image: { src: '/images/story_action.jpg', alt: 'Production still' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story3.mp4', aspect: '16:9' },
    ],
  },
];
