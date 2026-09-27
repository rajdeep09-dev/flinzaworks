/*
 * The questions hub — /questions.
 *
 * ── What this file is for ──
 *
 * A lead who is ready to spend money on a problem types a question into a search bar, and that
 * question — not "ecommerce growth agency" — is the thing the page has to answer. This file is
 * those questions, written the way a person actually types them, with an answer that settles the
 * question in its first sentence. That format is not decoration: it is the shape a featured
 * snippet and an AI Overview both quote, and it is the only shape that works when a crawler is
 * matching a question string to a passage.
 *
 * ── Rules for this file ──
 *
 *  1. The first sentence answers the question outright. Everything after it is the qualification
 *     a sceptical reader needs before they will believe the first sentence.
 *  2. Answers stay inside ~70 words. Longer answers do not get quoted.
 *  3. The `question` is rendered as a real heading and the `answer` as a paragraph directly
 *     beneath it, and the page mirrors this array into FAQPage JSON-LD — so the machine-readable
 *     answer and the human-readable one cannot drift apart.
 *  4. No question may mention AI UGC. That service is not offered any more.
 *  5. Every answer has to be one we can defend on a call. Nothing here is a ranking promise and
 *     nothing here is a number we have not run on a real account.
 *
 * ── On the volume ──
 *
 * There are 52 questions here, not 1,000, and that is deliberate. These 52 answer several hundred
 * distinct query strings on their own, because each one is written the way it is actually typed —
 * "how much does it cost", "who is the best agency for", "X vs Y" — and each cluster covers a
 * topic end to end rather than one phrase. Padding the count to 1,000 would mean repeating
 * questions with the words shuffled, which is what keyword-stuffing detection is built to find.
 * The honest way to reach a thousand queries is fifty answered questions and the long tail around
 * them, not fifty thousand words.
 */

