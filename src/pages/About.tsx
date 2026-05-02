import { motion, useReducedMotion } from 'motion/react';
import { ROUTE_BG_CROSSFADE_S } from '../routeShell';

const designPrinciples = [
  {
    title: 'Extreme analogising',
    body: 'I can’t help but see the world through analogy. Everything reminds me of something else, whether that’s comparing content structuring to video compression, or LLM distillation to a plinko game. This has especially been a boon when communicating, especially complex concepts that need to be understood intuitively.',
  },
  {
    title: 'Designing by building',
    body: 'I started my design journey with industrial design, so my default mindset is to never trust a design until I feel the real thing in my hands. In the physical world, this meant raw materials and real forms, but in the digital world, this means building code prototypes, using real (or realistic) data, and seeing designs on target devices, not as a discrete step, but deeply embedded in my process. Figma outputs screenshots, not software.',
  },
  {
    title: 'Systems by default',
    body: 'When faced with ambiguity, I habitually create systems to corral the data that I do have, and leave spaces for the pieces I don’t. This helps me see gaps in knowledge, connect concepts, and separate concerns effectively.',
  },
];

const spring = { type: 'spring' as const, duration: 0.7, bounce: 0 };

const TIMING = {
  name: 0.2,
  intro: 0.4,
  principlesStart: 0.55,
  principlesStagger: 0.08,
} as const;

export default function About() {
  const reduceMotion = useReducedMotion();
  /** Wait for the route shell to finish warm → black (see `RouteBackground` / `ROUTE_BG_CROSSFADE_S`). */
  const late = (seconds: number) =>
    reduceMotion ? 0 : ROUTE_BG_CROSSFADE_S + seconds;

  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: 'blur(12px)', y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  return (
    <main
      data-nav-theme="dark"
      className="min-h-screen overflow-hidden px-10 pb-28 text-[#e5e1c3] md:pb-40 lg:px-20 2xl:px-page-edge-2xl"
    >
      <section className="relative mx-auto flex min-h-[830px] w-full max-w-screen-2xl flex-col items-center pt-44 md:min-h-[1180px] md:pt-44 xl:min-h-[1360px] xl:pt-[272px]">
        <motion.h1
          className="relative z-0 text-balance bg-[linear-gradient(167deg,rgba(0,0,0,0)_24%,rgba(0,0,0,0.5)_74%),linear-gradient(90deg,#cdcab0,#cdcab0)] bg-clip-text py-[0.06em] text-center font-display text-[58px] leading-[1.06] text-transparent md:text-[104px] md:leading-[1.05] xl:text-[120px] xl:leading-[1.05]"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: late(TIMING.name) }}
        >
          Lalith Sanathi
        </motion.h1>

        <motion.div
          className="relative z-10 -mt-20 h-[600px] w-[610px] max-w-[130vw] md:-mt-30 md:h-[880px] md:w-[900px] xl:-mt-38 xl:h-[960px] xl:w-[980px]"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: late(0) }}
        >
          <img
            src="/images/about/profile.png"
            alt="Lalith Sanathi"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>
      </section>

      {/* <motion.section
        className="mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-x-8"
        initial={heroInitial}
        animate={heroAnimate}
        transition={{ ...spring, delay: late(TIMING.intro) }}
      >
        <p className="col-span-12 max-w-[555px] bg-[linear-gradient(171deg,rgba(0,0,0,0)_24%,rgba(0,0,0,0.2)_74%),linear-gradient(90deg,#e5e1c3,#e5e1c3)] bg-clip-text text-[28px] leading-9 tracking-[-0.01em] text-transparent md:col-span-8 md:text-[32px] md:leading-10 xl:col-span-5">
          I’m a London based designer building expressive, AI-native products.
        </p>

        <div className="col-span-12 mt-20 grid grid-cols-6 gap-2 md:mt-24 xl:gap-3">
          <div className="col-span-3 h-[180px] rounded-2xl bg-[#1c1c1c] md:col-span-2 md:h-[336px]" />
          <div className="col-span-3 h-[180px] rounded-2xl bg-[#211718] md:col-span-3 md:h-[336px]" />
          <div className="col-span-6 h-[180px] rounded-2xl bg-[#1c1c1c] opacity-60 md:col-span-1 md:h-[336px]" />
          <div className="col-span-6 h-[220px] overflow-hidden rounded-2xl bg-[#eeeeee] shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:col-span-4 md:h-[336px]">
            <img
              src="/images/about/design-system-flow.png"
              alt="Design system prototyping flow"
              className="h-full w-full scale-125 object-cover object-center blur-[1px]"
            />
          </div>
          <div className="col-span-6 h-[220px] rounded-2xl bg-[#1c1c1c] opacity-80 md:col-span-2 md:h-[336px]" />
        </div>
      </motion.section> */}

      <section className="mx-auto mt-28 grid w-full max-w-screen-2xl grid-cols-12 gap-x-8 gap-y-16 md:mt-40 xl:mt-56">
        <motion.h2
          className="col-span-12 bg-[linear-gradient(172deg,rgba(0,0,0,0)_24%,rgba(0,0,0,0.2)_74%),linear-gradient(90deg,#e5e1c3,#e5e1c3)] bg-clip-text py-[0.08em] text-[28px] leading-[1.35] tracking-[-0.01em] text-transparent md:col-span-4 md:text-[32px] md:leading-[1.33] xl:col-span-3 xl:col-start-2"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: late(TIMING.principlesStart) }}
        >
          The way I design
        </motion.h2>

        <div className="col-span-12 flex flex-col gap-28 md:col-span-8 md:col-start-6 xl:col-start-6 xl:col-span-6 xl:gap-[200px]">
          {designPrinciples.map((principle, i) => (
            <motion.article
              key={principle.title}
              initial={heroInitial}
              animate={heroAnimate}
              transition={{
                ...spring,
                delay: late(
                  TIMING.principlesStart + TIMING.principlesStagger * (i + 1),
                ),
              }}
              className="flex flex-col gap-8"
            >
              <h3 className="bg-[linear-gradient(173deg,rgba(0,0,0,0)_24%,rgba(0,0,0,0.3)_74%),linear-gradient(90deg,#e5e1c3,#e5e1c3)] bg-clip-text py-[0.08em] text-[48px] font-extralight leading-[1.2] text-transparent md:text-[64px] md:leading-[1.18]">
                {principle.title}
              </h3>
              <p className="text-xl font-medium leading-7 text-[#e5e1c3]/50">
                {principle.body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
