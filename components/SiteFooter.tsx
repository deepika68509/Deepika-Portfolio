import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/#work" },
  { label: "STACK", href: "/#stack" },
  { label: "BLOG", href: "/#blog" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
        <div className="brand-column">
          <Link href="/" className="footer-brand" aria-label="Deepika S home">DS<span>.</span></Link>
          <p className="footer-statement"><strong>AI · ML · SOFTWARE</strong>Building useful things<br />with thoughtful technology.</p>
          <Link href="/#work" className="footer-cta">EXPLORE THE WORK <ArrowUpRight size={17} /></Link>
        </div>
        <nav className="links-column" aria-label="Footer navigation">
          <h2>OTHER LINKS</h2>
          {footerLinks.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
        </nav>
        <div className="contact-column">
          <h2>CONTACT</h2>
          <span>EMAIL</span><a href="mailto:deepika.shantappa@gmail.com">deepika.shantappa@gmail.com</a>
          <span>LOCATION</span><p>India · Working globally</p>
          <a href="/#contact" className="footer-cta">START A PROJECT <ArrowUpRight size={17} /></a>
        </div>
        </div>
        <div className="footer-bottom">
        <span>© 2026 DEEPIKA S · ALL RIGHTS RESERVED</span>
        <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
