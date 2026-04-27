import { motion, useReducedMotion } from 'motion/react';

export default function NationalGridIntro() {
  const reduceMotion = useReducedMotion();
  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: 'blur(12px)', y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  const spring = {
    type: 'spring' as const,
    duration: 0.7,
    bounce: 0,
  };

  return (
    <main className="min-h-screen bg-gray-warm-200 px-6 pb-48 pt-48 md:px-14 md:pt-60 xl:px-20 xl:pt-72 2xl:px-0">
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
        <motion.h1
          className="col-span-12 mb-16 font-display text-[64px] leading-[80px]"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: 0.2 }}
        >
          Designing a new energy grid balancing platform for the UK
        </motion.h1>

        <motion.div
          className="col-span-12 flex flex-col gap-7 lg:col-span-3 lg:col-start-1"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: 0.35 }}
        >
          {[
            { label: 'Company', value: 'IBM / National Grid' },
            { label: 'Timeframe', value: 'Aug 2022 — Feb 2025' },
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
          National Grid&apos;s balancing engineers manage the country&apos;s
          electricity supply in real time. The decades-old software they use
          couldn&apos;t support the massive complexity of the UK&apos;s net-zero
          goals. I joined the project team to lead the design system, but grew
          into a cross-disciplinary role spanning design strategy, Figma tooling,
          front-end dev, and designer and developer mentorship, sitting at the
          intersection of every gap between design intent and delivered product,
          and enabling us to successfully ship our new tool to very high praise
          from users and leadership alike. The platform is currently being used
          to balance the UK grid.
        </motion.p>

        <motion.div
          className="col-span-12 mb-12 mt-12 flex flex-wrap gap-x-20 gap-y-12 lg:col-span-7 lg:col-start-5"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ ...spring, delay: 0.65 }}
        >
          {[
            { value: '75%', label: 'fewer design-match defects' },
            { value: 'Highest NPS', label: 'across IBM UK & Ireland' },
            { value: '2x', label: 'design-to-output speed' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <p className="text-3xl">{stat.value}</p>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
