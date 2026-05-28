import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/projects";
import MagneticButton from "./MagneticButton";
import { useDevice } from "../hooks/useDevice";

const ease = [0.25, 0.1, 0, 1];

function ProjectCard({ project, index, skipEffects }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    skipEffects ? [1, 1] : [1.1, 1]
  );

  // 3D tilt — always declared (hooks can't be conditional), applied only when effects are on
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

  const displayUrl = project.liveUrl === "#"
    ? "github.com"
    : project.liveUrl.replace("https://", "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: skipEffects ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: skipEffects ? 0.4 : 0.9, delay: skipEffects ? 0 : index * 0.1, ease }}
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {/* Thumbnail — clean editorial frame, no browser chrome */}
        <div className="mb-6" style={{ perspective: "1200px" }}>
          <motion.div
            style={skipEffects ? {} : { rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="rounded-2xl overflow-hidden ring-1 ring-line shadow-[0_2px_24px_rgba(34,29,21,0.06)] group-hover:shadow-[0_20px_48px_rgba(34,29,21,0.13)] transition-shadow duration-500"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.div style={{ scale: imgScale }} className="w-full h-full">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </motion.div>

              {!skipEffects && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: shine }}
                />
              )}

              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-400 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 flex items-center gap-2 text-white text-[13px] font-medium tracking-[-0.01em] border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  Visit site →
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] font-mono text-ink-3 mb-2 tracking-[0.02em]">{displayUrl}</p>
          <h3 className="font-display text-[19px] font-semibold text-ink tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-[15px] text-ink-2 leading-[1.6] max-w-[420px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {project.tags.map((tag, i) => (
              <span key={tag} className="text-[12px] text-ink-2/70">
                {tag}
                {i < project.tags.length - 1 && (
                  <span className="ml-3 text-line-mid">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const { isTouch, reducedMotion } = useDevice();
  const skipEffects = isTouch || reducedMotion;

  const dividerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: dividerRef,
    offset: ["start end", "start 0.3"],
  });
  const lineWidth = useTransform(
    scrollYProgress,
    [0, 1],
    skipEffects ? ["100%", "100%"] : ["0%", "100%"]
  );

  return (
    <section id="projects" className="relative bg-canvas section-fade-bottom">
      {/* Animated divider */}
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          ref={dividerRef}
          style={{ width: lineWidth }}
          className="h-[1px] bg-line"
        />
      </div>

      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 0.8, ease }}
          className="text-[12px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-4"
        >
          Featured Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: skipEffects ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 1, delay: skipEffects ? 0 : 0.1, ease }}
          className="font-display text-[32px] sm:text-[40px] md:text-[56px] font-bold text-ink tracking-[-0.02em] leading-[1.08] mb-20 md:mb-28"
        >
          Things I&apos;ve built
          <br />
          and shipped.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20 md:gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} skipEffects={skipEffects} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: skipEffects ? 0.3 : 0.8, delay: skipEffects ? 0 : 0.3, ease }}
          className="text-center mt-20"
        >
          <MagneticButton
            href="https://github.com/DillyBoy08"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-[44px] px-7 rounded-full text-[13px] font-medium text-ink-2 border border-line hover:border-accent hover:text-ink transition-colors duration-300"
          >
            More on GitHub &rarr;
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
