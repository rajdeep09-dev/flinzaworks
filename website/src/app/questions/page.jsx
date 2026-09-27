/*
 * /questions — the answers hub. A server component.
 *
 * ── Why this page exists when /insights already exists ──
 *
 * The two answer different questions, and searchers arrive at them differently. An insight post
 * is something you read when you have decided to learn about a topic; this page is something you
 * land on when you have a problem and are typing the words you would actually type. "How much does
 * a DTC growth agency cost" is not a title anybody chose to write — it is a query, and the page
 * that answers it in the first sentence is the one that gets the click.
 *
 * So this is a hub, not a blog. Every question is a real heading with a real answer directly under
 * it, clustered by topic, with a jump index at the top so a long page is navigable rather than a
 * scroll. The answers live in `@/data/questions`, and the same array is mirrored into FAQPage
 * JSON-LD below, so the machine-readable answer and the one a person reads cannot drift.
 *
 * The comparison tables are the other half. "X vs Y" is the query people type before they are ready
 * to contact anyone, and a table is the one thing on a page that answer engines lift cleanly. Each
 * one includes the case where the other option wins, because a table that only ever says the agency
 * is right reads as an ad and gets treated like one.
 */

import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";
import { questionClusters, comparisons, allQuestions, questionCount } from "@/data/questions";
import { breadcrumbSchema, faqSchema, absolute, socialMeta } from "@/data/seo";

export const metadata = {
  title: "Ecommerce Growth Questions, Answered",
  description:
    "Straight answers to the questions ecommerce brands ask about Meta ads, creative testing, creators, agency fees and profit — plus side-by-side comparisons.",
  alternates: { canonical: "/questions" },
  ...socialMeta({
    title: "Ecommerce growth questions, answered | Flinza Works",
    description:
      "Fifty-five questions brands actually search, answered in the first sentence. Meta ads, creative testing, creators, agency costs, profit and who to hire.",
    url: "/questions",
  }),
};

/* Each cluster links onward to the service page that actually does the work, so the hub feeds the
   commercial pages instead of ending at a page nobody converts on. */
const clusterLinks = {
  "meta-ads": { label: "Meta ads", href: "/services/meta-ads" },
  "creative-testing": { label: "Creative testing", href: "/services/creative-testing" },
  creators: { label: "Creator partnerships", href: "/services/creator-partnerships" },
  "founder-content": { label: "Founder-led content", href: "/services/founder-led-content" },
  clipping: { label: "Launch clipping", href: "/services/launch-clipping" },
  cost: { label: "How we work", href: "/contact" },
  profit: { label: "Profit-first optimisation", href: "/services/meta-ads" },
  choosing: { label: "Our work", href: "/work" },
};

export default function QuestionsPage() {
  return (
    <PageShell active="/questions">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Questions", path: "/questions" },
          ]),
          /* The same array the page renders, so the schema and the visible answers are one source.
             `speakable` in faqSchema points at the class names rendered below, which are the same
             ones FaqList uses, so voice assistants get the same targets on both surfaces. */
          faqSchema(
            allQuestions.map((item) => ({ question: item.q, answer: item.a }))
          ),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Ecommerce growth questions answered',
            numberOfItems: questionCount,
            itemListElement: allQuestions.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.q,
              url: `${absolute('/questions')}#${item.clusterId}`,
            })),
          },
        ]}
      />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Answers · {questionCount} questions
        </p>
        <h1>
          The questions brands <em>actually ask</em>
        </h1>
        <p>
          {questionCount} questions, grouped by topic, each answered in its first sentence — because
          that is the only shape that helps someone searching, and the only shape worth writing. No
          gated PDF, no five-email sequence. If your question is not here, ask it and we will answer
          it on the call.
        </p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Ask your question</CamoCtaButton>
          <Link href="/insights" className="flinza-btn flinza-btn-ghost">
            Read the long-form notes
          </Link>
        </div>
      </div>

      {/* The jump index. A page this long is unusable without one, and it doubles as a map of the
          topics for a crawler that reads headings in order. */}
      <nav className="flinza-qindex" aria-label="Question topics">
        {questionClusters.map((cluster) => (
          <a key={cluster.id} href={`#${cluster.id}`}>
            {cluster.title}
            <span>{cluster.questions.length}</span>
          </a>
        ))}
      </nav>

      {questionClusters.map((cluster, clusterIndex) => {
        const link = clusterLinks[cluster.id];
        return (
          <section key={cluster.id} id={cluster.id} className="flinza-qcluster">
            <header className="flinza-qcluster-head">
              <span className="flinza-qcluster-num">
                {String(clusterIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{cluster.title}</h2>
                <p>{cluster.blurb}</p>
              </div>
              {link ? (
                <Link href={link.href} className="flinza-qcluster-link">
                  {link.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : null}
            </header>

            {/* The question is an h3 so it is a real heading a screen reader can jump between and
                an answer engine can match against a query string. The answer is the paragraph
                directly beneath it — visible, not behind a disclosure, because hidden answers do
                not get quoted. */}
            <div className="flinza-qa-list">
              {cluster.questions.map((item) => (
                <div key={item.q} className="flinza-qa">
                  <h3 className="flinza-faqrow-q">{item.q}</h3>
                  <p className="flinza-faqrow-a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section id="comparisons" className="flinza-qcluster">
        <header className="flinza-qcluster-head">
          <span className="flinza-qcluster-num">
            {String(questionClusters.length + 1).padStart(2, "0")}
          </span>
          <div>
            <h2>Side by side</h2>
            <p>
              The comparisons people search for before they contact anyone, including the cases
              where the other option is the right one.
            </p>
          </div>
        </header>

        <div className="flinza-cmp-list">
          {comparisons.map((cmp) => (
            <figure key={cmp.id} id={cmp.id} className="flinza-cmp">
              <figcaption className="flinza-cmp-cap">{cmp.title}</figcaption>
              <p className="flinza-cmp-verdict">{cmp.verdict}</p>
              <div className="flinza-cmp-scroll">
                <table className="flinza-cmp-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="flinza-sr">Comparison</span>
                      </th>
                      {cmp.columns.map((col) => (
                        <th key={col} scope="col">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cmp.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((value, i) => (
                          <td key={`${row.label}-${i}`} data-label={cmp.columns[i]}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <div className="flinza-qclose">
        <h2>Still have a question?</h2>
        <p>
          Send it over. If it is a good one we will add it here with the answer, which is cheaper
          than writing it twice.
        </p>
        <CamoCtaButton href="/contact">Ask us directly</CamoCtaButton>
      </div>
    </PageShell>
  );
}
