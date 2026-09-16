/*
 * FAQ content, in one place.
 *
 * These were previously passed as twelve individual props into four separate copies of a
 * vendored hover-list component, which is why the section could only ever be fixed by fighting
 * that component's internals: an image container rendered inside every text-only row, fixed
 * heights that clipped answers on a phone, and a 159px row that made the section feel broken.
 * The copy lives here now so one native accordion can render it.
 */

export const faqItems = [
  {
    number: '01',
    question: "What does Flinza Works actually do?",
    answer: "We're a data-driven ecommerce growth agency. We audit your funnel, test creative on 48-hour cycles, and scale what converts across Meta and TikTok — optimized for profit, not vanity metrics.",
  },
  {
    number: '02',
    question: "Who is this for?",
    answer: "Ecommerce and DTC brands spending $50K+ per month on paid media who need growth, not just ads. If you're pre-revenue, we're probably not the right fit yet.",
  },
  {
    number: '03',
    question: "How fast will we see results?",
    answer: "Testing starts in week one. Most brands see meaningful ROAS movement inside 30 days, with compounding gains as winning creative scales.",
  },
  {
    number: '04',
    question: "What's your pricing model?",
    answer: "Fixed-scope retainers or project engagements — no hourly billing. You always know what you're getting and when. Custom quotes are scoped within 48 hours of your first call.",
  },
  {
    number: '05',
    question: "What makes you different from other agencies?",
    answer: "We're not order takers. We challenge assumptions, test hypotheses, and kill losers fast. Weekly optimization calls and real-time Slack access mean you're never guessing.",
  },
  {
    number: '06',
    question: "Do you use AI UGC?",
    answer: "Yes — custom AI avatars produce unlimited user-generated content, so we test 10x more angles without creator bottlenecks, missed deadlines, or $300-per-video fees.",
  },
  {
    number: '07',
    question: "Who owns the creative and ad accounts?",
    answer: "You do — fully. All creative, assets, and ad accounts are 100% yours. We retain no rights, claim no licenses, and impose no usage restrictions.",
  },
  {
    number: '08',
    question: "Do you work with brands outside our country?",
    answer: "Yes — we're globally distributed with clients across North America, Europe, and the Middle East. Async-first communication keeps cross-timezone work smooth.",
  },
  {
    number: '09',
    question: "How do we get started?",
    answer: "Book a discovery call. We audit your funnel, creative, and attribution, find the 3–5 bottlenecks bleeding cash, and return a fixed quote within 48 hours.",
  },
  {
    number: '10',
    question: "Do you guarantee results?",
    answer: "No honest agency guarantees ROAS. What we guarantee is speed and rigor: 48-hour testing cycles, transparent dashboards, and profit-first decisions every single week.",
  },
  {
    number: '11',
    question: "What do you need from us to start?",
    answer: "Ad-account access, product feed, and a Slack channel. We handle strategy, creative, testing, and reporting — you keep building your product.",
  },
  {
    number: '12',
    question: "Can we see past work before signing?",
    answer: "Yes. On the discovery call we walk through anonymized case studies with real numbers — including the tests that failed, not just the winners.",
  },
];

export default faqItems;
