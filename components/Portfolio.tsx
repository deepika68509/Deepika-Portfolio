"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import ConnectSection from "@/components/ConnectSection";
import Testimonials from "@/components/Testimonials";
import SiteFooter from "@/components/SiteFooter";
import { siLangchain, siPandas, siPlotly, siPython, siReact, siThreedotjs } from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "#services" },
  { label: "WORK", href: "/works" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "#contact" },
];
const featuredSkills = new Set(["Python", "Machine Learning", "LLMs", "Three.js"]);
const heroRoles = [
  { key: "ai" as const, label: "an AI/ML Engineer", description: "I build intelligent systems that turn complex problems into useful, production-ready tools." },
  { key: "data" as const, label: "a Data Scientist", description: "I turn messy data into clear insights, measurable decisions and practical outcomes." },
  { key: "web" as const, label: "a Web Developer", description: "I build fast, accessible web products that make thoughtful ideas easy to use." },
  { key: "creative" as const, label: "a Creative Developer", description: "I blend code, motion and visual direction to create expressive digital experiences." },
  { key: "replo" as const, label: "a Replo Developer", description: "I blend code, motion and visual direction to create expressive digital experiences." },

];
const services = [
  { number: "01", title: "AI / ML DEVELOPMENT", copy: "Intelligent tools built around machine learning, NLP, computer vision and AI.", icon: siPython },
  { number: "02", title: "DATA SCIENCE", copy: "Exploring data, building models and turning complex datasets into useful insights.", icon: siPandas },
  { number: "03", title: "RAG & LLM APPS", copy: "RAG applications, AI assistants and LLM-powered workflows connected to real-world data.", icon: siLangchain },
  { number: "04", title: "WEB DEVELOPMENT", copy: "Fast, accessible and considered web products built from idea to deployment.", icon: siReact },
  { number: "05", title: "REPLO / SHOPIFY", copy: "High-quality Shopify experiences, Replo builds and Figma-to-production development.", icon: siThreedotjs },
  { number: "06", title: "E-COMMERCE DEVELOPMENT", copy: "Conversion-focused storefronts and polished digital experiences for modern commerce.", icon: siPlotly },
];

const stackTabs = [
  { label: "AI", group: "AI / ML", detail: "Intelligent systems and language interfaces" },
  { label: "ML", group: "AI / ML", detail: "Models that turn patterns into decisions" },
  { label: "WEB", group: "WEB", detail: "Production-ready product experiences" },
];

