import { Launch } from "@carbon/icons-react";
import { motion, useReducedMotion } from "motion/react";
import Container from "../../components/Container";
import { EXIT_FADE_DURATION_S, useExitFade } from "../../hooks/useExitFade";
const IMG = "/images/projects/malted-pulse";

export default function MaltedPulse() {
  const reduceMotion = useReducedMotion();
  const isExiting = useExitFade();
  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: "blur(12px)", y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: "blur(0px)", y: 0 };

  const spring = {
    type: "spring" as const,
    duration: 0.7,
    bounce: 0,
  };

  return (
    <motion.main
      animate={reduceMotion ? undefined : { opacity: isExiting ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_DURATION_S, ease: [0.2, 0, 0, 1] }}
      className="pb-40">
      <section className="bg-gray-warm-200 px-10 pb-16 pt-44 lg:px-20 md:pt-36 xl:pt-44 2xl:pt-72 [@media(min-width:1280px)_and_(pointer:coarse)]:pt-52! 2xl:px-page-edge-2xl">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
          <motion.h1
            className="col-span-12 mb-16 font-display text-[48px] leading-[64px]"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.2 }}
          >
            Malted Pulse
          </motion.h1>

          <motion.div
            className="col-span-12 flex flex-col gap-7 lg:col-span-3 lg:col-start-1"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.35 }}
          >
            {[
              { label: "Company", value: "Malted" },
              { label: "Timeframe", value: "Jul 2025 — Present" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xl font-medium text-black/40">{item.label}</p>
                <p className="mt-1 text-xl font-medium uppercase text-black/60">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="col-span-12 mt-12 text-xl text-stone-600 lg:col-span-8 lg:col-start-5 lg:mt-0"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.5 }}
          >
            I designed several key experiences and patterns on Malted&apos;s
            core product, Pulse. I played a key role in shaping it from early
            concept to a platform clients are paying to use, including
            designing cluster-based data navigation — one of the
            product&apos;s central interaction paradigms — and a configurable
            data explorer, establishing foundational patterns used across
            multiple contexts.
          </motion.p>

          <motion.div
            className="col-span-12 mt-12 lg:col-span-7 lg:col-start-5"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.65 }}
          >
            <a
              href="https://www.malted.ai/pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 border-b border-stone-800/30 pb-2 text-2xl uppercase text-stone-800 hover:border-stone-900/50 hover:text-stone-900"
            >
              Pulse is live!
              <Launch size={28} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Hero image ── */}
      <Container variant="full" className="mt-0">
        <motion.div
          className="aspect-[3/2] overflow-hidden bg-[#d1d0d0]"
          style={{ borderRadius: 16 }}
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: 0.8 }}
        >
          <img
            src={`${IMG}/hero.png`}
            alt="Pulse platform interface overview"
            className="size-full object-cover"
          />
        </motion.div>
      </Container>

      <Container variant="full" className="mt-8">
        <img
          src={`${IMG}/outcome-reporting.jpg`}
          alt="Pulse outcome reporting: dashboards and data views for case outcomes"
          className="w-full rounded-2xl"
        />
      </Container>

      <Container variant="full" className="mt-8">
        <img
          src={`${IMG}/dashboard.jpg`}
          alt="Pulse dashboard"
          className="w-full rounded-2xl"
        />
      </Container>

      <Container variant="full" className="mt-8">
        <img
          src={`${IMG}/component-work.jpg`}
          alt="Component library and UI patterns for Pulse in Figma"
          className="w-full rounded-2xl"
        />
      </Container>
    </motion.main>
  );
}
