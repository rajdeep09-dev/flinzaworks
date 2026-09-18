/*
 * FAQ content, in one place.
 *
 * These were previously passed as twelve individual props into four separate copies of a
 * vendored hover-list component, which is why the section could only ever be fixed by fighting
 * that component's internals. The copy lives here now so one native accordion can render it.
 *
 * ── Rules for this file ──
 *
 *  1. The first sentence answers the question outright. That is what a featured snippet and an AI
 *     Overview quote, and it is also just the polite way to answer a question.
 *  2. Answers stay under ~60 words. Long answers do not get quoted.
 *  3. In the rendered HTML each `question` is a heading and each `answer` sits in a paragraph
 *     immediately beneath it, and `buildFaqSchema()` in ./seo.js mirrors this array into FAQPage
 *     JSON-LD — so the machine-readable answer and the human-readable one cannot drift.
 *  4. No question here may mention AI UGC. That service is not offered any more.
 */

export const faqItems = [
  {
    number: '01',
    question: 'What does Flinza Works actually do?',
    answer:
      'Flinza Works is an ecommerce growth agency. We run Meta ads, creator-led content, founder-led content and launch clipping for DTC brands, and we optimise all of it for profit contribution rather than platform-reported ROAS.',
  },
  {
    number: '02',
    question: 'Who is Flinza Works for?',
    answer:
      'Ecommerce and DTC brands spending $50K or more per month on paid media who need profit, not just impressions. If you are pre-revenue, we are probably not the right fit yet, and we will say so on the call.',
  },
  {
    number: '03',
    question: 'How fast will we see results?',
    answer:
      'Testing starts in week one. Most brands see meaningful movement inside 30 days, and the gains compound as winning creative and winning audiences scale.',
  },
  {
    number: '04',
    question: 'What does Flinza Works charge?',
    answer:
      'Fixed-scope retainers or project engagements, never hourly billing. You get a written scope and a fixed quote within 48 hours of the discovery call, so there are no surprise invoices.',
  },
  {
    number: '05',
    question: 'What makes Flinza Works different from other agencies?',
    answer:
      'We are not order takers. We challenge the brief before spending the budget, we kill losers fast, and a strategist who owns your numbers stays in your Slack rather than relaying messages.',
  },
  {
    number: '06',
    question: 'Do you work with creators?',
    answer:
      'Yes. We source and vet creators on engagement quality rather than follower count, and we handle scripting, briefing, editing and paid usage rights end to end. You approve the cut; we ship it.',
  },
  {
    number: '07',
    question: 'Who owns the creative and the ad accounts?',
    answer:
      'You do, fully. Ad accounts, creative files, creator contracts and data are all yours. We retain no rights, claim no licence and impose no lock-in.',
  },
  {
    number: '08',
    question: 'Do you work with brands outside your own country?',
    answer:
      'Yes. We work async-first with clients across North America, Europe, the UK and the Middle East, and we keep a written weekly read of the numbers so nothing depends on a timezone overlap.',
  },
  {
    number: '09',
    question: 'How do we get started?',
    answer:
      'Book a discovery call. We audit your funnel, creative and attribution, find the three to five bottlenecks costing you the most, and return a fixed quote within 48 hours.',
  },
  {
    number: '10',
    question: 'Do you guarantee results?',
    answer:
      'No honest agency guarantees ROAS. What we commit to is rigour: 48-hour testing cycles, transparent dashboards, and profit-first decisions every single week.',
  },
  {
    number: '11',
    question: 'What do you need from us to start?',
    answer:
      'Ad-account access, your product feed and a Slack channel. We handle strategy, creative, testing and reporting, so your team keeps building the product.',
  },
  {
    number: '12',
    question: 'Can we see past work before signing?',
    answer:
      'Yes. On the discovery call we walk through case studies with real numbers, including the tests that failed. Some client names are under NDA and are shown as anonymised sectors instead.',
  },
];

export default faqItems;
