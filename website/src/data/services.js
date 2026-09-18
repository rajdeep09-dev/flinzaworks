/*
 * The eight services, and the five service pages that sell them.
 *
 * ── Two exports, two jobs ──
 *
 * `SERVICES` is the index: one line per service, with what it is and who it is for. It backs the
 * /services page and the footer's Services column.
 *
 * `servicePages` is the keyword-cluster landing page set the SEO plan asks for. One page per
 * cluster — /services/meta-ads, /services/creative-testing, /services/creator-partnerships,
 * /services/founder-led-content, /services/launch-clipping — because a single generic /services
 * page cannot rank for five different searches, and a prospect searching for "creative testing
 * agency" should land on a page about creative testing.
 *
 * Every landing page carries:
 *   · `answer` — a 40–60 word, self-contained answer to "what is this and who is it for". It is
 *     rendered directly under the H1 and mirrored into the page's Service + FAQPage JSON-LD, which
 *     is what makes it quotable in an AI Overview instead of just present on the page.
 *   · `proofTag` — the case study tag from ./projects.js whose numbers this page is allowed to
 *     quote. The number is read from there, never retyped, so a page cannot overstate the proof.
 *   · `faq` — three or four answer-first questions, each under 60 words.
 */

import { carouselProjects } from './projects';

export const SERVICES = [
  {
    number: '01',
    title: 'Revenue leak audit',
    for: 'Brands that cannot explain where growth stalled',
    copy: 'We audit funnel, creative, attribution and margin, then rank the three to five bottlenecks by how much they cost you per month.',
    slug: null,
  },
  {
    number: '02',
    title: 'High-converting Meta ads',
    for: 'Accounts with spend but no profit',
    copy: 'Meta rebuilt around how the algorithm actually allocates spend, optimised to contribution margin rather than platform-reported ROAS.',
    slug: 'meta-ads',
  },
  {
    number: '03',
    title: 'Creator-led content',
    for: 'Brands that need volume without creator bottlenecks',
    copy: 'We bring the best creators in your niche to promote your product — scripting, briefing, editing and paid usage rights handled end to end by us.',
    slug: 'creator-partnerships',
  },
  {
    number: '04',
    title: 'Founder-led content',
    for: 'Founders who are the best asset they own',
    copy: 'One shoot a month becomes shorts, reels, YouTube videos and podcast episodes — scripted and edited by us.',
    slug: 'founder-led-content',
  },
  {
    number: '05',
    title: 'Clipping for awareness & launches',
    for: 'Launch windows that cannot go quiet',
    copy: 'A high-volume clipping engine producing vertical cut-downs from long-form, podcasts and creator footage, on a publishing calendar.',
    slug: 'launch-clipping',
  },
  {
    number: '06',
    title: 'Conversion video production',
    for: 'Products that need better creative, fast',
    copy: 'Product video shot, edited and tested on 48-hour cycles, with multiple angles per cycle so winners surface inside two weeks.',
    slug: 'creative-testing',
  },
  {
    number: '07',
    title: 'Profit-first optimisation',
    for: 'High-ROAS brands quietly burning cash',
    copy: 'Northbeam, GA4 and Triple Whale modelling that separates real profit from the numbers the platforms want you to celebrate.',
    slug: null,
  },
  {
    number: '08',
    title: 'Rapid iteration at volume',
    for: 'Teams whose feedback loop is too slow',
    copy: 'Systematic A/B testing on 48-hour cycles with one written decision rule, so the account keeps learning instead of plateauing.',
    slug: null,
  },
];

