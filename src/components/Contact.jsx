import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useDevice } from "../hooks/useDevice";

const ease = [0.25, 0.1, 0, 1];

export default function Contact() {
  const { isTouch, reducedMotion } = useDevice();
  const skipEffects = isTouch || reducedMotion;
  const [status, setStatus] = useState("idle");

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

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Set timestamp at submit time, not render time
    const timeInput = formRef.current.querySelector('input[name="time"]');
    if (timeInput) timeInput.value = new Date().toLocaleString();

    emailjs
      .sendForm("service_9jq6o7w", "template_5ej0kab", formRef.current, {
        publicKey: "qgtoZVKB5i8uGPk6Q",
      })
      .then(() => {
        setStatus("sent");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 3000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      });
  };

  const inputClasses =
    "w-full bg-[#f5f5f7] rounded-xl px-5 py-4 text-[15px] text-[#1d1d1f] placeholder-[#86868b]/60 outline-none border border-transparent focus:border-[#0071e3] focus:bg-white transition-all duration-300";

  return (
    <section id="contact" className="bg-white">
      {/* Animated divider */}
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          ref={dividerRef}
          style={{ width: lineWidth }}
          className="h-[1px] bg-[#d2d2d7]"
        />
      </div>

      <div className="max-w-[980px] mx-auto px-6 py-32 md:py-44">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: skipEffects ? 0.3 : 0.8, ease }}
              className="text-[12px] font-semibold text-[#86868b] uppercase tracking-[0.08em] mb-4"
            >
              Get in Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: skipEffects ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: skipEffects ? 0.3 : 1, delay: skipEffects ? 0 : 0.1, ease }}
              className="text-[32px] sm:text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] mb-6"
            >
              Let&apos;s create
              <br />
              something great.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: skipEffects ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: skipEffects ? 0.3 : 0.8, delay: skipEffects ? 0 : 0.2, ease }}
              className="text-[17px] text-[#86868b] leading-[1.7] tracking-[-0.01em] max-w-[400px] mb-10"
            >
              Got a project in mind, or simply fancy a chat?
              Drop me a message, I&apos;d love to hear from you.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: skipEffects ? 0.3 : 0.8, delay: skipEffects ? 0 : 0.4, ease }}
              className="flex gap-8"
            >
              <a
                href="https://github.com/DillyBoy08"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dylan-lee-swart-53229125b/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: skipEffects ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: skipEffects ? 0.3 : 0.8, delay: skipEffects ? 0 : 0.3, ease }}
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="time" value="" />
            <input type="hidden" name="title" value="Portfolio Contact" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              aria-label="Your name"
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              aria-label="Your email address"
              className={inputClasses}
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              aria-label="Your message"
              rows={6}
              className={`${inputClasses} resize-none`}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 h-[48px] rounded-full bg-[#1d1d1f] text-white text-[14px] font-medium hover:bg-[#000] transition-colors duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message sent!"
                : status === "error"
                ? "Failed to send. Try again."
                : "Send message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
