import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { designs } from "../data/designs";
import { useDevice } from "../hooks/useDevice";

const ease = [0.25, 0.1, 0, 1];

function DesignCard({ design, index, skipEffects, onOpen }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30, mass: 0.5 });
  const shine = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`
  );

  const handleMouseMove = (e) => {
    if (skipEffects) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(design)}
      initial={{ opacity: 0, y: skipEffects ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: skipEffects ? 0.4 : 0.8, delay: skipEffects ? 0 : index * 0.1, ease }}
      className="group text-left"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={skipEffects ? {} : { rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-line bg-surface p-8 flex items-center justify-center shadow-[0_2px_24px_rgba(34,29,21,0.06)] group-hover:shadow-[0_20px_48px_rgba(34,29,21,0.13)] transition-shadow duration-500"
      >
        <img
          src={design.image}
          alt={design.alt}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          loading="lazy"
        />

        {!skipEffects && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: shine }} />
        )}

        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/45 transition-colors duration-400 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 flex items-center gap-2 text-white text-[13px] font-medium tracking-[-0.01em] border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            View full size
          </span>
        </div>
      </motion.div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[15px] font-semibold text-ink tracking-[-0.01em]">
          {design.title}
        </h3>
        <span className="shrink-0 text-[11px] font-mono uppercase tracking-[0.05em] text-ink-3">
          {design.tag}
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({ design, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease }}
        className="relative max-w-[720px] w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={design.image}
          alt={design.alt}
          className="w-full h-full object-contain rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-canvas ring-1 ring-line flex items-center justify-center text-ink hover:text-accent transition-colors duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function DesignWork() {
  const { isTouch, reducedMotion } = useDevice();
  const skipEffects = isTouch || reducedMotion;
  const [active, setActive] = useState(null);

  return (
    <section id="design" className="relative bg-canvas section-fade-bottom">
      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 0.8, ease }}
          className="text-[12px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-4"
        >
          Design Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: skipEffects ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 1, delay: skipEffects ? 0 : 0.1, ease }}
          className="font-display text-[32px] sm:text-[40px] md:text-[56px] font-bold text-ink tracking-[-0.02em] leading-[1.08] mb-20 md:mb-28"
        >
          Brand and
          <br />
          campaign creative.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
          {designs.map((design, i) => (
            <DesignCard
              key={design.id}
              design={design}
              index={i}
              skipEffects={skipEffects}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Lightbox design={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
