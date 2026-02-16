import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDevice } from "../hooks/useDevice";

const spring = { stiffness: 350, damping: 15, mass: 0.2 };

export default function MagneticButton({ children, className = "", href, ...props }) {
  const ref = useRef(null);
  const { isTouch } = useDevice();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMouse = (e) => {
    if (isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // On touch devices, render a plain element — no spring physics overhead
  if (isTouch) {
    const Tag = href ? "a" : "button";
    return (
      <Tag ref={ref} href={href} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}
