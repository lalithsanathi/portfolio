import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

interface ProjectSectionProps {
  heading: string;
  description: string;
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};

const staticVariants: Variants = { hidden: {}, visible: {} };

export default function ProjectSection({
  heading,
  description,
  leftColumn,
  rightColumn,
}: ProjectSectionProps) {
  const reduceMotion = useReducedMotion();
  const container = reduceMotion ? staticVariants : containerVariants;
  const item = reduceMotion ? staticVariants : itemVariants;

  const leftCards = Children.toArray(leftColumn);
  const rightCards = Children.toArray(rightColumn);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={container}
    >
      <motion.h2
        variants={item}
        className="text-2xl font-semibold uppercase text-balance"
      >
        {heading}
      </motion.h2>
      <motion.p
        variants={item}
        className="mt-4 max-w-[640px] text-xl font-regular text-pretty"
      >
        {description}
      </motion.p>
      <div className="mt-10 flex max-w-[968px] gap-2">
        <div className="flex flex-1 flex-col gap-2">
          {leftCards.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {rightCards.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
