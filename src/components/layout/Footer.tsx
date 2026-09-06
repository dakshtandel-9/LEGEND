import { site } from "@/data/site";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ReplayIntro } from "@/components/ui/TelevisionIntro";
export function Footer() {
  return <footer id="contact" className="editorial-footer"><div className="editorial-shell">
    <div className="footer-top"><div><p>Extraordinary stories.<br />Made in Mumbai. Read everywhere.</p><ReplayIntro /></div><a href="#top" className="editorial-link">Back to top <span aria-hidden="true">↑</span></a></div>
    <div className="footer-wordmark" aria-hidden="true">LEGEND<span>✳</span></div>
    <div className="footer-links"><span>Excellence / Culture / Vision</span><nav aria-label="Footer">{site.footerNav.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} LEGEND. All rights reserved.</span><TrackedLink href={"mailto:" + site.contact.editorialEmail} event="email_click">{site.contact.editorialEmail}</TrackedLink><TrackedLink href={site.contact.instagramUrl} external event="instagram_click">Instagram ↗</TrackedLink><span>Mumbai, India</span></div>
  </div></footer>;
}

