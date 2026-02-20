import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiNextdotjs,
  SiPostgresql,
  SiExpress,
  SiBlender,
  SiClaude,
  SiCanva,
  SiAdobephotoshop,
  SiFigma,
  SiPython,
  SiCplusplus,
} from "react-icons/si";
import { useDevice } from "../hooks/useDevice";

const skills = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiExpress, name: "Express", color: "#000000" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiCplusplus, name: "C++", color: "#00599C" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiBlender, name: "Blender", color: "#E87D0D" },
  { icon: SiAdobephotoshop, name: "Photoshop", color: "#31A8FF" },
  { icon: SiCanva, name: "Canva", color: "#00C4CC" },
  { icon: SiClaude, name: "Claude AI", color: "#D97757" },
];

const ease = [0.25, 0.1, 0, 1];

function SkillCard({ tech, index, skipEffects }) {
  // On touch/reduced-motion: simple CSS-only card, no Framer overhead
  if (skipEffects) {
    return (
      <div className="flex flex-col items-center justify-center py-7 px-4 rounded-2xl bg-[#f5f5f7] cursor-default">
        <div className="mb-3">
          <tech.icon className="text-[28px]" style={{ color: tech.color }} />
        </div>
        <span className="text-[13px] font-medium text-[#1d1d1f] tracking-[-0.01em]">
          {tech.name}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col items-center justify-center py-7 px-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-[background-color,box-shadow] duration-500 cursor-default"
    >
      <div className="relative mb-3">
        <tech.icon className="text-[28px] text-[#c7c7cc] transition-[opacity,transform] duration-500 group-hover:opacity-0 group-hover:scale-90" />
        <tech.icon
          className="text-[28px] absolute inset-0 opacity-0 scale-110 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:scale-100"
          style={{ color: tech.color }}
        />
      </div>
      <span className="text-[13px] font-medium text-[#1d1d1f] tracking-[-0.01em]">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function About() {
  const { isTouch, reducedMotion } = useDevice();
  const skipEffects = isTouch || reducedMotion;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const lineWidth = useTransform(
    scrollYProgress,
    [0, 1],
    skipEffects ? ["100%", "100%"] : ["0%", "100%"]
  );

  return (
    <section id="about" className="relative bg-white section-fade-bottom-alt">
      {/* Animated divider */}
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          ref={ref}
          style={{ width: lineWidth }}
          className="h-[1px] bg-[#d2d2d7]"
        />
      </div>

      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        {/* Big statement */}
        <motion.h2
          initial={{ opacity: 0, y: skipEffects ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: skipEffects ? 0.3 : 1, ease }}
          className="text-[32px] sm:text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] max-w-[720px]"
        >
          I believe great software starts with clean code and thoughtful design.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: skipEffects ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: skipEffects ? 0.3 : 0.8, delay: skipEffects ? 0 : 0.2, ease }}
          className="mt-14 md:mt-20 grid md:grid-cols-2 gap-8 md:gap-20"
        >
          <p className="text-[17px] text-[#424245] leading-[1.7] tracking-[-0.005em]">
            I&apos;m a full-stack developer from South Africa with a passion
            for building end-to-end web applications, from polished,
            responsive frontends to robust, scalable backends.
          </p>
          <p className="text-[17px] text-[#424245] leading-[1.7] tracking-[-0.005em]">
            Whether it&apos;s a business website or a complex dashboard,
            I focus on writing maintainable code, optimising performance,
            and delivering experiences that genuinely feel seamless.
          </p>
        </motion.div>

        {/* Skills */}
        <div className="mt-24 md:mt-32">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: skipEffects ? 0.3 : 0.6, ease }}
            className="text-[12px] font-semibold text-[#86868b] uppercase tracking-[0.08em] mb-6"
          >
            Skills & Tools
          </motion.p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {skills.map((t, i) => (
              <SkillCard key={t.name} tech={t} index={i} skipEffects={skipEffects} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
