"use client";

import { ArrowUpRight } from "lucide-react";
import { siGithub, siGmail, siInstagram, siLeetcode } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { CSSProperties } from "react";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepika-s-7494a7258/", mark: "in", tone: "blue" },
  { label: "GitHub", href: "https://github.com/deepika68509/", icon: siGithub, tone: "ink" },
  { label: "LeetCode", href: "https://leetcode.com/u/Deepika68509/", icon: siLeetcode, tone: "lime" },
  { label: "Instagram", href: "https://www.instagram.com/_deepika__s___?stkn=MWp2OWh3cnp3YW1z", icon: siInstagram, tone: "blue" },
  { label: "Gmail", href: "mailto:deepika.shantappa@gmail.com", icon: siGmail, tone: "lime" },
];

function BrandLogo({ icon, mark }: { icon?: SimpleIcon; mark?: string }) {
  if (mark) return <span className="brand-mark" aria-hidden="true">{mark}</span>;
  return <svg className="brand-logo" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d={icon?.path} /></svg>;
}

export default function ConnectSection() {
  return (
    <section className="connect-section" aria-labelledby="connect-title">
      <div className="connect-heading">
        <p className="eyebrow">08 — CONNECT</p>
        <h2 id="connect-title">LET&apos;S <em>CONNECT.</em></h2>
      </div>
      <div className="connect-grid">
        {links.map(({ label, href, icon, mark, tone }) => (
          <a className={`connect-card connect-card--${tone}`} href={href} key={label} target="_blank" rel="noreferrer">
            <span className="connect-icon" style={{ "--brand-color": mark ? "#0A66C2" : `#${icon?.hex}` } as CSSProperties}><BrandLogo icon={icon} mark={mark} /></span>
            <span className="connect-label">{label}</span>
            <ArrowUpRight className="connect-arrow" size={19} />
          </a>
        ))}
      </div>
    </section>
  );
}
