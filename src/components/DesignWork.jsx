import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { designs } from "../data/designs";
import { useDevice } from "../hooks/useDevice";

const ease = [0.25, 0.1, 0, 1];

function DesignCard({ design, index, skipEffects, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(design)}
      initial={{ opacity: 0, y: skipEffects ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: skipEffects ? 0.4 : 0.8, delay: skipEffects ? 0 : index * 0.08, ease }}
      className="group text-left rounded-2xl overflow-hidden ring-1 ring-line shadow-[0_2px_24px_rgba(34,29,21,0.06)] hover:shadow-[0_20px_48px_rgba(34,29,21,0.13)] transition-shadow duration-500"
    >
      <div
        className={`relative overflow-hidden ${
          design.orientation === "portrait" ? "aspect-[3/4]" : "aspect-square"
        }`}
      >
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-400 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 flex items-center gap-2 text-white text-[13px] font-medium tracking-[-0.01em] border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            View design
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[16px] font-semibold text-ink tracking-[-0.01em]">
          {design.title}
        </h3>
        <p className="mt-1.5 text-[13.5px] text-ink-2 leading-[1.5]">
          {design.description}
        </p>
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
          alt={design.title}
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
  const { reducedMotion } = useDevice();
  const [active, setActive] = useState(null);

  return (
    <section id="design" className="relative bg-canvas section-fade-bottom">
      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.3 : 0.8, ease }}
          className="text-[12px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-4"
        >
          Design Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.3 : 1, delay: reducedMotion ? 0 : 0.1, ease }}
          className="font-display text-[32px] sm:text-[40px] md:text-[56px] font-bold text-ink tracking-[-0.02em] leading-[1.08] mb-20 md:mb-28"
        >
          Brand and
          <br />
          campaign creative.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {designs.map((design, i) => (
            <DesignCard
              key={design.id}
              design={design}
              index={i}
              skipEffects={reducedMotion}
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
