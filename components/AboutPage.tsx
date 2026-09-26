"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ConnectSection from "@/components/ConnectSection";

const navItems = [
  { label: "WORK", href: "/#work" },
  { label: "STACK", href: "/#stack" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/#contact" },
];

const stackSections = [
  { label: "INTELLIGENCE", note: "Systems that learn, retrieve and reason.", items: ["Python", "Machine Learning", "PyTorch", "LLMs", "RAG", "LangChain"] },
  { label: "DATA", note: "From raw signals to useful decisions.", items: ["Pandas", "NumPy", "SQL", "EDA", "Feature Engineering", "Scikit-learn"] },
  { label: "EXPERIENCE", note: "Interfaces that make complex things clear.", items: ["React", "Next.js", "TypeScript", "FastAPI", "Three.js", "GSAP"] },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-nav about-nav">
        <Link href="/" className="brand" aria-label="Deepika S home">DS<span>.</span></Link>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<sup>↗</sup></Link>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main className="about-page">
        <section className="about-intro page-band">
          <p className="eyebrow">ABOUT / 01</p>
          <div className="about-intro-grid">
            <h1>I&apos;m Deepika<span>.</span></h1>
            <div className="about-lede"><p>AI/ML engineer, data scientist and creative developer building intelligent things with a human edge.</p><Link className="text-action" href="/#contact">LET&apos;S BUILD <ArrowUpRight size={17} /></Link></div>
          </div>
          <div className="about-mark" aria-hidden="true">DS<span>.</span></div>
        </section>

        <motion.section className="about-story page-band" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow">INTRO / 02</p>
          <div className="story-grid"><h2>CURIOUS<br /><em>BY DEFAULT.</em></h2><div className="story-copy"><p>I work at the meeting point of data, software and visual communication. That can mean training a model, shaping a clean data pipeline, or turning a complex idea into an interface that feels obvious.</p><p>I care about the whole journey: the question behind the dataset, the person on the other side of the product, and the details that make technology feel considered.</p><span className="mono-note">MODEL → PRODUCT → EXPERIENCE</span></div></div>
        </motion.section>

        <section className="about-stack page-band"><p className="eyebrow">MY STACK / 03</p><div className="about-section-heading"><h2>TOOLS FOR<br /><em>THINKING.</em></h2><p>My stack moves between intelligent systems and expressive interfaces. The tool matters less than what it helps make possible.</p></div><div className="about-stack-list">{stackSections.map((section, index) => <motion.div className="about-stack-row" key={section.label} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.08 }}><span className="about-stack-number">0{index + 1}</span><div><h3>{section.label}</h3><p>{section.note}</p></div><div className="about-tags">{section.items.map((item) => <span key={item}>{item}</span>)}</div></motion.div>)}</div></section>

        <section className="about-next page-band"><p className="eyebrow">NEXT / 04</p><div className="next-grid"><h2>SEE THE<br /><em>WORK.</em></h2><Link href="/#work" className="next-link">SELECTED PROJECTS <ArrowUpRight size={26} /></Link></div></section>
      </main>
      <ConnectSection />
      <footer><span>© 2026 Deepika S</span><span>AI · ML · DATA · WEB</span></footer>
    </>
  );
}