export const questionClusters = [
  {
    id: 'meta-ads',
    title: 'Meta ads & account structure',
    blurb:
      'How the account is built, why the numbers move, and what we look at before touching a budget.',
    questions: [
      {
        q: 'How much should a DTC brand spend on Meta ads?',
        a: 'Most brands we work with are between $50,000 and $300,000 a month, and the number matters less than the margin behind it. Below roughly $30K a month there is not enough signal for the account to learn fast enough to be worth an agency retainer. Above $500K a month you need a creative pipeline and a testing budget that most teams cannot staff in-house yet.',
      },
      {
        q: 'What is a good ROAS for ecommerce?',
        a: 'It depends on your contribution margin, and any agency that quotes you a number without asking for it is guessing. A brand with 60% margin can run at a 2.5x blended ROAS and be profitable. A brand with 30% margin needs 4x. We set the target from your margin and your cash cycle, not from an industry benchmark.',
      },
      {
        q: 'How do you structure a Meta Ads account?',
        a: 'One campaign per profit objective, consolidated into as few ad sets as the budget supports, with creative as the variable that actually moves performance. Splitting by audience too early starves the delivery system, and testing ten angles inside one ad set is how accounts end up optimising for the average of a bad idea.',
      },
      {
        q: 'Why is my cost per acquisition going up?',
        a: 'Nine times out of ten it is creative fatigue, not a tracking problem. CPMs rise when frequency climbs past its useful range, and frequency climbs when the same ad has been running too long against the same audience. We check frequency and hook rate before touching bidding, because raising the budget on fatigued creative just buys more of the same.',
      },
      {
        q: 'How long does it take to see results from Meta ads?',
        a: 'Testing starts in week one and meaningful movement usually shows inside 30 days. The first fortnight is the account learning, so read it as a test rather than a verdict. The gains that matter compound after that, as winning creative and winning audiences scale.',
      },
      {
        q: 'Should I increase my budget gradually or all at once?',
        a: 'Gradually, in steps your account can absorb — around 20% at a time, with a stable 72 hours between steps. A large jump resets the delivery system into a fresh learning phase and undoes the audience modelling you paid for. If you must spend a seasonal peak quickly, raise budget and refresh creative in the same move so the account is not scaling the thing that has gone stale.',
      },
      {
        q: 'What is a revenue leak audit?',
        a: 'A fixed-scope review of where money is already being spent and not coming back — wasted spend, broken checkout steps, unprofitable SKUs still being promoted, and shipping thresholds that quietly cost you the average order value. It is the first thing we run on a new account because it usually finds money before a single new dollar is spent.',
      },
      {
        q: 'Do you work with brands outside the USA?',
        a: 'Yes. We run accounts across the US, UK, EU and Middle East, and the work is not materially different — what changes is creative language, the competitive density in your category, and the tax and shipping economics that decide your real margin.',
      },
    ],
  },
  {
    id: 'creative-testing',
    title: 'Creative testing',
    blurb:
      'The 48-hour cycle: what gets made, what gets killed, and how a losing test still pays for itself.',
    questions: [
      {
        q: 'How do you test ad creative?',
        a: 'One variable per test, enough budget for the result to mean something, and a hard kill date. We test hooks first because the hook decides whether the rest of the ad is ever seen, then formats, then offers. A test that does not clear its threshold by the kill date is stopped, not extended, and the losing version is documented so it does not get re-tested in six months.',
      },
      {
        q: 'What is a 48-hour creative testing cycle?',
        a: 'A new concept goes from brief to live in two working days, and lives for a set number of days before the verdict. The point is not speed for its own sake — it is that a creative pipeline only compounds if the feedback loop is shorter than the fatigue cycle, so good ideas reach the account before the account gets tired of them.',
      },
      {
        q: 'How many ad variations should I test at once?',
        a: 'Four to six live at a time is the working range. Fewer and you learn slowly; more and each one gets too little budget to reach a verdict inside its window, so you end up deciding on noise. We rotate in new concepts as old ones are killed, keeping the live count roughly constant.',
      },
      {
        q: 'What makes a good ad hook?',
        a: 'The first three seconds have to state the problem, name the product, or make a claim the viewer wants to hear finished. It has to work with the sound off, because most feed traffic starts muted, and it has to make sense before the logo appears. We test hooks in isolation from the rest of the ad so we know which part did the work.',
      },
      {
        q: 'How do you know when an ad has stopped working?',
        a: 'When its hook rate falls below what the category normally returns and its frequency passes the point where the same viewer has seen it enough times to be annoyed. We watch those two together rather than waiting for CPA to move, because CPA usually confirms what the hook rate said a week earlier.',
      },
      {
        q: 'Is user-generated style content better than studio creative?',
        a: 'For direct response, usually — it outperforms polished studio work at the same spend, because it reads as a recommendation rather than an advertisement. It fails when it is too polished to be believable, or when the product claim does not survive the low-production treatment. We shoot it with a real brief rather than handing creators a shot list and hoping.',
      },
      {
        q: 'Do I need new creative every month?',
        a: 'On a healthy account running four to six live concepts, expect meaningful refresh every three to four weeks and a full new set roughly monthly. If your account does not need new creative that often, your testing volume is low enough that fatigue is not your growth constraint.',
      },
      {
        q: 'What is creative fatigue and how do I fix it?',
        a: 'Creative fatigue is the point where an ad has been seen enough times that its performance falls off — frequency climbs, CTR drops, CPA follows. You fix it by replacing the creative, not by restructuring the account. Chasing it with bid strategies or audience changes almost never works, because the ad itself is the thing the viewer has stopped responding to.',
      },
    ],
  },
  {
    id: 'creators',
    title: 'Creators & UGC-style content',
    blurb:
      'Sourcing, briefing, rates, usage rights and the difference between a creator and an audience.',
    questions: [
      {
        q: 'What is UGC and is it the same as influencer marketing?',
        a: 'UGC is content made in a creator-style register, usually for use as paid ad creative. Influencer marketing is a partnership where the creator also publishes to their own audience. They overlap, and the two are bought differently — one is a production cost, the other a media and relationship cost.',
      },
      {
        q: 'How do you find the right creators?',
        a: 'We look at engagement quality rather than follower count — comment substance, view retention, and whether the creator looks like the customer rather than like an audience. Then we test on a small batch before scaling. Reach is cheap and easy to buy; the ability to make a stranger trust you is the thing that actually moves conversion.',
      },
      {
        q: 'How much should I pay a creator?',
        a: 'Rates vary more by usage rights and exclusivity than by follower count. A UGC-style shoot with paid usage for a fixed term is a production cost and is usually cheaper than people expect. Adding whitelisting, perpetuity and exclusivity moves it into partnership territory, and the price should reflect that rather than being negotiated as an afterthought.',
      },
      {
        q: 'What are usage rights and why do they matter?',
        a: 'Usage rights are permission to run the content as paid advertising, and they have to be agreed in writing before the shoot. The three that decide what a piece costs are term length, whether you can run it as an ad from the creator\'s own handle, and exclusivity. Skipping them means going into a launch with content you legally cannot scale.',
      },
      {
        q: 'What is whitelisting?',
        a: 'Whitelisting — now usually called partnership ads — is running a creator\'s post as your ad from their own handle. It borrows their existing relationship with their audience, which usually beats a brand-handle ad using the same footage. It requires the creator to grant advertising permission through their platform, so it has to be agreed up front.',
      },
      {
        q: 'How many creators do I need for one campaign?',
        a: 'Six to ten is the working range for a single launch. Below that you have no room to lose a few, and above it the briefing cost starts to eat the benefit. We cast wider than we need, shoot with the best eight, and keep the rest warm for the next cycle.',
      },
      {
        q: 'How do you brief a creator so the content works?',
        a: 'You brief the problem and the angle, not the shot list. A creator who is handed a script delivers a read, and a read converts worse than a recommendation. We send the product, the objections the buyer actually has, the claims we are allowed to make, and the two things that must appear — then let them shoot it in their own register.',
      },
      {
        q: 'Do you manage creators or just source them?',
        a: 'The whole thing: sourcing and vetting, contracts and usage rights, briefing, shipping assets, and getting them live as ads. We handle creator relationships ourselves rather than adding a middle layer, because the people who found the creator are the people who know why it worked.',
      },
    ],
  },
  {
    id: 'founder-content',
    title: 'Founder-led content',
    blurb:
      'Why the founder\'s face outperforms a brand account, and how to make it without becoming a full-time job.',
    questions: [
      {
        q: 'Why does founder-led content outperform brand content?',
        a: 'Because a person is more credible than a logo. Founder content typically outperforms the same idea from a brand handle, not because it is better made but because viewers are deciding whether to trust a business, and a person is easier to trust than a page. It also tends to hold watch time, which is what buys the reach.',
      },
      {
        q: 'I am not on camera. What are my options?',
        a: 'You do not have to be on camera yourself. We run founder-led programmes using your voice and your face in ways that take an hour a month — answers to the questions buyers keep asking, filmed in short vertical cuts and cut against product. Many of the strongest versions are talking-head answers to real objections, not scripted pitches.',
      },
      {
        q: 'How much founder content do I need?',
        a: 'Enough to be recognisable and consistent rather than a campaign. Two to four short pieces a month, pulled from real questions sales and support already answer, will outperform a month of polished brand video. The constraint is rehearsal, not production.',
      },
      {
        q: 'Is founder-led content right for a new brand?',
        a: 'Especially for a new brand, because it substitutes for the trust you have not built yet. A founder explaining why the product exists carries a claim a brand account cannot make. It is weaker if the founder is visibly not the person behind the decisions, which is rarely a problem for a small team.',
      },
    ],
  },
  {
    id: 'clipping',
    title: 'Launch clipping & conversion video',
    blurb:
      'Turning one long asset into a week of feed-native cuts, and what to do when the source is weak.',
    questions: [
      {
        q: 'What is launch clipping?',
        a: 'Taking a long-form asset — a podcast, a webinar, a founder interview, a customer call — and cutting it into short, feed-native vertical clips with captions and a hook in the first two seconds. One hour of footage becomes a week of ad creative, which is the cheapest way to solve a creative volume problem.',
      },
      {
        q: 'How much footage do I need to make 30 clips?',
        a: 'Roughly two to three hours of clean source, because a usable clip is only about eight to twenty seconds of the total. We record specifically for clipping — short answers, one idea per take, pauses left in for editing — rather than mining a two-hour conversation, where the usable ratio is far lower.',
      },
      {
        q: 'What makes a video convert in the feed?',
        a: 'A hook inside the first two seconds, captions on, and a claim the viewer can act on before the video ends. Autoplay means the first frame is the whole battle. Length matters far less than whether the opening earns the next two seconds.',
      },
      {
        q: 'Should I put captions on my ads?',
        a: 'Yes. Most feed traffic starts muted, so a video without captions is a video most people scroll past. Captions also need to be burned in for the feed rather than relying on platform auto-captions, which mishear product names exactly where accuracy matters most.',
      },
      {
        q: 'How do you repurpose one webinar into ads?',
        a: 'You cut on the moments where a claim is made or an objection is answered, not on the introduction. Each clip gets its own hook written for the first two seconds, because the mid-webinar opening makes no sense out of context. The webinar is a source, not an ad — the ad is rewritten around the best twelve seconds inside it.',
      },
    ],
  },
  {
    id: 'cost',
    title: 'Costs, pricing & agency fees',
    blurb:
      'What it costs, how agencies charge for it, and the questions to ask before signing anything.',
    questions: [
      {
        q: 'How much does a DTC growth agency cost?',
        a: 'Retainers for this kind of work usually run from $8,000 to $30,000 a month, and the spread reflects how much is actually being done rather than how senior the account is. A low retainer that includes media spend and creative production is a media-buying deal, not an agency retainer, and it is a different product.',
      },
      {
        q: 'How much does Flinza Works charge?',
        a: 'Fixed-scope retainers or project engagements, never hourly. You get a written scope and a fixed quote within 48 hours of the discovery call, so the price does not move once the work has started. If we are not the right fit for your account we will say so on that call rather than take the retainer and work it out.',
      },
      {
        q: 'Should my agency fee be separate from ad spend?',
        a: 'It should be. When the fee and the spend are bundled, the incentive quietly shifts: an agency on a percentage of media spend earns more by spending more, whether or not the extra spend is profitable. A fixed fee that stands or falls on your margin is the structure that keeps the advice honest.',
      },
      {
        q: 'Do you require a long contract?',
        a: 'No. We work month to month after an initial three-month period, because the first quarter is when the account is being rebuilt and the proof is not in yet. A long lock-in demanded before any of that has happened is asking you to bet on a pitch.',
      },
      {
        q: 'What is included in the retainer?',
        a: 'Media buying, the creative testing cycle, creator and founder content, and the optimisation work around them. Media spend is separate and paid by you directly to Meta, so the fee is never inflated by budget passing through it. Everything produced in the retainer belongs to you.',
      },
      {
        q: 'What is the minimum budget to work with an agency?',
        a: 'Around $50,000 a month in media spend. Below that, an agency fee is a large share of the total and the account does not generate enough movement to justify it — a good freelance media buyer is usually the better spend until you get there.',
      },
      {
        q: 'How quickly can we start?',
        a: 'Discovery within a week, a written scope and fixed quote within 48 hours of that call, and the first tests live inside the first fortnight. The revenue leak audit is the first thing we run, because it finds recoverable money before the retainer has spent anything new.',
      },
      {
        q: 'Are your fees really fixed, or do they change?',
        a: 'Fixed for the agreed scope. If you ask for work outside that scope we quote it separately before starting, which is the only way a fixed price means anything. The scope itself is written down, so there is a document to argue from rather than a memory of a call.',
      },
    ],
  },
  {
    id: 'profit',
    title: 'Ecommerce profit & metrics',
    blurb:
      'The numbers that decide whether growth is worth having, and why ROAS is the wrong one to lead with.',
    questions: [
      {
        q: 'How do you calculate true ROAS?',
        a: 'Take net revenue after returns and discounts, subtract COGS, shipping and payment fees, and divide by total spend including agency fees, tooling and content production. That is the number that tells you whether growth made you money. Platform-reported ROAS excludes all of it, which is why it is always more flattering than the bank statement.',
      },
      {
        q: 'What is a good profit margin for ecommerce?',
        a: 'Most healthy DTC brands sit between 40% and 70% gross margin, and anything under 35% leaves very little room for paid acquisition. If your margin is low, paid social is rarely the constraint — the product economics are, and no media strategy fixes a 20% margin.',
      },
      {
        q: 'Should I optimise for ROAS or profit?',
        a: 'Profit, always. ROAS is a reporting metric that tells you what the platform did; profit is the thing the business is for. They diverge constantly, and optimising for ROAS is how accounts end up scaling into losses that look like wins in the dashboard.',
      },
      {
        q: 'What is customer acquisition cost?',
        a: 'CAC is all-in spend — media, agency fees, creative, tools — divided by new customers. The number that matters is not CAC on its own but CAC against contribution margin and payback period, because a high CAC that pays back in two months is a much better business than a low one that takes a year.',
      },
      {
        q: 'What CAC payback period should I aim for?',
        a: 'Under six months for most DTC brands, and under three if you are cash-constrained or buying inventory with long lead times. A good rule is that one repeat purchase should be able to recover CAC, because a customer who never comes back has to be profitable on the first order alone.',
      },
      {
        q: 'How do I know if I am actually profitable?',
        a: 'You need contribution margin after returns, not gross revenue. Work out what a customer is worth after shipping, payment fees, discounts and refunds, then compare it to what you spent to acquire them. If you cannot produce that number from your own data, that is the first thing to fix, and it is usually a tracking problem rather than a marketing one.',
      },
    ],
  },
  {
    id: 'choosing',
    title: 'Tools, agencies and doing it in-house',
    blurb:
      'The comparisons people actually search for, answered without pretending one option is right for everyone.',
    questions: [
      {
        q: 'Should I hire an agency or do it in-house?',
        a: 'In-house if you have a real operator who has run a scaled account and you have creative capacity to keep it fed. Agency if the expertise is not there or the founder cannot spare the hours. The common failure is hiring one media buyer and expecting them to also brief creators, edit video and run the account — that is three jobs, and the account starves on the two they were not hired for.',
      },
      {
        q: 'Is a marketing tool better than an agency?',
        a: 'A tool is better than an agency for one specific job: doing something a person would otherwise do manually at volume. Attribution, feed creative generation, bid monitoring. It is not better at deciding what to run, at reading whether the account is making money, or at holding the creative pipeline. Tools do not replace judgement, they replace keystrokes.',
      },
      {
        q: 'What is the difference between a media buyer and an agency?',
        a: 'A media buyer runs the account inside an existing strategy. An agency owns the strategy, the creative, and the numbers. A media buyer is cheaper and genuinely good if you have everything around them. If the account is underperforming, the problem is usually the strategy or the creative, and no amount of buying will fix it.',
      },
      {
        q: 'How do I choose a Meta ads agency?',
        a: 'Ask three things: who will actually work on my account day to day, what happens when a test loses, and can I see a client result with the campaign structure explained. Then check whether they will tell you the fee is separate from spend. An agency that cannot name the person doing the work is reselling someone else\'s account management.',
      },
      {
        q: 'Should I switch agencies?',
        a: 'Switch if the work is being done by someone junior, if the fee is a percentage of spend, or if you cannot get a straight answer about what is being tested. Do not switch because one month was soft — accounts are seasonal and a single month is not evidence. Decide on a quarter.',
      },
      {
        q: 'How long should an agency relationship last?',
        a: 'A quarter is the minimum honest test, because the first month is learning and the second is rebuilding. A year is where it starts compounding, because the creative library and the account\'s learned preferences only get valuable with time. Judge it on the second and third month, not the first.',
      },
      {
        q: 'Can an agency work with our in-house team?',
        a: 'Yes, and it is usually the best arrangement for brands that already have a media buyer. We take strategy, creative and the pipeline, and your team runs the day-to-day. The handover is written down, which is the only thing that keeps a two-team setup from stalling.',
      },
      {
        q: 'What should I ask for before signing with any agency?',
        a: 'A written scope, a fixed fee, confirmation that accounts and creative stay yours, a named person doing the daily work, and a measurement framework agreed before anyone spends. If an agency will not put the scope in writing, the price will move and the work will drift.',
      },
    ],
  },
];

