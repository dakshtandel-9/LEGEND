import { EditorialImage } from "@/components/ui/EditorialImage";
import { EditorialMotion } from "@/components/ui/EditorialMotion";
import { TelevisionIntro } from "@/components/ui/TelevisionIntro";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site } from "@/data/site";
import { verticals } from "@/data/verticals";
import type { Issue } from "@/data/types";
import {
  getArchiveStats,
  getContents,
  getCoverStory,
  getDiaryStories,
  getFeatureStories,
  getIssueById,
  getIssuesNewestFirst,
  getLatestIssue,
} from "@/lib/content";
import { hasStoryForm, storyFormHref, hasPartnershipForm, partnershipFormHref } from "@/lib/constants";

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Star() { return <span aria-hidden="true" className="editorial-star" data-parallax="rotate">✳</span>; }

/** Sets the last word of a headline apart, the way the print covers do. */
function splitLast(text: string): [string, string] {
  const at = text.lastIndexOf(" ");
  return at < 0 ? ["", text] : [text.slice(0, at), text.slice(at + 1)];
}

function issueOf(issueId: string): Issue {
  const issue = getIssueById(issueId);
  if (!issue) throw new Error(`Unknown edition "${issueId}" in src/data.`);
  return issue;
}

export default function HomePage() {
  const latest = getLatestIssue();
  const editions = getIssuesNewestFirst();
  const cover = getCoverStory();
  const features = getFeatureStories();
  const diary = getDiaryStories();
  const stats = getArchiveStats();
  const { founder } = site;
  const [coverLead, coverLast] = splitLast(cover.title);

  return (
    <div className="editorial-home" id="top">
      <EditorialMotion />
      <TelevisionIntro />
      <section className="masthead editorial-shell" aria-label="LEGEND Magazine">
        <div className="edition-line"><span>Issue {latest.issueNumber} · {latest.title} · Out now</span><span>Mumbai born. India in focus.</span><span>Excellence / Culture / Vision</span></div>
        <div className="masthead-title" data-entrance="masthead" aria-hidden="true">LEGEND<span>✳</span></div>
        <div className="masthead-baseline"><span>The magazine of extraordinary stories</span><span>{stats.editions} editions · Monthly · Print</span></div>
      </section>

      <section className="cover-grid editorial-shell" aria-labelledby="cover-heading">
        <div className={"cover-copy accent-" + latest.accent}>
          <div className="panel-meta"><span>01 / The cover story · Issue {latest.issueNumber}</span><Star /></div>
          <h1 id="cover-heading" data-entrance="headline">{coverLead}<br /><span>{coverLast}.</span></h1>
          <p>{cover.excerpt}</p>
          <a href="#editions" className="editorial-link">See the editions <Arrow /></a>
          {cover.stats && <dl className="cover-stats">{cover.stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>}
          <div className="cover-note"><span>On the cover</span><strong>{cover.subject}</strong><span>Issue {latest.issueNumber} · Published {latest.published}</span></div>
        </div>
        <div className="cover-photo">
          <EditorialImage src={cover.image} alt={cover.imageAlt} fill parallax priority sizes="(max-width: 700px) 100vw, 42vw" />
          <span className="photo-label">On the cover / {latest.title}</span>
          {cover.caption && <span className="photo-caption">{cover.caption}</span>}
        </div>
        <aside className="contents-panel" aria-label="On this page">
          <div className="panel-meta"><span>Your next read</span><span>↓</span></div>
          <h2>Table of<br />contents.</h2>
          <nav aria-label="Contents">{[
            ["02", "The editions", "#editions"], ["03", "Inside the issues", "#stories"], ["04", "Developers’ Diary", "#developers-diary"], ["05", "The founder", "#founder"], ["06", "In these pages", "#index"], ["09", "Be part of it", "#pitch"],
          ].map(([n, label, href]) => <a key={n} href={href}><span>{n}</span><strong>{label}</strong><Arrow /></a>)}</nav>
          <div className="contents-bottom"><Star /><p>Extraordinary isn’t<br />an accident.<br /><strong>It’s a story.</strong></p></div>
        </aside>
      </section>

      <div className="editorial-ribbon" aria-label="Our editorial focus"><span>Leadership</span><Star /><span>Business</span><Star /><span>Culture</span><Star /><span>Vision</span><Star /><span>Mumbai & beyond</span><Star /></div>

      <section id="editions" className="editorial-section editorial-shell" aria-labelledby="editions-title">
        <div className="section-kicker" data-motion="rule"><span>02 / The archive</span><span>Every issue, in print</span></div>
        <div className="editorial-heading" data-motion="rise"><h2 id="editions-title">Good stories.<br /><span>Great editions.</span></h2><p>{stats.editions} editions so far, each one made for print. The people and ideas inside LEGEND, issue by issue.</p></div>
        <div className="edition-grid">{editions.map((issue, index) => <article key={issue.id} className={"edition-card accent-" + issue.accent} data-motion="rise" data-motion-delay={index}>
          <div className="edition-card-top"><span>{index === 0 ? "The latest issue" : index === editions.length - 1 ? "Where it began" : "Previously"}</span><span>Issue / {issue.issueNumber}</span></div>
          <div className="edition-art">
            <span className="edition-backdrop" aria-hidden="true">{issue.month.slice(0, 3)}</span>
            <EditorialImage src={issue.cover} alt={issue.coverAlt} width={issue.coverWidth} height={issue.coverHeight} sizes="(max-width: 700px) 60vw, 20vw" />
            <span className="edition-stamp">Issue<br />{issue.issueNumber}</span>
          </div>
          <div className="edition-card-bottom"><div><span className="mini-label">{issue.published}</span><h3>{issue.title}</h3></div></div>
          <p className="edition-cover-line"><span>Cover story</span><strong>{issue.coverStory.headline} — {issue.coverStory.subject}</strong></p>
          <p className="edition-names">Also inside: {issue.featuredNames.slice(1, 4).join(" / ")}</p>
        </article>)}</div>
      </section>

      <section id="stories" className="stories-section editorial-section" aria-labelledby="stories-title"><div className="editorial-shell">
        <div className="section-kicker" data-motion="rule"><span>03 / Inside the issues</span><span>The editor’s selection</span></div>
        <div className="editorial-heading" data-motion="rise"><h2 id="stories-title">Behind the<br /><span>headline.</span></h2><a href="#index" className="editorial-link">Everyone in these pages <Arrow /></a></div>
        <div className="feature-grid">{features.map((story, i) => {
          const issue = issueOf(story.issueId);
          return <article className="feature-card" key={story.id} data-motion="rise" data-motion-delay={i % 3}>
            <div className="selected-image">
              <EditorialImage src={story.image} alt={story.imageAlt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" />
              <span className={"story-number accent-" + issue.accent}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="story-meta"><span>{story.category}</span><span>Issue {issue.issueNumber} · {issue.month} · p.{story.page}</span></div>
            <h3>{story.title}</h3>
            <p className="story-byline">{story.subject}</p>
            <p className="story-dek">{story.excerpt}</p>
            {story.photoCredit && <p className="photo-credit">Photo: <a href={story.photoCredit.sourceUrl} rel="noreferrer noopener" target="_blank">{story.photoCredit.author} / {story.photoCredit.source}</a>, <a href={story.photoCredit.licenseUrl} rel="noreferrer noopener license" target="_blank">{story.photoCredit.license}</a>, cropped</p>}
          </article>;
        })}</div>
      </div></section>

      <section id="developers-diary" className="diary-section" aria-labelledby="diary-title"><div className="editorial-shell">
        <div className="diary-head" data-motion="rise">
          <div className="panel-meta"><span>04 / The signature series</span><Star /></div>
          <div className="diary-intro"><h2 id="diary-title">Developers’<br /><span>Diary.</span></h2><p>{site.copy.developersDiary.body}</p></div>
        </div>
        <div className="diary-grid">{diary.map((story, i) => {
          const issue = issueOf(story.issueId);
          return <article className="diary-card" key={story.id} data-motion="rise" data-motion-delay={i}>
            <div className="diary-image">
              <EditorialImage src={story.image} alt={story.imageAlt} fill parallax sizes="(max-width: 700px) 90vw, 30vw" />
              <span className="diary-issue">Issue {issue.issueNumber} · {issue.title}</span>
            </div>
            <h3>{story.title}</h3>
            <p className="diary-name">{story.subject}</p>
            <p>{story.excerpt}</p>
            <p className="diary-ref">Issue {issue.issueNumber} · {issue.month} · p.{story.page}</p>
          </article>;
        })}</div>
      </div></section>

      <section id="founder" className="founder-section editorial-shell editorial-section" aria-labelledby="founder-title">
        <div className="section-kicker" data-motion="rule"><span>05 / The founder</span><span>Founded in Mumbai · Published by {founder.publisher}</span></div>
        <div className="founder-grid">
          <div className="founder-profile" data-motion="rise">
            <div className="founder-portrait">
              {founder.portrait
                ? <EditorialImage src={founder.portrait} alt={`Portrait of ${founder.name}`} fill sizes="(max-width: 700px) 40vw, 180px" />
                : <span className="founder-initials" aria-hidden="true">{founder.initials}</span>}
            </div>
            <span className="mini-label">From the founder’s desk</span>
            <h2 id="founder-title">{founder.name}</h2>
            <p className="founder-role">{founder.role}, LEGEND</p>
            <blockquote className="founder-quote"><p>“{founder.quote}”</p><footer>{founder.quoteSource}</footer></blockquote>
            <p className="founder-signoff">{founder.signOff}<Star /></p>
          </div>
          <div className="founder-shelf" data-motion="rise" data-motion-delay="1">
            <span className="mini-label">The founder’s list</span>
            <h3>Check my<br /><span>magazines.</span></h3>
            <p>Every edition of LEGEND so far, newest first — each one with the story on its cover.</p>
            <ol className="founder-list">{editions.map((issue) => <li key={issue.id}>
              <a href="#editions" className="founder-edition">
                <span className="founder-cover"><EditorialImage src={issue.cover} alt="" width={issue.coverWidth} height={issue.coverHeight} sizes="88px" /></span>
                <span className="founder-edition-text">
                  <span className="mini-label">Issue {issue.issueNumber} · {issue.published}</span>
                  <strong>{issue.title}</strong>
                  <span>{issue.coverStory.headline} — {issue.coverStory.subject}</span>
                </span>
                <span className="founder-edition-pages">Issue {issue.issueNumber}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </li>)}</ol>
            <p className="founder-stats"><span><strong>{stats.editions}</strong> editions</span><span><strong>Monthly</strong> in print</span><span><strong>{stats.profiles}</strong> stories</span></p>
          </div>
        </div>
      </section>

      <section id="index" className="index-section editorial-section" aria-labelledby="index-title"><div className="editorial-shell">
        <div className="section-kicker" data-motion="rule"><span>06 / In these pages</span><span>{stats.profiles} stories across {stats.editions} editions</span></div>
        <div className="editorial-heading" data-motion="rise"><h2 id="index-title">Who’s<br /><span>inside.</span></h2><p>Every profile, by edition and the page it opens on in print.</p></div>
        <p className="index-hint" aria-hidden="true">Swipe for earlier editions →</p>
        <div className="index-columns">{editions.map((issue) => <div className="index-column" key={issue.id} data-motion="rise">
          <div className={"index-head accent-" + issue.accent}><span>Issue {issue.issueNumber}</span><strong>{issue.title}</strong></div>
          <ol>{getContents(issue.id).map((entry) => <li key={entry.page + entry.subject}>
            <div className="index-entry">
              <span className="index-page">{String(entry.page).padStart(2, "0")}</span>
              <span className="index-text"><strong>{entry.subject}</strong><span>{entry.headline}</span></span>
            </div>
          </li>)}</ol>
        </div>)}</div>
      </div></section>

      <section id="about" className="editorial-section editorial-shell" aria-labelledby="about-title"><div className="about-grid">
        <div className="about-statement" data-motion="rise"><span className="mini-label">07 / Our perspective</span><h2 id="about-title">Some follow<br />the story.<br />We look<br /><span>closer.</span></h2><Star /></div>
        <div className="about-values" data-motion="rise"><span className="mini-label">Mumbai born. Endlessly curious.</span><blockquote className="about-intro"><p>“The city does not pause to explain itself. Nor should the journalism that covers it.”</p><footer>Editor’s note, {latest.title}</footer></blockquote>{[
          ["01", "People first.", "The person behind the position. The conviction behind the decision. We start there."],
          ["02", "Depth matters.", "Leadership, business, culture, and the built environment. Connected by curiosity, explored with care."],
          ["03", "Stories that stay.", "A perspective worth sitting with. A magazine worth returning to. In print and on screen."],
        ].map(([n, title, body]) => <div className="value-row" key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div>
      </div></section>

      <section id="verticals" className="coverage-section editorial-shell" aria-labelledby="coverage-title"><div className="section-kicker" data-motion="rule"><span>08 / Our world</span><span>Ten lenses. One LEGEND.</span></div><div className="coverage-grid"><h2 id="coverage-title" data-motion="rise">A wider<br /><span>perspective.</span><Star /></h2><div className="coverage-list">{verticals.map((v, i) => <details key={v.id} data-motion="rise" data-motion-delay={i % 3}><summary><span>{String(i + 1).padStart(2, "0")}</span><strong>{v.label}</strong><span className="details-plus" aria-hidden="true">+</span></summary><p>{v.description}</p></details>)}</div></div></section>

      <section className="contribute-grid editorial-shell editorial-section" aria-label="Be part of LEGEND">
        <div id="pitch" className="contribute-panel pitch-panel" data-motion="rise"><span className="mini-label">09 / Your story, our pages</span><h2>Extraordinary?<br /><span>Let’s hear it.</span></h2><p>{site.copy.pitch.body}</p><TrackedLink href={storyFormHref} external={hasStoryForm} event="pitch_story_click" payload={{ location: "pitch_section" }} className="editorial-link">Pitch your story <Arrow /></TrackedLink><small>{site.copy.pitch.microcopy}</small></div>
        <div id="partnerships" className="contribute-panel partner-panel" data-motion="rise" data-motion-delay="1"><span className="mini-label">10 / Brand partnerships</span><h2>Make your<br /><span>presence felt.</span></h2><p>{site.copy.partnerships.body}</p><TrackedLink href={partnershipFormHref} external={hasPartnershipForm} event="partnership_click" payload={{ location: "partnerships_section" }} className="editorial-link">Partner with LEGEND <Arrow /></TrackedLink><small>{site.copy.partnerships.microcopy}</small></div>
      </section>
    </div>
  );
}
