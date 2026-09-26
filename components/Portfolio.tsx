"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import ConnectSection from "@/components/ConnectSection";
import Testimonials from "@/components/Testimonials";
import { siLangchain, siPandas, siPlotly, siPython, siReact, siThreedotjs } from "simple-icons";
import type { SimpleIcon } from "simple-icons";

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
const services = [
  { number: "01", title: "AI / ML SYSTEMS", copy: "Intelligent tools and practical machine-learning workflows built around real problems.", icon: siPython },
  { number: "02", title: "DATA SCIENCE", copy: "Exploration, modelling and clear insights from complex or messy datasets.", icon: siPandas },
  { number: "03", title: "RAG & LLM APPS", copy: "Grounded language experiences that connect useful information to thoughtful interfaces.", icon: siLangchain },
  { number: "04", title: "WEB DEVELOPMENT", copy: "Fast, accessible and considered web products built from idea to deployment.", icon: siReact },
  { number: "05", title: "CREATIVE DEVELOPMENT", copy: "Interactive digital experiences combining code, motion, 3D and visual direction.", icon: siThreedotjs },
  { number: "06", title: "DATA VISUALIZATION", copy: "Visual systems that make patterns, decisions and technical stories easier to understand.", icon: siPlotly },
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

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:deepika.shantappa@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(timer);
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
          <span className="scroll-note">SCROLL TO EXPLORE <ArrowDownRight size={15} /></span>
        </section>

        <div className="ticker" aria-label="Areas of expertise"><div className="ticker-track">{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT"].map((item) => <span key={item}><b />{item}</span>)}{["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE", "FULL STACK DEVELOPMENT"].map((item) => <span key={`repeat-${item}`}><b />{item}</span>)}</div></div>

        <motion.section className="about section" id="about" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <p className="eyebrow">02 — ABOUT</p><div className="about-content"><h2>ABOUT<br />ME<span>.</span></h2><div className="about-text"><p>Computer Science engineer focused on AI/ML, data science and modern web development. I enjoy going from messy data and a blank screen to something useful, measurable and beautiful.</p><span className="mono-note">A PRACTICAL MIND<br />WITH A VISUAL EDGE</span><a className="about-link" href="/about">ABOUT ME <ArrowUpRight size={17} /></a></div></div>
        </motion.section>

        <section className="services section" id="services">
          <div className="section-heading services-heading"><div><p className="eyebrow">03 — SERVICES</p><h2>WHAT I<br />BUILD<span>.</span></h2></div><p className="section-note">A flexible set of capabilities for intelligent products, useful systems and expressive digital experiences.</p></div>
          <div className="services-grid">{services.map((service, index) => <motion.article className="service-card" key={service.number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.06 }}><div className="service-card-top"><span>{service.number}</span><a className="service-arrow" href="#contact" aria-label={`Contact me about ${service.title}`}><ArrowUpRight size={20} /></a></div><div className="service-card-content"><ServiceLogo icon={service.icon} /><h3>{service.title}</h3><p>{service.copy}</p></div></motion.article>)}</div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading"><div><p className="eyebrow">04 — SELECTED WORK</p><h2>SELECTED<br />WORK<span>.</span></h2></div><div className="work-heading-actions"><p className="section-note">A selection of projects across AI/ML,<br />data science and software engineering.</p><a className="works-button" href="https://github.com/deepika68509/" target="_blank" rel="noreferrer">EXPLORE WORKS <ArrowUpRight size={17} /></a></div></div>
          <div className="work-cards">{projects.slice(0, 3).map((project, index) => <motion.article key={project.number} className="project-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.08 }}><div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-category">{project.category}</span></div><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-card-bottom"><span>{project.stack}</span><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>GH <ArrowUpRight size={15} /></a><a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>LIVE <ArrowUpRight size={15} /></a></div></div></motion.article>)}</div>
        </section>

        <section className="stack section-dark" id="stack"><div className="stack-inner"><p className="eyebrow eyebrow-light">05 — THE STACK</p><div className="stack-heading"><h2>THE<br />STACK<span>.</span></h2><p>The tools I use to turn ideas into intelligent, production-ready experiences.</p></div><div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.label}><h3>{group.label}</h3><div className="skill-tags">{group.items.map((skill) => <span className={featuredSkills.has(skill) ? "featured" : ""} key={skill}>{skill}</span>)}</div></div>)}</div><div className="stats"><div><strong>AI</strong><span>INTELLIGENT SYSTEMS</span></div><div><strong>ML</strong><span>PREDICTIVE MODELS</span></div><div><strong>WEB</strong><span>PRODUCT EXPERIENCES</span></div></div><div className="skill-map"><div className="map-center">AI</div><span className="map-node map-ml">ML</span><span className="map-node map-data">DATA</span><span className="map-node map-llm">LLMs</span><span className="map-node map-web">WEB</span><i className="map-line line-one" /><i className="map-line line-two" /><i className="map-line line-three" /><i className="map-line line-four" /></div></div></section>

        <Testimonials />

        <section className="contact section" id="contact"><p className="eyebrow">07 — LET&apos;S BUILD</p><div className="contact-heading"><h2>HAVE A<br /><em>PROJECT?</em></h2><ArrowUpRight size={70} strokeWidth={1} /></div><form className="contact-form" onSubmit={handleContactSubmit}><div className="contact-form-grid"><label><span>NAME</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>EMAIL</span><input name="email" type="email" placeholder="you@example.com" required /></label></div><label><span>PROJECT DETAILS</span><textarea name="message" rows={4} placeholder="Tell me what you are building" required /></label><button className="contact-submit" type="submit">SEND MESSAGE <ArrowUpRight size={17} /></button></form></section>
      </main>
      <ConnectSection />
      <footer><span>© 2026 Deepika S</span><span>AI · ML · DATA · WEB</span></footer>
    </>
  );
}