function ServiceLogo({ icon }: { icon: SimpleIcon }) {
  return <svg className="service-logo" viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState(heroRoles[0].label);
  const [isDeleting, setIsDeleting] = useState(false);
  const activeStack = "AI";
  const [navScrolled, setNavScrolled] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setContactStatus("sending");
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error || "The message could not be sent. Please try again.");
      setContactStatus("sent");
      form.reset();
    } catch (error) {
      setContactStatus("error");
      setContactError(error instanceof Error ? error.message : "The message could not be sent. Please try again.");
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const activeRole = heroRoles[roleIndex];

  return (
    <>
      <div className={`loader ${loaded ? "loader--done" : ""}`} aria-hidden="true"><span>DS.</span><span>01 / 03</span></div>
      <header className={`site-nav ${navScrolled ? "site-nav--scrolled" : ""}`}>
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
            <h1 id="hero-title" className="hero-intro">I&apos;M DEEPIKA,<br /><em className="hero-role" aria-live="polite">{roleText}<span className="reveal-cursor" aria-hidden="true" /></em></h1>
            <div className="hero-bottom">
              <p className="intro" aria-live="polite">{activeRole.description}</p>
              <div className="hero-actions"><a className="text-action text-action--primary" href="#work">VIEW MY WORK <ArrowDownRight size={18} /></a><a className="text-action" href="#contact">LET&apos;S CONNECT <ArrowUpRight size={16} /></a></div>
            </div>
          </div>
          <span className="scroll-note">SCROLL TO EXPLORE <ArrowDownRight size={15} /></span>
        </section>

        <div className="ticker" aria-label="Areas of expertise"><div className="ticker-track">{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT","REPLO DEVELOPER", "WEB DEVELOPER", "SHOPIFY DEVELOPER", "GEN AI","DATA ANALYST"].map((item) => <span key={item}><b />{item}</span>)}{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT","REPLO DEVELOPER", "WEB DEVELOPER", "SHOPIFY DEVELOPER", "GEN AI","DATA ANALYST"].map((item) => <span key={`repeat-${item}`}><b />{item}</span>)}</div></div>

        <motion.section className="about section" id="about" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <p className="eyebrow">02 — ABOUT</p><div className="about-content"><h2>ABOUT<br />ME<span>.</span></h2><div className="about-text"><p>Computer Science Engineer building at the intersection of AI, data, and the web. I enjoy turning complicated problems into things that feel simple, useful, and thoughtfully made. Curious by nature, ambitious by choice, and always looking for the next thing worth building.</p><span className="mono-note">A PRACTICAL MIND<br />WITH A VISUAL EDGE</span><a className="about-link" href="/about">ABOUT ME <ArrowUpRight size={17} /></a></div></div>
        </motion.section>

        <section className="services section" id="services">
          <div className="section-heading services-heading"><div><p className="eyebrow">03 — SERVICES</p><h2>WHAT I<br />BUILD<span>.</span></h2></div><p className="section-note">I turn ideas into thoughtful digital experiences — from intelligent AI systems to polished web and e-commerce products.</p></div>
          <div className="services-grid">{services.map((service, index) => <motion.article className="service-card" key={service.number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.06 }}><div className="service-card-top"><span>{service.number}</span><a className="service-arrow" href="#contact" aria-label={`Contact me about ${service.title}`}><ArrowUpRight size={20} /></a></div><div className="service-card-content"><ServiceLogo icon={service.icon} /><h3>{service.title}</h3><p>{service.copy}</p></div></motion.article>)}</div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading"><div><p className="eyebrow">04 — SELECTED WORK</p><h2>SELECTED<br />WORK<span>.</span></h2></div><div className="work-heading-actions"><p className="section-note">A selection of projects across AI/ML,<br />data science and software engineering.</p><a className="works-button" href="https://github.com/deepika68509/" target="_blank" rel="noreferrer">EXPLORE WORKS <ArrowUpRight size={17} /></a></div></div>
          <div className="work-cards">{projects.slice(0, 3).map((project, index) => <motion.article key={project.number} className={`project-card project-card--${index + 1}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.08 }}><div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-category">{project.category}</span></div><div className="project-card-body"><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-card-bottom"><span>{project.stack}</span><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>VIEW PROJECT <ArrowUpRight size={15} /></a><a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>LIVE <ArrowUpRight size={15} /></a></div></div></motion.article>)}</div>
        </section>

        <section className="stack section-dark" id="stack"><div className="stack-inner"><p className="eyebrow eyebrow-light">05 — THE STACK</p><div className="stack-heading"><h2>THE<br />STACK<span>.</span></h2><p>The tools I use to turn ideas into intelligent, production-ready experiences.</p></div><div className="stack-showcase"><div className="skill-groups">{skillGroups.map((group) => <div className={`skill-group ${group.label === stackTabs.find((tab) => tab.label === activeStack)?.group ? "is-highlighted" : "is-muted"}`} key={group.label}><h3>{group.label}</h3><div className="skill-tags">{group.items.map((skill) => <span className={featuredSkills.has(skill) ? "featured" : ""} key={skill}>{skill}</span>)}</div></div>)}</div></div><div className="stats"><div><strong>AI</strong><span>INTELLIGENT SYSTEMS</span></div><div><strong>ML</strong><span>PREDICTIVE MODELS</span></div><div><strong>WEB</strong><span>PRODUCT EXPERIENCES</span></div></div></div></section>

        <Testimonials />

        <section className="contact section" id="contact"><p className="eyebrow">07 — LET&apos;S BUILD</p><div className="contact-heading"><h2>HAVE A<br /><em>PROJECT?</em></h2><ArrowUpRight size={70} strokeWidth={1} /></div><form className="contact-form" onSubmit={handleContactSubmit}><div className="contact-form-grid"><label><span>01 — NAME</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>02 — EMAIL</span><input name="email" type="email" placeholder="you@example.com" required /></label><label><span>03 — COMPANY / ORGANISATION</span><input name="organization" type="text" placeholder="Optional" /></label><label><span>04 — PROJECT TYPE</span><select name="projectType" defaultValue=""><option value="" disabled>AI / ML / Web / Other</option><option>AI / ML</option><option>Web</option><option>Data</option><option>Other</option></select></label></div><label className="contact-details-field"><span>05 — PROJECT DETAILS</span><textarea name="message" rows={4} placeholder="Tell me what you are building, what you need, and where you are right now." required /></label><div className="contact-form-footer"><p>OPEN FOR FREELANCE · COLLABORATIONS · SELECTED OPPORTUNITIES</p><button className="contact-submit" type="submit">SEND INQUIRY <ArrowUpRight size={17} /></button></div></form></section>
        <section className="contact section" id="contact"><p className="eyebrow">07 — LET&apos;S BUILD</p><div className="contact-heading"><h2>HAVE A<br /><em>PROJECT?</em></h2><ArrowUpRight size={70} strokeWidth={1} /></div><form className="contact-form" onSubmit={handleContactSubmit}><div className="contact-form-grid"><label><span>01 — NAME</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>02 — EMAIL</span><input name="email" type="email" placeholder="you@example.com" required /></label><label><span>03 — COMPANY / ORGANISATION</span><input name="organization" type="text" placeholder="Optional" /></label><label><span>04 — PROJECT TYPE</span><select name="projectType" defaultValue=""><option value="" disabled>AI / ML / Web / Other</option><option>AI / ML</option><option>Web</option><option>Data</option><option>Other</option></select></label></div><label className="contact-details-field"><span>05 — PROJECT DETAILS</span><textarea name="message" rows={4} placeholder="Tell me what you are building, what you need, and where you are right now." required /></label><div className="contact-form-footer"><p>OPEN FOR FREELANCE · COLLABORATIONS · SELECTED OPPORTUNITIES</p><div className="contact-submit-row"><button className="contact-submit" type="submit" disabled={contactStatus === "sending"}>{contactStatus === "sending" ? "SENDING..." : "SEND INQUIRY"} <ArrowUpRight size={17} /></button>{contactStatus === "sent" && <span className="contact-form-status">MESSAGE SENT</span>}{contactStatus === "error" && <span className="contact-form-status contact-form-status--error">{contactError}</span>}</div></div></form></section>
      </main>
      <ConnectSection />
      <SiteFooter />
    </>
  );
}
