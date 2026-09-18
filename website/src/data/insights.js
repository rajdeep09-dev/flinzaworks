/*
 * Insights — the blog, as data.
 *
 * The index at /insights and the article pages at /insights/[slug] both read this array, so a card
 * and its article cannot disagree, and `generateStaticParams()` can enumerate every post.
 *
 * Each entry is written to be quotable by an answer engine as well as readable by a person:
 *
 *   · `answer` is a 40–60 word, self-contained reply to the question the title asks. It is
 *     rendered at the top of the article AND mirrored into the page's structured data, so the
 *     snippet a search engine lifts and the paragraph a reader sees are the same sentences.
 *   · `sections` are heading + paragraphs (+ optional list). One idea per section, no filler.
 *   · `date` and `updated` are ISO dates and are used for `datePublished` / `dateModified`.
 */

export const insights = [
  {
    slug: 'roas-is-lying-to-you',
    category: 'Meta Ads',
    minutes: 6,
    date: '2026-08-19',
    updated: '2026-08-19',
    title: 'Your ROAS is lying to you, and it is costing you margin',
    excerpt:
      'Platform-reported ROAS counts revenue that comes back, ignores discount dependency and cannot see the customers who would have bought anyway. Here is how to rebuild the number around contribution margin — and what changes in the account once you do.',
    description:
      'Platform ROAS hides returns, discounts and fees. Learn how to rebuild your number around profit contribution margin and what changes in the account once you do.',
    keywords: ['profit-first media buying', 'contribution margin', 'why ROAS lies', 'MER vs ROAS'],
    answer:
      'Platform-reported ROAS counts gross revenue, so it ignores returns, fees, discounts and shipping — a 4x ROAS can be unprofitable. Optimise contribution margin instead: revenue minus all variable costs, per order. Once the target is profit per order rather than a ratio, budget moves to the campaigns that actually pay for themselves.',
    sections: [
      {
        heading: 'What ROAS measures, and what it does not',
        body: [
          'ROAS is revenue divided by ad spend, measured inside the ad platform, using the platform\u2019s own attribution window and counting gross revenue at the moment of purchase. It is a speedometer, not a bank balance.',
          'It cannot see a return that arrives nine days later, a discount code that costs 25% of margin, a payment processing fee, a shipping subsidy, or the customer who would have bought anyway and is now being counted as an ad conversion.',
        ],
      },
      {
        heading: 'The number to replace it with',
        body: [
          'Contribution margin per order is revenue minus every variable cost attached to that order: ad spend, cost of goods, payment fees, fulfilment, returns provision and any discount. Divide by order value and you have a percentage you can compare across channels and across creative.',
          'Set the threshold once and write it down. In most of the accounts we take over, the profitable threshold is materially higher than the ROAS target the previous team was optimising against — which is the entire problem, stated in one line.',
        ],
        list: [
          'Pull gross revenue, returns and fees from the store, not the ad platform.',
          'Build the margin figure per order, per channel, per creative.',
          'Set one written threshold, then let it decide every scale and kill call.',
        ],
      },
      {
        heading: 'What changes in the account',
        body: [
          'Usually less than people expect, and faster. Campaigns that were scaling on ROAS alone come down; retargeting stops taking credit for demand that organic and email created; the permanent discount code gets retired because it is now visible as a margin line rather than a conversion-rate win.',
          'The creative brief changes too. When profit per order is the target, the winning angle is often the one that sells on product rather than price, even if it has a lower click-through rate.',
        ],
      },
    ],
  },
  {
    slug: '48-hour-creative-testing-cycle',
    category: 'Creative Testing',
    minutes: 5,
    date: '2026-08-26',
    updated: '2026-08-26',
    title: 'The 48-hour testing cycle, written out end to end',
    excerpt:
      'Forty angles in six weeks is not a volume trick — it is a decision-rule trick. The brief template, the threshold for scaling, and the reason most brands cannot run this cycle yet.',
    description:
      'A complete 48-hour creative testing cycle: the brief template, the scale-or-kill threshold, and why most ecommerce brands cannot run this cadence yet.',
    keywords: ['creative testing agency', 'creative testing framework', 'performance creative', '48 hour testing'],
    answer:
      'A 48-hour creative testing cycle ships a batch of concepts, gives each one two days and a fixed budget, then applies one written rule: scale above the threshold, kill below it, no debate. Speed comes from the decision rule, not from producing more video. Most brands cannot run it because approvals and production take longer than the test.',
    sections: [
      {
        heading: 'The cycle',
        body: [
          'Day one you brief and produce a batch. Day two the batch goes live against a fixed test budget with one variable changed per concept — hook, or body, or offer, never all three. Day three you read it against the threshold, scale or kill, and the next batch is already briefed.',
          'The point is that no single test is precious. You are running a portfolio of bets with a fixed cost each, and the portfolio is what pays.',
        ],
      },
      {
        heading: 'The decision rule is the whole system',
        body: [
          'Write the threshold down before the batch goes live, in the same document as the brief. Above it: increase budget in steps, not in one jump. Below it: switch off today, not on Friday.',
          'The rule exists to remove the meeting. If scaling and killing need a discussion every time, the cycle is 48 hours on paper and two weeks in practice.',
        ],
        list: [
          'One variable per concept: hook, body or offer.',
          'Fixed test budget per concept, agreed before launch.',
          'One written threshold, applied the same day, every day.',
        ],
      },
      {
        heading: 'Why most brands cannot run this yet',
        body: [
          'Not budget — a 48-hour cycle on $50K a month of spend is not expensive. The blocker is almost always production and approvals. If a video needs a shoot, a legal review and two rounds of stakeholder notes, the feedback loop is six weeks regardless of what the media plan says.',
          'The fix is to separate the two speeds: a fast lane of creator and founder footage that can ship in a day, and a slow lane of produced assets for launches. Almost all testing should happen in the fast lane.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-brief-creators-so-content-converts',
    category: 'Creator-Led Growth',
    minutes: 7,
    date: '2026-09-02',
    updated: '2026-09-02',
    title: 'How to brief creators so the content actually converts',
    excerpt:
      'A 60K creator with an 11% engagement rate usually beats a 400K account with three. What to check before you pay anyone, how to brief so the content sells, and how to license the footage into paid without renegotiating later.',
    description:
      'How to brief creators so their content converts: what to check before paying, the brief structure that sells, and paid usage rights agreed up front.',
    keywords: ['creator-led content agency', 'influencer marketing agency ecommerce', 'creator brief template', 'creator whitelisting'],
    answer:
      'Brief creators by giving them the angle, the proof and the offer — then let them write it in their own voice. Check engagement rate and audience geography before follower count, and agree paid usage rights in the contract, so the footage can run as ad creative without a renegotiation. Mid-tier creators usually produce the best cost per acquisition.',
    sections: [
      {
        heading: 'What to check before paying anyone',
        body: [
          'Engagement rate first, follower count last. A 60K account at 11% engagement is a better media buy than a 400K account at 3%, because the second number is mostly audience that never sees the post.',
          'Then audience geography, then average views over the last ten posts rather than the best one, then whether they have already promoted something in your category. A creator who has run three competitor placements has an audience that already buys.',
        ],
      },
      {
        heading: 'The brief that converts',
        body: [
          'Give them the angle, the proof and the offer. The angle is the single idea the video is about. The proof is the specific thing that makes it credible — a before-and-after, a number, a demonstration. The offer is what the viewer does next.',
          'Then stop. Scripts that read like ad copy perform like ad copy. The reason creator content beats studio creative is that it does not sound like an agency wrote it, so writing every word for them removes the only advantage you paid for.',
        ],
        list: [
          'One angle per video, stated in one sentence.',
          'One proof point they can show on camera.',
          'One offer, with the code or link already set up.',
        ],
      },
      {
        heading: 'Usage rights: agree them before you need them',
        body: [
          'The highest-return part of a creator programme is running the creator\u2019s footage as paid ad creative, with their handle on the ad. That is only possible if the contract already grants paid usage for a defined window and territory.',
          'Ask for it in the first contract. Going back after a video performs to buy rights you did not negotiate is materially more expensive, and sometimes the answer is simply no.',
        ],
      },
    ],
  },
  {
    slug: 'clipping-strategy-for-product-launches',
    category: 'Clipping',
    minutes: 5,
    date: '2026-09-09',
    updated: '2026-09-09',
    title: 'A clipping strategy for product launches',
    excerpt:
      'Long-form gives you the raw material; clipping gives you the volume. How to build a launch-week clip calendar that keeps you visible between media pushes, and how to know which clips to pay behind.',
    description:
      'Build a launch-week clipping strategy: the clip calendar, the volume that matters, and how to choose which cut-downs to put paid spend behind.',
    keywords: ['video clipping service for launches', 'clipping agency', 'launch content strategy', 'short form cutdowns'],
    answer:
      'Clipping turns one long recording into dozens of vertical cut-downs, which is what keeps awareness loud between paid pushes. For a launch, plan 10\u201320 clips a week from founder interviews, podcasts and creator footage, publish on a fixed calendar, and put paid spend only behind the cut-downs that hold attention past three seconds.',
    sections: [
      {
        heading: 'Why clipping works on a launch',
        body: [
          'A launch is a short window with a lot of attention and no time to produce anything new. Long-form gives you the material — a founder interview, a podcast, a demo — and clipping gives you the volume to stay in the feed every day of that window.',
          'It also de-risks the launch. If one angle falls flat you have eleven others running that week rather than one hero asset carrying the whole thing.',
        ],
      },
      {
        heading: 'The calendar',
        body: [
          'Work backwards from launch day. Two weeks out you are building a bank of clips. Launch week you publish daily, on a schedule that is agreed in advance so nobody is deciding what goes out on the morning of.',
          'Ten to twenty cut-downs a week is the range that keeps a feed busy without turning into noise. Below five, the channel goes quiet between posts; above twenty-five, you are mostly testing the same hook again.',
        ],
      },
      {
        heading: 'Which clips get paid spend',
        body: [
          'Not all of them. Publish organically first, then pay behind the cut-downs that hold attention past the first three seconds and get watched to the end. Those two signals are available within a day and they predict paid performance well enough to decide with.',
          'Never pay to rescue a clip that nobody watched for free. The paid feed is not more forgiving than the organic one, it is just more expensive.',
        ],
      },
    ],
  },
  {
    slug: 'meta-ads-account-structure-that-scales',
    category: 'Meta Ads',
    minutes: 6,
    date: '2026-09-16',
    updated: '2026-09-16',
    title: 'How the Meta algorithm really allocates spend',
    excerpt:
      'Meta does not reward the account with the neatest structure. It rewards the account that gives it the clearest signal about which creative actually works. What that means for consolidation, budget steps and the campaigns people refuse to switch off.',
    description:
      'How the Meta ads algorithm allocates spend and what it means for account structure, budget scaling and consolidation when you manage $50K+ per month.',
    keywords: ['meta ads agency for ecommerce', 'facebook ads agency DTC', 'meta ads account structure', 'how meta algorithm works'],
    answer:
      'The Meta algorithm allocates spend towards the ad sets it believes will hit your objective at the lowest cost, based on early engagement and conversion signals. That means account structure matters far less than creative volume and signal clarity: fewer, better-fed campaigns with distinct creative beat dozens of fragmented ad sets competing with each other.',
    sections: [
      {
        heading: 'It is optimising signal, not structure',
        body: [
          'Meta ranks ads on the probability of a desired action and the bid you are willing to pay for it, then spends where that combination looks best. Early performance is noisy, so the algorithm needs volume before it can tell a winner from a slow start.',
          'Which is why the tidiest account in the world — one ad set per audience, one ad each, ten campaigns — often underperforms a messier one where each creative gets enough spend to prove itself. You are not building a taxonomy for a human. You are feeding a model.',
        ],
      },
      {
        heading: 'What good structure looks like at $50K+ a month',
        body: [
          'Consolidate until each campaign has enough budget to exit the learning phase, and no further. Usually that means a small number of broadly targeted campaigns split by funnel stage, each holding a batch of distinct creative concepts rather than one creative and twelve audiences.',
          'Creative is the variable with the most headroom. Audiences have been consumed by the platform\u2019s targeting; the ad itself is still yours to lose.',
        ],
        list: [
          'Fewer campaigns, each with enough budget to learn.',
          'Broad targeting, with creative doing the segmentation.',
          'Budget increased in steps, not doubled overnight.',
        ],
      },
      {
        heading: 'The campaigns people refuse to switch off',
        body: [
          'Retargeting that takes credit for traffic the brand created anyway, and brand-search campaigns that report enormous ROAS against demand that would have converted without them. Both look excellent in a report and both are frequently just paying for demand that already existed.',
          'Test them honestly: switch one off for two weeks and measure total revenue, not platform-attributed revenue. The difference is what the campaign was actually buying.',
        ],
      },
    ],
  },
];

export const insightCategories = Array.from(new Set(insights.map((post) => post.category)));

export function getInsight(slug) {
  return insights.find((post) => post.slug === slug) || null;
}

export default insights;
