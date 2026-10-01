"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/#services" },
  { label: "WORK", href: "/works" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

export default function BlogPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-nav about-nav blog-nav">
        <Link href="/" className="brand" aria-label="Deepika S home">DS<span>.</span></Link>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => <Link className={item.label === "BLOG" ? "blog-nav-active" : ""} key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<sup>↗</sup></Link>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main className="blog-page">
        <section className="blog-intro" aria-labelledby="blog-title">
          <p className="eyebrow">05 — BLOG</p>
          <div className="blog-grid">
            <motion.div className="blog-heading-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.76, 0, .24, 1] }}>
              <h1 id="blog-title">NOT<br /><em>WRITTEN</em><br />YET<span>.</span></h1>
              <p className="blog-note">Currently collecting ideas.</p>
            </motion.div>
            <motion.div className="blog-copy" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15, duration: .7 }}>
              <p className="blog-lede">A small space for things I&apos;m learning, building, breaking, and figuring out.</p>
              <p>I&apos;m working on putting together notes about AI, machine learning, development, design, and the things I discover along the way. The first posts are on their way.</p>
            </motion.div>
            <motion.div className="blog-art" aria-hidden="true" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: 1.1 }}>
              <span className="blog-art-word">SOON</span>
              <i /><i /><i />
            </motion.div>
          </div>
          <div className="blog-actions"><Link className="text-action" href="/"><ArrowLeft size={16} /> BACK TO HOME</Link><Link className="text-action text-action--primary" href="/works">EXPLORE MY WORK <ArrowUpRight size={16} /></Link></div>
        </section>
      </main>
      <p className="blog-footer-note">More thoughts soon.</p>
    </>
  );
}
