import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/about" },
  { label: "STACK", href: "/#stack" },
  { label: "CONTACT", href: "/#contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <Link href="/" className="footer-brand" aria-label="Deepika S home">DS<span>.</span></Link>
        <Link href="/#work" className="footer-cta">EXPLORE THE WORK <ArrowUpRight size={17} /></Link>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 Deepika S</span>
        <nav aria-label="Footer navigation">{footerLinks.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}</nav>
        <span>AI · ML · DATA · WEB</span>
      </div>
    </footer>
  );
}
