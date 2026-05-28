import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useDevice } from "../hooks/useDevice";

function MouseGlow() {
  const ref = useRef(null);
  const { isTouch } = useDevice();

  useEffect(() => {
    if (isTouch) return;
    const el = ref.current;
    let rafId;

    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={ref}
        className="w-[600px] h-[600px] rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(181,98,61,0.04) 0%, transparent 70%)" }}
      />
    </div>
  );
}

const ease = [0.25, 0.1, 0, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 bg-canvas overflow-hidden"
    >
      {/* DS monogram — personal watermark, barely visible */}
      <div
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-extrabold"
          style={{
            fontSize: "clamp(160px, 28vw, 480px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(181,98,61,0.045)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >DS</span>
      </div>

      <MouseGlow />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[980px] w-full text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[15px] md:text-[17px] text-ink-2 font-medium tracking-[-0.01em] mb-6"
        >
          Full-Stack Developer &mdash; South Africa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.025em] leading-[1.02] mb-8 text-ink"
        >
          Crafting{" "}
          <span style={{ color: "#B5623D" }}>digital</span>
          <br />
          experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="text-[17px] md:text-[21px] text-ink-2 leading-[1.55] tracking-[-0.01em] max-w-[600px] mx-auto mb-10"
        >
          I design and build clean, responsive websites and applications that help businesses stand out online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#projects"
            className="group inline-flex items-center justify-center h-[48px] px-8 rounded-full bg-ink text-canvas text-[14px] font-medium hover:bg-[#2D2720] transition-colors duration-300 hover:shadow-[0_4px_20px_rgba(34,29,21,0.18)]"
          >
            View my work
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="inline-flex items-center justify-center h-[48px] px-8 rounded-full text-ink text-[14px] font-medium border border-line hover:border-accent transition-colors duration-300"
          >
            Get in touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-3 group">
          <span className="text-[10px] uppercase tracking-[0.15em] text-ink-2/50 group-hover:text-ink-2 transition-colors duration-300">
            Scroll
          </span>
          <motion.div
            animate={{ height: [16, 28, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-[#86868b]/20"
          />
        </a>
      </motion.div>
    </section>
  );
}
