import { EditorialImage } from "@/components/ui/EditorialImage";
import { EditorialMotion } from "@/components/ui/EditorialMotion";
import { TelevisionIntro } from "@/components/ui/TelevisionIntro";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { issues } from "@/data/issues";
import { site } from "@/data/site";
import { verticals } from "@/data/verticals";
import { hasStoryForm, storyFormHref, hasPartnershipForm, partnershipFormHref } from "@/lib/constants";

const selections = [
  { name: "Tukaram Mundhe, IAS", title: "The officer who would not bend", category: "The cover story", image: "tukaram-munde", page: 3 },
];
function Arrow() { return <span aria-hidden="true">↗</span>; }
function Star() { return <span aria-hidden="true" className="editorial-star" data-parallax="rotate">✳</span>; }

export default function HomePage() {
  const editions = [...issues].reverse();
  const latest = issues.at(-1);
  if (!latest) throw new Error("The featured edition is missing.");
  return (
    <div className="editorial-home" id="top">
      <EditorialMotion />
      <TelevisionIntro />
      <section className="masthead editorial-shell" aria-label="LEGEND Magazine">
        <div className="edition-line"><span>Mumbai born. India in focus.</span><span>Fresh perspectives · Print & digital</span><span>Excellence / Culture / Vision</span></div>
        <div className="masthead-title" data-entrance="masthead" aria-hidden="true">LEGEND<span>✳</span></div>
        <div className="masthead-baseline"><span>The magazine of extraordinary stories</span><span>People. Purpose. Possibility.</span></div>
      </section>

      <section className="cover-grid editorial-shell" aria-labelledby="cover-heading">
        <div className="cover-copy">
          <div className="panel-meta"><span>01 / The cover story</span><Star /></div>
          <h1 id="cover-heading" data-entrance="headline">Non-<br />negotiable.<br /><span>One standard.</span></h1>
          <p>A career shaped by public service, repeated transfers, and a standard that has never moved.</p>
          <TrackedLink href={latest.pdf + "#page=3"} external event="story_card_click" payload={{ story_id: "tukaram-mundhe-cover-story", location: "hero" }} className="editorial-link">Read the cover story <Arrow /></TrackedLink>
          <div className="cover-note"><span>In this issue</span><strong>Tukaram Mundhe, IAS</strong><span>The officer who would not bend</span></div>
        </div>
        <TrackedLink href={latest.pdf + "#page=3"} external event="issue_open" className="cover-photo" aria-label="Read Tukaram Mundhe’s cover story in the September 2026 edition">
          <EditorialImage src="/images/editorial/tukaram-munde.jpg" alt="Tukaram Mundhe seated for his LEGEND cover portrait" fill parallax priority sizes="(max-width: 700px) 100vw, 40vw" />
          <span className="photo-label">On the cover / September 2026</span>
          <span className="photo-caption">Moved twenty-five times.<br />Never moved his standard.</span>
          <span className="photo-corner" aria-hidden="true">↗</span>
        </TrackedLink>
        <aside className="contents-panel" aria-label="Explore this page">
          <div className="panel-meta"><span>Your next read</span><span>↓</span></div>
          <h2>Table of<br />contents.</h2>
          <nav aria-label="Contents">{[
            ["01", "The editions", "#editions"], ["02", "Selected stories", "#stories"], ["03", "Developers’ Diary", "#developers-diary"], ["04", "Our perspective", "#about"], ["05", "Be part of it", "#pitch"],
          ].map(([n, label, href]) => <a key={n} href={href}><span>{n}</span><strong>{label}</strong><Arrow /></a>)}</nav>
          <div className="contents-bottom"><Star /><p>Extraordinary isn’t<br />an accident.<br /><strong>It’s a story.</strong></p></div>
        </aside>
      </section>

      <div className="editorial-ribbon" aria-label="Our editorial focus"><span>Leadership</span><Star /><span>Business</span><Star /><span>Culture</span><Star /><span>Vision</span><Star /><span>Mumbai & beyond</span><Star /></div>

      <section id="editions" className="editorial-section editorial-shell" aria-labelledby="editions-title">
        <div className="section-kicker" data-motion="rule"><span>02 / The archive</span><span>Made to be read. Worth keeping.</span></div>
        <div className="editorial-heading" data-motion="rise"><h2 id="editions-title">Good stories.<br /><span>Great editions.</span></h2><p>Fresh perspectives, cover to cover.<br />Explore the people and ideas<br />inside LEGEND.</p></div>
        <div className="edition-grid">{editions.map((issue, index) => <article key={issue.id} className={"edition-card edition-" + issue.accent} data-motion="rise" data-motion-delay={index}>
          <div className="edition-card-top"><span>{index === 0 ? "The latest issue" : "Where it began"}</span><span>Issue / {issue.issueNumber}</span></div>
          <TrackedLink href={issue.pdf} external event="issue_open" payload={{ issue_id: issue.id, location: "archive" }} className="edition-art" aria-label={"Read LEGEND " + issue.title + " (PDF)"}>
            <span className="edition-backdrop" aria-hidden="true">{issue.month}</span>
            <EditorialImage src={issue.cover} alt={issue.coverAlt} width={597} height={842} sizes="(max-width: 700px) 65vw, 25vw" />
            <span className="edition-stamp">Print<br />meets<br />perspective <Arrow /></span>
          </TrackedLink>
          <div className="edition-card-bottom"><div><span className="mini-label">Excellence / Culture / Vision</span><h3>{issue.title}</h3></div><TrackedLink href={issue.pdf} external event="issue_open" payload={{ issue_id: issue.id, location: "archive_cta" }} className="circle-link" aria-label={"Open " + issue.title + " PDF"}><Arrow /></TrackedLink></div>
          <p className="edition-names">{issue.featuredNames.slice(0, 3).join(" / ")}</p>
        </article>)}</div>
      </section>

      <section id="stories" className="stories-section editorial-section" aria-labelledby="stories-title"><div className="editorial-shell">
        <div className="section-kicker" data-motion="rule"><span>03 / From the pages of LEGEND</span><span>The editor’s selection</span></div>
        <div className="editorial-heading" data-motion="rise"><h2 id="stories-title">Behind the<br /><span>headline.</span></h2><a href="#editions" className="editorial-link">Explore the editions <Arrow /></a></div>
        <div className="selected-grid single-story">{selections.map((story, i) => <article className="selected-story" key={story.image} data-motion="rise" data-motion-delay={i}>
          <TrackedLink href={latest.pdf + "#page=" + story.page} external event="story_card_click" payload={{ story_id: story.image }} className="selected-image" aria-label={"Read " + story.title + " in the September 2026 edition"}><EditorialImage src={"/images/editorial/" + story.image + ".jpg"} alt={story.name + ", featured on the September cover of LEGEND"} fill parallax sizes="(max-width: 700px) 90vw, 45vw" /><span className="story-number">0{i + 1}</span><span className="image-arrow" aria-hidden="true">↗</span></TrackedLink>
          <div className="story-meta"><span>{story.category}</span><span>September ’26</span></div>
          <h3><TrackedLink href={latest.pdf + "#page=" + story.page} external event="story_card_click">{story.title}</TrackedLink></h3>
          <p className="story-byline">{story.name}</p>
          <p className="story-dek">A reported profile on the career behind the headlines, from water management and civic administration to Maharashtra’s Food and Drug Administration.</p>
          <div className="story-stats" aria-label="Career highlights from the September cover story">
            <div><strong>21+</strong><span>Years of service</span></div>
            <div><strong>25+</strong><span>Transfers</span></div>
            <div><strong>1</strong><span>Standard held</span></div>
          </div>
          <TrackedLink href={latest.pdf + "#page=" + story.page} external event="story_card_click" className="story-read-link">Read the full feature <Arrow /></TrackedLink>
        </article>)}</div>
      </div></section>

      <section id="developers-diary" className="diary-section" aria-labelledby="diary-title">
        <div className="diary-copy" data-motion="rise"><div className="panel-meta"><span>04 / The signature series</span><Star /></div><h2 id="diary-title">The record<br /><span>before headlines.</span></h2><p>Before the headlines, a career in water, civic administration, and the daily work of applying the rules.</p><TrackedLink href={latest.pdf + "#page=4"} external event="story_card_click" className="editorial-link">Read the full story <Arrow /></TrackedLink><span className="diary-footnote">Public service / Leadership / The long view</span></div>
        <div className="diary-image" data-motion="rise"><EditorialImage src="/images/editorial/tukaram-record.png" alt="Tukaram Mundhe, pictured in the September feature about his public service record" fill parallax sizes="(max-width: 700px) 100vw, 50vw" /><div><span>From the September edition</span><strong>Tukaram Mundhe</strong><span>The record before the headlines</span></div></div>
      </section>

      <section id="about" className="editorial-section editorial-shell" aria-labelledby="about-title"><div className="about-grid">
        <div className="about-statement" data-motion="rise"><span className="mini-label">05 / Our perspective</span><h2 id="about-title">Some follow<br />the story.<br />We look<br /><span>closer.</span></h2><Star /></div>
        <div className="about-values" data-motion="rise"><span className="mini-label">Mumbai born. Endlessly curious.</span><p className="about-intro">{site.copy.about.pullQuote}</p>{[
          ["01", "People first.", "The person behind the position. The conviction behind the decision. We start there."],
          ["02", "Depth matters.", "Leadership, business, culture, and the built environment. Connected by curiosity, explored with care."],
          ["03", "Stories that stay.", "A perspective worth sitting with. A magazine worth returning to. In print and on screen."],
        ].map(([n, title, body]) => <div className="value-row" key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div>
      </div></section>

      <section id="verticals" className="coverage-section editorial-shell" aria-labelledby="coverage-title"><div className="section-kicker" data-motion="rule"><span>06 / Our world</span><span>Ten lenses. One LEGEND.</span></div><div className="coverage-grid"><h2 id="coverage-title" data-motion="rise">A wider<br /><span>perspective.</span><Star /></h2><div className="coverage-list">{verticals.map((v, i) => <details key={v.id} data-motion="rise" data-motion-delay={i % 3}><summary><span>{String(i + 1).padStart(2, "0")}</span><strong>{v.label}</strong><span className="details-plus" aria-hidden="true">+</span></summary><p>{v.description}</p></details>)}</div></div></section>

      <section className="contribute-grid editorial-shell editorial-section" aria-label="Be part of LEGEND">
        <div id="pitch" className="contribute-panel pitch-panel" data-motion="rise"><span className="mini-label">07 / Your story, our pages</span><h2>Extraordinary?<br /><span>Let’s hear it.</span></h2><p>{site.copy.pitch.body}</p><TrackedLink href={storyFormHref} external={hasStoryForm} event="pitch_story_click" payload={{ location: "pitch_section" }} className="editorial-link">Pitch your story <Arrow /></TrackedLink><small>{site.copy.pitch.microcopy}</small></div>
        <div id="partnerships" className="contribute-panel partner-panel" data-motion="rise" data-motion-delay="1"><span className="mini-label">08 / Brand partnerships</span><h2>Make your<br /><span>presence felt.</span></h2><p>{site.copy.partnerships.body}</p><TrackedLink href={partnershipFormHref} external={hasPartnershipForm} event="partnership_click" payload={{ location: "partnerships_section" }} className="editorial-link">Partner with LEGEND <Arrow /></TrackedLink><small>{site.copy.partnerships.microcopy}</small></div>
      </section>
    </div>
  );
}

