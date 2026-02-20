import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/projects";
import MagneticButton from "./MagneticButton";
import { useDevice } from "../hooks/useDevice";

const ease = [0.25, 0.1, 0, 1];

function ProjectCard({ project, index, skipEffects }) {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    skipEffects ? [1, 1] : [1.1, 1]
  );

  const inner = project.thumbnail && !imgError ? (
    <img
      src={project.thumbnail}
      alt={project.title}
      onError={() => setImgError(true)}
      className="w-full h-full object-cover object-top"
    />
  ) : (
    <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
  );

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
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-7 shadow-[0_2px_20px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.13)] transition-shadow duration-500">
          {/* Image with subtle scale on scroll */}
          <motion.div style={{ scale: imgScale }} className="w-full h-full">
            {inner}
          </motion.div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#1d1d1f]/0 group-hover:bg-[#1d1d1f]/50 transition-colors duration-400 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 flex items-center gap-2 text-white text-[14px] font-medium tracking-[-0.01em] border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              Visit site <FiArrowUpRight className="text-[15px]" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-[19px] font-semibold text-[#1d1d1f] tracking-[-0.015em] group-hover:text-[#0071e3] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-[15px] text-[#86868b] leading-[1.55] max-w-[420px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {project.tags.map((tag, i) => (
              <span key={tag} className="text-[12px] text-[#86868b]/70">
                {tag}
                {i < project.tags.length - 1 && (
                  <span className="ml-3 text-[#d2d2d7]">/</span>
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
    <section id="projects" className="relative bg-[#fafafa] section-fade-bottom">
      {/* Animated divider */}
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          ref={dividerRef}
          style={{ width: lineWidth }}
          className="h-[1px] bg-[#d2d2d7]"
        />
      </div>

      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 0.8, ease }}
          className="text-[12px] font-semibold text-[#86868b] uppercase tracking-[0.08em] mb-4"
        >
          Featured Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: skipEffects ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 1, delay: skipEffects ? 0 : 0.1, ease }}
          className="text-[32px] sm:text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] mb-20 md:mb-28"
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
            className="inline-flex items-center justify-center h-[44px] px-7 rounded-full text-[13px] font-medium text-[#86868b] border border-[#d2d2d7] hover:border-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
          >
            More on GitHub &rarr;
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