export const servicePages = [
  {
    slug: 'meta-ads',
    label: 'Meta ads',
    ordinal: '01',
    overline: 'Service · Paid social',
    h1: 'Meta ads built around',
    h1em: 'how the algorithm works',
    /* No brand suffix: `layout.jsx` sets `title.template: '%s | Flinza Works'`, so writing it here
       too would render "… | Flinza Works | Flinza Works". */
    metaTitle: 'Meta Ads Agency for Ecommerce (DTC)',
    metaDescription:
      'A Meta ads agency for ecommerce brands spending $50K+ a month. Accounts rebuilt around how the algorithm allocates spend, optimised for profit — not ROAS.',
    lede:
      'Meta does not reward the neatest account structure. It rewards the account that gives it the clearest signal about which creative works. We build for the model, not for the org chart.',
    answer:
      'Flinza Works is a Meta ads agency for ecommerce and DTC brands spending $50K or more per month. We rebuild accounts around how the algorithm allocates spend, test creative on 48-hour cycles, and optimise every decision against contribution margin rather than platform-reported ROAS.',
    keywords: [
      'meta ads agency for ecommerce',
      'facebook ads agency DTC',
      'meta ads agency $50k per month',
      'scale meta ads profitably',
    ],
    sections: [
      {
        heading: 'What we actually change',
        body: [
          'Most accounts we take over are over-segmented and under-fed: a dozen audiences, one creative each, no campaign with enough budget to leave the learning phase. The algorithm cannot tell which ad works when every ad is starved of spend.',
          'We consolidate until each campaign can learn, put distinct creative concepts together rather than one creative across twelve audiences, and let creative do the segmentation. Then we raise budget in steps and watch margin, not the dashboard\u2019s favourite metric.',
        ],
        list: [
          'Account consolidation around signal, not taxonomy',
          'Broad targeting with creative carrying the segmentation',
          'Budget scaled in steps against a written margin threshold',
        ],
      },
      {
        heading: 'What we test, and how fast',
        body: [
          'A batch of concepts every 48 hours, one variable each — hook, body or offer. Fixed test budget per concept, one written scale-or-kill rule, applied on the day. No weekly meeting decides anything.',
          'Creative is the one variable with real headroom left. Audiences have largely been absorbed by the platform; the ad itself is still yours to lose.',
        ],
      },
      {
        heading: 'The campaigns we switch off',
        body: [
          'Retargeting that takes credit for demand the brand created anyway, and brand-search campaigns reporting enormous ROAS against people who were going to buy regardless. Both look excellent in a report and both are often just paying for demand that already existed.',
          'We test them honestly: off for two weeks, then compare total revenue rather than platform-attributed revenue. The gap is what the campaign was really buying.',
        ],
      },
    ],
    deliverables: [
      'Full account rebuild and structure audit',
      'Weekly creative testing batches and read-outs',
      'Profit-contribution dashboards in Triple Whale or Northbeam',
      'A strategist in your Slack, with weekly optimisation calls',
    ],
    proofTag: '02 // META ADS',
    faq: [
      {
        number: '01',
        question: 'How much ad spend do you need to work with us?',
        answer:
          'Around $50K per month or more, because the testing cadence we run needs enough budget per concept to produce a readable result. Below that the cycle gets slower and the numbers get noisier.',
      },
      {
        number: '02',
        question: 'Do you take over our existing ad account?',
        answer:
          'Yes, and you keep ownership of it permanently. We work inside your Business Manager with our own access, and we never create a new account we control or hold your assets hostage.',
      },
      {
        number: '03',
        question: 'How quickly does Meta performance improve?',
        answer:
          'Testing starts in week one and most accounts show meaningful movement within 30 days. Structural changes that affect margin at scale compound over two to three months as winning creative accumulates.',
      },
      {
        number: '04',
        question: 'What is the difference between ROAS and profit contribution?',
        answer:
          'ROAS is gross revenue divided by spend, measured inside the platform. Profit contribution is what is left after cost of goods, fees, fulfilment, discounts and returns. A 4x ROAS can still lose money.',
      },
    ],
  },
  {
    slug: 'creative-testing',
    label: 'Creative testing',
    ordinal: '02',
    overline: 'Service · Performance creative',
    h1: 'Creative testing on a',
    h1em: '48-hour cycle',
    metaTitle: 'Creative Testing Agency for Ecommerce',
    metaDescription:
      'A performance creative and testing agency for ecommerce. 48-hour testing cycles, conversion-led product video, and one written scale-or-kill rule.',
    lede:
      'Forty angles in six weeks is not a volume trick. It is a decision-rule trick — and the reason most brands cannot run this cadence has nothing to do with budget.',
    answer:
      'Flinza Works is a performance creative agency for ecommerce brands. We produce conversion-led product video and run 48-hour creative testing cycles: a batch of concepts, a fixed test budget each, and one written scale-or-kill threshold applied the same day, every day.',
    keywords: [
      'creative testing agency',
      'performance creative agency',
      'product video ads agency',
      'creative testing framework',
    ],
    sections: [
      {
        heading: 'The cycle',
        body: [
          'Day one, brief and produce a batch. Day two, it goes live against a fixed test budget with one variable changed per concept. Day three, read it against the threshold, scale or kill, and the next batch is already briefed.',
          'No single test is precious. You are running a portfolio of fixed-cost bets, and the portfolio is what pays — not any one video.',
        ],
      },
      {
        heading: 'The threshold is the system',
        body: [
          'We write the threshold down before the batch launches, in the same document as the brief. Above it, budget goes up in steps. Below it, the concept goes off today.',
          'That rule is what removes the meeting. If every scale and kill needs a discussion, the cycle is 48 hours on paper and two weeks in practice — which is the state most accounts are already in when they arrive.',
        ],
        list: [
          'One variable per concept: hook, body or offer',
          'Fixed test budget agreed before launch',
          'One threshold, applied the same day, every time',
        ],
      },
      {
        heading: 'Product video that sells, not just looks good',
        body: [
          'Conversion video is shot and edited for the feed it runs in: vertical first, hook inside the first second, the product demonstrated rather than described, and a cut for paid that is different from the cut for organic.',
          'We produce multiple angles per cycle so that a losing visual treatment is not mistaken for a losing idea. Often the concept is right and the first three seconds are wrong.',
        ],
      },
    ],
    deliverables: [
      'A batch of tested concepts every 48 hours',
      'Conversion-led product video, shot and edited by us',
      'Hook, body and offer tested independently',
      'A written threshold and weekly read-out of what it decided',
    ],
    proofTag: '06 // CREATIVE',
    faq: [
      {
        number: '01',
        question: 'What is a 48-hour creative testing cycle?',
        answer:
          'It is a batch of concepts shipped every two days, each with a fixed test budget and one variable changed. After 48 hours each concept is scaled or killed against a written threshold, with no meeting in between.',
      },
      {
        number: '02',
        question: 'How many creative angles should we test per month?',
        answer:
          'Most of the accounts we run test between 30 and 60 concepts a month once the cycle is established. Volume matters less than consistency — a steady weekly batch beats one large production every quarter.',
      },
      {
        number: '03',
        question: 'Do you shoot the video or do we?',
        answer:
          'We do, end to end: scripting, shooting, editing and cutdowns for each placement. We also work with footage you already own, and with creator and founder footage, which is usually faster and cheaper than a studio shoot.',
      },
      {
        number: '04',
        question: 'Can you test with the creative we already have?',
        answer:
          'Yes, and that is usually week one. We audit existing assets, find the winners that were never given enough budget, and start the cycle from what you already own while new concepts are produced.',
      },
    ],
  },
  {
    slug: 'creator-partnerships',
    label: 'Creator partnerships',
    ordinal: '03',
    overline: 'Service · Creator-led growth',
    h1: 'Creators who actually',
    h1em: 'convert',
    metaTitle: 'Creator-Led Content Agency for Ecommerce',
    metaDescription:
      'A creator-led content agency for ecommerce brands. We source and vet creators, script and edit end to end, and licence the footage into paid — CAC included.',
    lede:
      'We bring the best creators in your niche to promote your product. Scripting, briefing, editing and paid usage rights are handled end to end by us. You approve the cut, we ship it.',
    answer:
      'Flinza Works is a creator-led content agency for ecommerce brands. We bring the best creators in your niche to promote your product, then handle scripting, briefing, editing and paid usage rights end to end — and judge every partnership on cost per acquired customer rather than reach.',
    keywords: [
      'creator-led content agency',
      'influencer marketing agency ecommerce',
      'creator content for paid ads',
      'creator partnerships',
    ],
    sections: [
      {
        heading: 'A creator is a media buy with a face',
        body: [
          'Most creator spend is a brand-awareness line item with no attribution. We run it as a channel: tracked links and codes, a cost per acquired customer for every partnership, and a clear decision about which creators to double down on.',
          'That means picking on engagement quality rather than follower count. A 60K account with an 11% engagement rate is usually a better buy than a 400K account with three.',
        ],
      },
      {
        heading: 'We do the work that creators do not',
        body: [
          'Sourcing, vetting, rate negotiation, briefing, follow-up, editing and delivery chasing. Creators get an angle, a proof point and an offer — then they make it in their own voice, which is the entire reason creator content outperforms studio creative.',
          'Every partnership is contracted with paid usage rights for a defined window and territory, so the footage can run as ad creative without a renegotiation later. That is where most of the return actually comes from.',
        ],
        list: [
          'Vetted roster sourced on engagement quality',
          'Scripting, briefing and editing handled by us',
          'Paid usage rights cleared up front',
          'Creator content tested in paid against studio creative',
        ],
      },
      {
        heading: 'What we do not do',
        body: [
          'We do not invent creators, we do not use synthetic faces to fake testimonials, and we do not buy followers for anyone. The roster we show you is real people whose audiences we can describe before you spend anything.',
        ],
      },
    ],
    deliverables: [
      'A vetted creator roster for your niche and market',
      'In-house scripting, briefing and editing',
      'Negotiated contracts with paid usage rights',
      'Cost per acquired customer per partnership, tracked',
    ],
    proofTag: '03 // CREATORS',
    faq: [
      {
        number: '01',
        question: 'How do you price creator-led content?',
        answer:
          'Either a monthly programme fee plus a creator budget you control, or a scope covering a set number of partnerships a month. You own every contract, every asset and every creator relationship.',
      },
      {
        number: '02',
        question: 'Do you work with micro-creators?',
        answer:
          'Yes, and mostly. Micro and mid-tier creators between 20K and 300K followers usually produce the best cost per acquisition on ecommerce. A larger account looks better in a deck; a smaller one with high engagement makes more money.',
      },
      {
        number: '03',
        question: 'Who owns the content the creators make?',
        answer:
          'You do, for the window and territory negotiated in the contract. We ask for paid usage rights in the first contract, so a performer can be scaled into ads without going back to renegotiate.',
      },
      {
        number: '04',
        question: 'Can creator content run alongside our Meta ads?',
        answer:
          'It should. Almost all of the return comes from the combination: creator footage tested as ad creative in the same account and measured against studio creative on cost per acquired customer.',
      },
    ],
  },
  {
    slug: 'founder-led-content',
    label: 'Founder-led content',
    ordinal: '04',
    overline: 'Service · Founder-led growth',
    h1: 'Founder-led content,',
    h1em: 'scripted and shipped',
    metaTitle: 'Founder-Led Content Production for Brands',
    metaDescription:
      'Founder-led content for ecommerce brands: one shoot a month becomes shorts, reels, YouTube videos and podcast episodes — scripted and edited for you.',
    lede:
      'Your face is the highest-trust asset your brand owns. One shoot a month is enough to feed shorts, reels, YouTube and a podcast — if somebody else handles everything after the camera stops.',
    answer:
      'Flinza Works produces founder-led content for ecommerce brands. One shoot a month becomes shorts, reels, YouTube videos and podcast episodes: we script the session, direct it, edit every cut, and hand back platform-ready assets for organic and paid.',
    keywords: [
      'founder-led content agency',
      'founder-led videos for ecommerce',
      'shorts and reels production',
      'founder podcast production',
    ],
    sections: [
      {
        heading: 'Why founder content performs',
        body: [
          'An audience can tell the difference between a founder explaining a decision and an actor reading a script, and it converts accordingly. Founder-led content is also the one asset competitors cannot copy, because it needs your face and your actual opinions.',
          'The blocker is never willingness. It is that filming, scripting and editing a month of content is a job, and the founder already has one.',
        ],
      },
      {
        heading: 'One session, a month of assets',
        body: [
          'We script the session around angles that already work in your paid account, record it in a block of two to three hours, and cut it into shorts, reels, YouTube videos and podcast episodes. You review once; we ship.',
          'The same footage feeds paid. A founder clip that holds attention organically becomes ad creative without a second production day, which is how a content cost turns into a media cost saving.',
        ],
        list: [
          'One scripted shooting block per month',
          'Shorts, reels and YouTube cuts from the same session',
          'Podcast production, including guest episodes',
          'Paid-ready vertical cutdowns with captions',
        ],
      },
      {
        heading: 'What you get back, and when',
        body: [
          'A publishing calendar and a folder of finished assets, not raw files and homework. Turnaround on a session is typically 48 hours for the first cuts and a week for the full set.',
        ],
      },
    ],
    deliverables: [
      'Monthly scripted shooting session',
      'Shorts, reels and long-form YouTube edits',
      'Podcast production and episode cutdowns',
      'A publishing calendar with assets scheduled',
    ],
    proofTag: '04 // FOUNDER-LED',
    faq: [
      {
        number: '01',
        question: 'What is founder-led content?',
        answer:
          'Founder-led content is video built around the founder rather than an actor or a studio: shorts, reels, YouTube videos and podcasts where the person who runs the company explains the product, the decisions and the reasoning. It converts because the audience can tell it is real.',
      },
      {
        number: '02',
        question: 'How much of my time does it take?',
        answer:
          'One session a month, usually two to three hours. We script it in advance so nothing is improvised, and we handle editing, captions, scheduling and paid cutdowns without further input from you.',
      },
      {
        number: '03',
        question: 'Do we need a studio or good equipment?',
        answer:
          'No. A founder clip that sounds honest and looks clear outperforms a polished studio shoot that sounds like an advertisement. We bring the audio and lighting kit and shoot where you already work.',
      },
      {
        number: '04',
        question: 'Can founder clips be used as paid ads?',
        answer:
          'Yes, and that is usually where they earn the most. The same footage is cut for paid with captions and a hook in the first second, then tested against your existing creative on cost per acquired customer.',
      },
    ],
  },
  {
    slug: 'launch-clipping',
    label: 'Launch clipping',
    ordinal: '05',
    overline: 'Service · Clipping & launches',
    h1: 'A clipping engine for',
    h1em: 'launch week',
    metaTitle: 'Video Clipping Service for Product Launches',
    metaDescription:
      'A video clipping service for product launches and awareness. Dozens of vertical cutdowns a month from long-form, podcasts and creator footage, on a calendar.',
    lede:
      'Long-form gives you the raw material. Clipping gives you the volume to stay in the feed every day of a launch window — and eleven other angles when the hero asset falls flat.',
    answer:
      'Flinza Works runs high-volume video clipping for product launches and awareness campaigns. Dozens of vertical cut-downs a month are produced from long-form, podcast and creator footage, published on an agreed calendar, with paid spend placed only behind the clips that hold attention.',
    keywords: [
      'video clipping service for launches',
      'clipping agency for brands',
      'short form cutdowns',
      'launch content calendar',
    ],
    sections: [
      {
        heading: 'Why clipping carries a launch',
        body: [
          'A launch is a short window with a lot of attention and no time to produce anything new. Long-form gives you the material — a founder interview, a podcast, a demo, a live event — and clipping gives you the volume to post every day of the window.',
          'It also de-risks it. Ten clips running in a week means one flat angle is a data point, not a crisis.',
        ],
      },
      {
        heading: 'The calendar',
        body: [
          'We work backwards from launch day. Two weeks out we are building a bank of cut-downs. Launch week we publish daily on a schedule agreed in advance, so nobody decides what goes out on the morning of.',
          'Ten to twenty clips a week keeps a channel busy without becoming noise. Below five the feed goes quiet; above twenty-five you are usually retesting the same hook.',
        ],
        list: [
          'Clip bank built two weeks before launch day',
          'Daily publishing calendar through the window',
          'Vertical, captioned, platform-native cutdowns',
          'Paid amplification of the clips that hold attention',
        ],
      },
      {
        heading: 'Which clips get paid spend',
        body: [
          'Publish organically first, then pay behind the cut-downs that hold attention past three seconds and get watched to the end. Those two signals show up within a day and predict paid performance well enough to decide with.',
          'We never pay to rescue a clip nobody watched for free. The paid feed is not more forgiving than the organic one, it is just more expensive.',
        ],
      },
    ],
    deliverables: [
      'High-volume clip production from footage you already have',
      'A launch calendar with publishing slots agreed up front',
      'Vertical cutdowns with captions, ready for every placement',
      'Paid amplification plan for the clips that perform',
    ],
    proofTag: '05 // CLIPPING',
    faq: [
      {
        number: '01',
        question: 'What is a clipping service?',
        answer:
          'A clipping service turns long recordings — founder interviews, podcasts, demos, creator footage — into many short vertical cut-downs for reels, shorts and paid social. The output is volume with a consistent quality bar, which is what keeps a feed busy through a launch.',
      },
      {
        number: '02',
        question: 'How many clips a month should we expect?',
        answer:
          'Between 40 and 80 for most brands in an active launch period, and 10 to 20 a week when it is running as ongoing awareness. The number is set by how much source footage exists, not by an output target.',
      },
      {
        number: '03',
        question: 'Do you need us to send footage?',
        answer:
          'We can work from footage you already own, from a founder session we shoot, from podcast episodes, or from creator content made on a campaign. Anything long enough to cut from is enough to start.',
      },
      {
        number: '04',
        question: 'How do clips help awareness before a launch?',
        answer:
          'They build and hold attention in the weeks before the product is available, so launch-day demand is not starting from zero. Publishing daily also gives the algorithm fresh signals about which angle your audience responds to.',
      },
    ],
  },
];

export function getServicePage(slug) {
  return servicePages.find((page) => page.slug === slug) || null;
}

/** The case study a landing page is allowed to quote, read from its tag. */
export function proofForPage(page) {
  const project = carouselProjects.find((item) => item.caseStudy?.tag === page?.proofTag);
  return project ? { brand: project.brand, ...project.caseStudy } : null;
}
