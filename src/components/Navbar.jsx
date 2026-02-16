import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // IntersectionObserver for active section — no scroll listener needed
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        <a
          href="#"
          className="text-[13px] font-semibold text-[#1d1d1f] tracking-[-0.01em] hover:opacity-60 transition-opacity duration-300"
        >
          Dylan Swart
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`link-underline text-[12px] transition-colors duration-300 ${
                  activeSection === link.id
                    ? "text-[#1d1d1f] font-medium"
                    : "text-[#424245] hover:text-[#1d1d1f]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-5 h-5 flex flex-col justify-center gap-[5px]"
          aria-label="Menu"
        >
          <span
            className={`block w-full h-[1.5px] bg-[#1d1d1f] transition-transform duration-300 origin-center ${
              open ? "rotate-45 translate-y-[3.25px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[1.5px] bg-[#1d1d1f] transition-transform duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[3.25px]" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-48" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 bg-white/95 border-t border-black/[0.04]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-[14px] ${
                activeSection === link.id
                  ? "text-[#1d1d1f] font-medium"
                  : "text-[#424245]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
