"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ConnectSection from "@/components/ConnectSection";
import SiteFooter from "@/components/SiteFooter";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/#services" },
  { label: "WORK", href: "/works" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

const stackSections = [
  { label: "AI / ML", items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "LLMs", "RAG", "NLP", "Computer Vision"] },
  { label: "DATA", items: ["NumPy", "Pandas", "SQL", "EDA", "Feature Engineering", "Vector Databases"] },
  { label: "WEB", items: ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Tailwind CSS", "REST APIs"] },
  { label: "TOOLS", items: ["Git", "GitHub", "Docker", "FastAPI", "Streamlit", "Figma", "Postman"] },
];

const principles = [
  { number: "01", title: "UNDERSTAND FIRST", copy: "Good products start with understanding the problem, not jumping straight to the solution." },
  { number: "02", title: "KEEP IT USEFUL", copy: "I care about making things that are clear, practical and genuinely useful to the person using them." },
  { number: "03", title: "MAKE IT FEEL RIGHT", copy: "Function matters, but so does the experience. I like technology that works well and feels considered." },
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
        <section className="about-intro about-editorial-band">
          <p className="eyebrow">ABOUT / 01 — INTRODUCTION</p>
          <div className="about-intro-grid about-editorial-grid">
            <h1>I&apos;M<br />DEEPIKA<span>.</span></h1>
            <div className="about-lede"><p>AI/ML engineer, data scientist and creative developer building intelligent things with a human edge.</p><p>I&apos;m a Computer Science Engineer building at the intersection of AI, data and the web. I enjoy taking complicated problems and turning them into things that feel simple, useful and thoughtfully made.</p></div>
          </div>
        </section>

        <motion.section className="about-build about-editorial-band" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow">ABOUT / 02 — HOW I BUILD</p>
          <div className="about-build-grid about-editorial-grid"><div><h2>CURIOUS<br /><em>BY DEFAULT.</em></h2></div><div className="about-build-copy"><p>I like figuring things out. I don&apos;t need to know everything before I start — I learn, experiment, build and keep moving.</p></div></div>
          <div className="principles-list">{principles.map((principle, index) => <motion.div className="principle-row" key={principle.number} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.08 }}><span>{principle.number}</span><strong>{principle.title}</strong><p>{principle.copy}</p></motion.div>)}</div>
        </motion.section>

        <section className="about-stack about-editorial-band">
          <p className="eyebrow eyebrow-light">ABOUT / 03 — TECH STACK</p>
          <div className="about-section-heading about-editorial-grid"><h2>TOOLS FOR<br /><em>THINKING.</em></h2><p>I use whatever helps solve the problem well — from intelligent systems to the interfaces people interact with.</p></div>
          <div className="about-stack-list">{stackSections.map((section, index) => <motion.div className="about-stack-row" key={section.label} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.08 }}><span className="about-stack-number">0{index + 1}</span><h3>{section.label}</h3><div className="about-tags">{section.items.map((item) => <span key={item}>{item}</span>)}</div></motion.div>)}</div>
        </section>

        <motion.section className="about-personal about-editorial-band" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow">ABOUT / 04 — A LITTLE MORE ABOUT ME</p>
          <div className="about-personal-grid about-editorial-grid"><h2>OUTSIDE<br /><em>THE CODE.</em></h2><div className="about-personal-copy"><p>I&apos;m an optimist, a heavy Spotify listener, a fiction reader and someone who can disappear down a rabbit hole about <mark>space</mark> or <mark>geography</mark>.</p><p>I love <mark>science-fiction</mark> stories, journaling and ideas that make me look at the world differently.</p><p>I&apos;m ambitious, curious and very much a get-it-done person. If I don&apos;t know how to do something yet, I&apos;ll figure it out.</p></div></div>
        </motion.section>
      </main>
      <ConnectSection />
      <SiteFooter />
    </>
  );
}
