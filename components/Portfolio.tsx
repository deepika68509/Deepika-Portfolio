"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";

const HeroVisualization = dynamic(() => import("@/components/HeroVisualization"), { ssr: false });
const ProjectUniverse = dynamic(() => import("@/components/ProjectUniverse"), { ssr: false });

const navItems = [
  { label: "WORK", href: "#work" },
  { label: "STACK", href: "#stack" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "#contact" },
];
const featuredSkills = new Set(["Python", "Machine Learning", "LLMs", "Three.js"]);
const heroRoles = [
  { key: "ai" as const, label: "an AI/ML Engineer" },
  { key: "data" as const, label: "a Data Scientist" },
  { key: "web" as const, label: "a Web Developer" },
  { key: "creative" as const, label: "a Creative Developer" },
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState(heroRoles[0].label);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 650);
    let cleanup = () => {};
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const network = document.querySelector(".webgl-hero");
        if (!network) return;
        const tween = gsap.to(network, { y: 110, scale: 0.76, opacity: 0.42, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
        cleanup = () => { tween.kill(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
      });
    });
    return () => { window.clearTimeout(timer); cleanup(); };
  }, []);

  useEffect(() => {
    const activeRole = heroRoles[roleIndex];
    const isComplete = roleText === activeRole.label;
    const isEmpty = roleText.length === 0;
    const delay = isComplete && !isDeleting ? 1900 : isEmpty && isDeleting ? 350 : isDeleting ? 32 : 65;
    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % heroRoles.length);
      } else {
        setRoleText(isDeleting ? activeRole.label.slice(0, roleText.length - 1) : activeRole.label.slice(0, roleText.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, roleText]);

  return (
    <>
      <div className={`loader ${loaded ? "loader--done" : ""}`} aria-hidden="true"><span>DS.</span><span>01 / 03</span></div>
      <header className="site-nav">
        <a href="#top" className="brand" aria-label="Deepika S home">DS<span>.</span></a>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<sup>↗</sup></a>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" />
          <div className="hero-copy">
            <p className="eyebrow">01 — AI / ML ENGINEER · DATA · WEB</p>
            <h1 id="hero-title" className="hero-intro">I&apos;m Deepika,<br /><em className="hero-role" aria-live="polite">{roleText}<span className="reveal-cursor" aria-hidden="true" /></em></h1>
            <div className="hero-bottom">
              <p className="intro">I design and build intelligent, modern and interactive digital experiences.</p>
              <div className="hero-actions"><a className="text-action" href="#work">EXPLORE WORK <ArrowDownRight size={18} /></a><a className="text-action" href="#contact">DOWNLOAD RESUME <Download size={16} /></a></div>
            </div>
          </div>
          <HeroVisualization role={heroRoles[roleIndex].key} />
          <span className="scroll-note">SCROLL TO EXPLORE <ArrowDownRight size={15} /></span>
        </section>

        <div className="ticker" aria-label="Areas of expertise"><div className="ticker-track">{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT"].map((item) => <span key={item}><b />{item}</span>)}{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT"].map((item) => <span key={`repeat-${item}`}><b />{item}</span>)}</div></div>

        <motion.section className="about section" id="about" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <p className="eyebrow">02 — ABOUT</p><div className="about-content"><h2>ABOUT<br />ME<span>.</span></h2><div className="about-text"><p>Computer Science engineer focused on AI/ML, data science and modern web development. I enjoy going from messy data and a blank screen to something useful, measurable and beautiful.</p><span className="mono-note">A PRACTICAL MIND<br />WITH A VISUAL EDGE</span><a className="about-link" href="/about">ABOUT ME <ArrowUpRight size={17} /></a></div></div>
        </motion.section>

        <section className="work section" id="work">
          <div className="section-heading"><div><p className="eyebrow">03 — SELECTED WORK</p><h2>SELECTED<br />WORK<span>.</span></h2></div><p className="section-note">A selection of projects across AI/ML,<br />data science and software engineering.</p></div>
          <div className="work-layout"><div className="project-list">{projects.map((project, index) => <motion.article key={project.number} className={`project-row ${activeProject === index ? "is-active" : ""}`} onMouseEnter={() => setActiveProject(index)} onMouseLeave={() => setActiveProject(-1)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.07 }}><span className="project-number">{project.number}</span><div className="project-info"><h3>{project.title}</h3><p>{project.stack}</p><small>{project.category}</small></div><div className="project-description">{project.description}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}><span>GH</span><ArrowUpRight size={16} /></a><a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}><span>LIVE</span><ArrowUpRight size={16} /></a></div><ArrowUpRight className="project-arrow" size={28} /></motion.article>)}</div><ProjectUniverse active={activeProject} /></div>
        </section>

        <section className="stack section-dark" id="stack"><div className="stack-inner"><p className="eyebrow eyebrow-light">04 — THE STACK</p><div className="stack-heading"><h2>THE<br />STACK<span>.</span></h2><p>The tools I use to turn ideas into intelligent, production-ready experiences.</p></div><div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.label}><h3>{group.label}</h3><div className="skill-tags">{group.items.map((skill) => <span className={featuredSkills.has(skill) ? "featured" : ""} key={skill}>{skill}</span>)}</div></div>)}</div><div className="stats"><div><strong>AI</strong><span>INTELLIGENT SYSTEMS</span></div><div><strong>ML</strong><span>PREDICTIVE MODELS</span></div><div><strong>WEB</strong><span>PRODUCT EXPERIENCES</span></div></div><div className="skill-map"><div className="map-center">AI</div><span className="map-node map-ml">ML</span><span className="map-node map-data">DATA</span><span className="map-node map-llm">LLMs</span><span className="map-node map-web">WEB</span><i className="map-line line-one" /><i className="map-line line-two" /><i className="map-line line-three" /><i className="map-line line-four" /></div></div></section>

        <section className="contact section" id="contact"><p className="eyebrow">05 — LET&apos;S BUILD</p><div className="contact-heading"><h2>HAVE A<br /><em>PROJECT?</em></h2><ArrowUpRight size={70} strokeWidth={1} /></div><a className="email" href="mailto:hello@example.com">hello@example.com <ArrowUpRight size={32} /></a><div className="contact-footer"><a href="mailto:hello@example.com">DOWNLOAD RESUME <Download size={16} /></a><div><a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div></section>
      </main>
      <footer><span>© 2026 Deepika S</span><span>AI · ML · DATA · WEB</span></footer>
    </>
  );
}