/*
 * The comparison tables.
 *
 * These are here because "X vs Y" is a query people type before they type anything else, and because
 * a table is the one thing on a page that search engines and answer engines both lift cleanly. Each
 * one is a genuine comparison, including the cases where the other option wins — a table that only
 * ever says the agency is right reads as an ad, and gets treated like one.
 */
export const comparisons = [
  {
    id: 'agency-vs-inhouse',
    title: 'Flinza Works vs hiring an in-house media buyer',
    verdict:
      'An in-house media buyer is cheaper and often better, if you genuinely have one and have the creative capacity to feed them. The failure mode is hiring one person for three jobs.',
    columns: ['Flinza Works', 'One in-house media buyer'],
    rows: [
      { label: 'Time to start', values: ['48 hours from a discovery call', '6–10 weeks to hire, onboard and ramp'] },
      { label: 'Creative testing', values: ['A 48-hour brief-to-live cycle', 'Depends entirely on in-house capacity'] },
      { label: 'Creator sourcing and contracts', values: ['Included', 'Usually nobody owns this'] },
      { label: 'Cost', values: ['$8K–$30K / month, fixed', 'Salary plus tools, but split across three jobs'] },
      { label: 'Who owns the account and creative', values: ['You do, fully', 'You do'] },
      { label: 'Best when', values: ['You need the whole pipeline, fast', 'You already have a proven operator'] },
    ],
  },
  {
    id: 'agency-vs-freelancer',
    title: 'Flinza Works vs hiring a freelance media buyer',
    verdict:
      'A good freelancer is excellent value inside a strategy that already exists. The difference shows up when the account is underperforming, which is a diagnosis problem rather than a buying problem.',
    columns: ['Flinza Works', 'Freelance media buyer'],
    rows: [
      { label: 'Scope', values: ['Strategy, creative, creators, media', 'Media buying inside your strategy'] },
      { label: 'Creative production', values: ['Included — brief to live in 48 hours', 'Yours to brief and produce'] },
      { label: 'Redundancy', values: ['Several people on the account', 'One person, one absence'] },
      { label: 'Accountability', values: ['Profit target agreed in writing', 'Usually hourly or per-project'] },
      { label: 'Best when', values: ['The account is underperforming', 'The strategy works and needs hands'] },
    ],
  },
  {
    id: 'agency-vs-big-agency',
    title: 'Flinza Works vs a traditional large agency',
    verdict:
      'A large agency is the right answer for a brand with a seven-figure media budget and a legal team to review the contract. For most DTC brands, the senior time you are paying for never reaches the account.',
    columns: ['Flinza Works', 'Traditional large agency'],
    rows: [
      { label: 'Who works on the account', values: ['Operators, named', 'A team you meet once, rotated after'] },
      { label: 'Fee structure', values: ['Fixed, separate from spend', 'Often bundled or % of spend'] },
      { label: 'Contract', values: ['Month to month after three months', 'Typically 6–12 months'] },
      { label: 'Speed of a new concept', values: ['48 hours', 'Weeks'] },
      { label: 'Slack access', values: ['The strategist who owns your numbers', 'An account manager relaying'] },
      { label: 'Best when', values: ['$50K–$500K / month', 'Seven figures, or multi-market complexity'] },
    ],
  },
  {
    id: 'agency-vs-tools',
    title: 'Flinza Works vs marketing tools and AI automation',
    verdict:
      'Tools are excellent at the mechanical work and cannot decide what should be running. The useful question is not tools or agency — it is which part of your week you are trying to stop doing.',
    columns: ['A tool does this well', 'An agency does this well'],
    rows: [
      { label: 'Feed creative variants in minutes', values: ['Automated', 'Briefed, shot, edited, vetted'] },
      { label: 'Reporting and dashboards', values: ['Automated', 'Interpreted — and the number argued with'] },
      { label: 'Deciding what to test next', values: ['Cannot', 'Can'] },
      { label: 'Reading profit, not platform ROAS', values: ['Rarely', 'Can'] },
      { label: 'Creator relationships', values: ['No', 'Yes'] },
      { label: 'Best used for', values: ['Volume mechanics', 'Judgement, creative, and the hard calls'] },
    ],
  },
  {
    id: 'ugc-vs-influencer',
    title: 'UGC-style content vs influencer marketing',
    verdict:
      'They are bought differently and usually run together. If you have one budget, the content-first order is usually right: prove the creative converts, then put paid amplification behind the creator\'s own handle.',
    columns: ['UGC-style content', 'Influencer marketing'],
    rows: [
      { label: 'You are buying', values: ['A production cost', 'A partnership and its audience'] },
      { label: 'Where it runs', values: ['Your ad account, as an ad', 'The creator\'s profile, then paid'] },
      { label: 'What decides it works', values: ['Hook rate and CTR', 'Views, saves, and comment quality'] },
      { label: 'Cost shape', values: ['Flat fee plus agreed usage', 'Fee plus product, or a revenue share'] },
      { label: 'Scales by', values: ['Shooting more concepts', 'More creators, then paid amplification'] },
    ],
  },
  {
    id: 'founder-vs-ugc',
    title: 'Founder-led content vs UGC-style content',
    verdict:
      'They solve different halves of the trust problem. The founder explains why the company exists; the creator shows why a stranger should believe it. Running both is the normal answer.',
    columns: ['Founder-led', 'UGC-style'],
    rows: [
      { label: 'Authority claim', values: ['I built this and here is why', 'Someone like me uses this'] },
      { label: 'Production effort', values: ['Low — answers, not shoots', 'Higher — brief, ship, edit'] },
      { label: 'Best placement', values: ['Top of funnel and objection handling', 'Conversion, always on'] },
      { label: 'Cadence', values: ['2–4 pieces a month', 'Continuous, in the testing cycle'] },
      { label: 'Weakest when', values: ['The founder will not commit to it', 'It is too polished to be believed'] },
    ],
  },
  {
    id: 'meta-vs-google',
    title: 'Meta ads vs Google ads for ecommerce',
    verdict:
      'For most DTC brands Meta is the primary channel because it interrupts and converts cold audiences. Google captures demand that already exists — which is the better half of the budget later, not the first half.',
    columns: ['Meta ads', 'Google (Shopping / PMax)'],
    rows: [
      { label: 'Audience', values: ['Cold — creates demand', 'Warm — captures existing demand'] },
      { label: 'Creative dependence', values: ['Total — this is the game', 'Lower; feed and listing do more'] },
      { label: 'Testing cadence', values: ['Weekly, at minimum', 'Monthly is often enough'] },
      { label: 'Best role', values: ['The growth engine', 'Harvesting branded and high-intent search'] },
      { label: 'Typical split', values: ['The majority', 'The minority, growing'] },
    ],
  },
  {
    id: 'retainer-vs-project',
    title: 'Retainer vs project pricing',
    verdict:
      'A retainer is right when the work is continuous, which creative testing is by definition. A project is right when the deliverable has an end date, like a launch or a clip batch.',
    columns: ['Retainer', 'Project / fixed scope'],
    rows: [
      { label: 'Suits', values: ['Always-on testing and optimisation', 'A defined deliverable with a finish line'] },
      { label: 'Risk sits with', values: ['The agency, on results', 'The scope, once agreed'] },
      { label: 'Best for', values: ['Accounts that need compounding', 'One-off launches and audits'] },
      { label: 'Watch for', values: ['Scope creep without a change process', 'Scope that quietly grows mid-project'] },
    ],
  },
];

/* Every question in the file, flattened, for the FAQPage schema and the count in the intro copy.
   Derived rather than hand-maintained so the two can never disagree. */
export const allQuestions = questionClusters.flatMap((cluster) =>
  cluster.questions.map((item) => ({ ...item, cluster: cluster.title, clusterId: cluster.id }))
);

export const questionCount = allQuestions.length;
