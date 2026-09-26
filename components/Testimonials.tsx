"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const testimonials = [
  { quote: "Working with Deepika was a great experience. She understood our requirements quickly and delivered a clean, responsive website that matched the design perfectly. Her attention to detail, communication, and ability to bring ideas to life really stood out. I’d definitely recommend working with her.", name: "Josh - Merlin Pets", role: "Client" },
  { quote: "I really appreciate your cooperation and the way you always responded immediately whenever I reached out. You were very flexible with all of my requirements and, at the same time, contributed your own valuable ideas to improve the project. I’m very happy that we were able to complete the project within the timeline. Thank you for the excellent work!", name: "Reshma - Doowol", role: "CLIENT" },
  { quote: "Working with Deepika has been a great experience. She was always cooperative, responsive, and open to understanding the requirements. She brought her own ideas and suggestions to the project, which helped improve the overall outcome. I really appreciated her dedication, flexibility, and commitment to delivering quality work within the timeline.", name: "Ambika - SheisTechie", role: "COLLABORATOR" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const activeIndex = active % testimonials.length;

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="testimonials section-dark" id="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-inner">
        <p className="eyebrow eyebrow-light">06 — TESTIMONIALS</p>
        <div className="testimonials-heading"><h2 id="testimonials-title">GOOD<br /><em>COMPANY.</em></h2><p>Some words from the people who have seen the work up close.</p></div>
        <div className="testimonial-layout">
          <div className="testimonial-video-wrap">
            <video className="testimonial-video" controls playsInline preload="metadata">
              <source src="/assets/josh-testimonial.mp4" type="video/mp4" />
              Your browser does not support the testimonial video.
            </video>
            <span className="testimonial-video-label">VIDEO TESTIMONIAL / JOSH</span>
          </div>
          <div className="testimonial-carousel" aria-live="polite">
            <div className="testimonial-track" style={{ "--active-slide": activeIndex } as CSSProperties}>
              {testimonials.map((item) => <blockquote className="testimonial-item" key={`${item.name}-${item.quote}`}><p>&ldquo;{item.quote}&rdquo;</p><footer><strong>{item.name}</strong><span>{item.role}</span></footer></blockquote>)}
            </div>
            <div className="testimonial-controls"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span><button onClick={() => setActive((current) => (current + 1) % testimonials.length)} aria-label="Show next testimonial"><ArrowUpRight size={18} /></button></div>
          </div>
        </div>
      </div>
    </section>
  );
}
