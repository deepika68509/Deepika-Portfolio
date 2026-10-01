"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ConnectSection from "@/components/ConnectSection";
import SiteFooter from "@/components/SiteFooter";
import { projects } from "@/lib/projects";
import { webProjects } from "@/lib/webProjects";

type WorksTab = "ai-data" | "replo-web";
type WorksProject = (typeof projects)[number] | (typeof webProjects)[number];

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/#services" },
  { label: "WORK", href: "/works" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

function WebThumbnailPlaceholder({ project }: { project: WorksProject }) {
  const imageSlot = "image" in project ? project.image : "";

  return <div className="project-preview works-web-placeholder" aria-label={`${project.title} thumbnail placeholder`} data-image-slot={imageSlot}>{imageSlot && <img className="works-placeholder-image" src={imageSlot} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />}<i /><i /><i /></div>;
}

function ProjectCard({ project, web }: { project: WorksProject; web: boolean }) {
  return (
    <motion.article className="project-card" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
      <div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-category">{project.category}</span></div>
      {web && <WebThumbnailPlaceholder project={project} />}
      <div className="project-card-body"><h3>{project.title}</h3><p>{project.description}</p></div>
      <div className="project-card-bottom"><span>{project.stack}</span><div className="project-links">{"github" in project && <a href={project.github} target={project.github !== "#" ? "_blank" : undefined} rel={project.github !== "#" ? "noreferrer" : undefined} aria-label={`${project.title} GitHub`}>VIEW PROJECT <ArrowUpRight size={15} /></a>}<a href={project.demo} target={project.demo !== "#" ? "_blank" : undefined} rel={project.demo !== "#" ? "noreferrer" : undefined} aria-label={`${project.title} live demo`}>LIVE <ArrowUpRight size={15} /></a></div></div>
    </motion.article>
  );
}

export default function WorksPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<WorksTab>("ai-data");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "replo-web") setActiveTab("replo-web");
  }, []);

  const selectTab = (tab: WorksTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `/works#${tab}`);
  };

  const isWeb = activeTab === "replo-web";
  const visibleProjects = isWeb ? webProjects : projects;

  return (
    <>
      <header className="site-nav about-nav works-nav">
        <Link href="/" className="brand" aria-label="Deepika S home">DS<span>.</span></Link>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => <Link className={item.label === "WORK" ? "works-nav-active" : ""} key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<sup>↗</sup></Link>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main className="works-page">
        <section className="works-intro">
          <p className="eyebrow">03 — WORK</p>
          <div className="works-intro-grid"><h1>PROJECTS<span>.</span></h1><p>A collection of things I&apos;ve built across artificial intelligence, machine learning, data, web development, and e-commerce.</p></div>
        </section>
        <section className="works-archive" aria-label="Project archive">
          <div className="works-tabs" role="tablist" aria-label="Project categories">
            <button className={activeTab === "ai-data" ? "works-tab is-active" : "works-tab"} onClick={() => selectTab("ai-data")} role="tab" aria-selected={activeTab === "ai-data"}>AI / ML + DATA</button>
            <button className={activeTab === "replo-web" ? "works-tab is-active" : "works-tab"} onClick={() => selectTab("replo-web")} role="tab" aria-selected={activeTab === "replo-web"}>REPLO / WEB</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div className="works-grid" key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }}>
              {visibleProjects.map((project) => <ProjectCard key={project.number} project={project} web={isWeb} />)}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <ConnectSection />
      <SiteFooter />
    </>
  );
}
