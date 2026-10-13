"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* ── Typewriter effect ─────────────────────────────────── */
const DEFINE = "DEFINE";
const SUBTITLE = "Your Moment.";

const letterContainer = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.07,
      delayChildren: delay,
    },
  }),
};

const letterVariant = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
    },
  },
};

/* ── Cursor blink ──────────────────────────────────────── */
const cursorVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear" as const,
      times: [0, 0.1, 0.5, 0.6],
      delay: 1.6,
    },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Define your moment"
      className="hidden w-full md:block"
    >
      <div className="relative isolate aspect-[3/1] min-h-[360px] w-full overflow-hidden rounded-[24px] bg-[#fb900e]">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,195,50,0.65),transparent_55%)]" />

        {/* Typewriter headline */}
        <div className="absolute left-[4.2%] top-1/2 z-20 w-[58%] -translate-y-1/2">
          <h1 className="font-black leading-[0.88] tracking-[-0.065em] text-[#111111]">
            {/* "DEFINE" */}
            <motion.span
              className="block whitespace-nowrap text-[clamp(4rem,7.5vw,9.5rem)]"
              variants={letterContainer}
              custom={0.1}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              {DEFINE.split("").map((char, i) => (
                <motion.span
                  key={`d-${i}`}
                  variants={letterVariant}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* "Your Moment." */}
            <motion.span
              className="mt-[0.12em] block whitespace-nowrap text-[clamp(2.5rem,5.1vw,6.4rem)] tracking-[-0.055em]"
              variants={letterContainer}
              custom={0.55}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              {SUBTITLE.split("").map((char, i) => (
                <motion.span
                  key={`s-${i}`}
                  variants={letterVariant}
                  className="inline-block"
                  style={{ width: char === " " ? "0.3em" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              {/* Blinking cursor */}
              <motion.span
                variants={cursorVariant}
                initial="hidden"
                animate="visible"
                className="ml-1 inline-block h-[0.85em] w-[0.06em] translate-y-[0.08em] bg-[#111111]"
              />
            </motion.span>
          </h1>
        </div>

        {/* Floating sneaker */}
        <motion.div
          className="absolute right-[5%] top-[4%] z-10 w-[45%]"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 40,
                  scale: 0.92,
                }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  y: [0, -10, 0],
                  scale: 1,
                }
          }
          transition={{
            opacity: { duration: 0.7, delay: 0.3 },
            scale: { duration: 0.9, delay: 0.3, ease: "easeOut" },
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            },
          }}
        >
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="https://res.cloudinary.com/dsnbjtkts/image/upload/v1791864317/1_cughkg.png"
              alt="Orange sneaker — define your moment"
              fill
              priority
              sizes="(min-width: 1280px) 576px, 45vw"
              className="object-contain drop-shadow-[0_24px_18px_rgba(0,0,0,0.22)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}