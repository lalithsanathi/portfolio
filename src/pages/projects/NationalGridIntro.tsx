import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import Container from "../../components/Container";
import { EXIT_FADE_DURATION_S, useExitFade } from "../../hooks/useExitFade";
const IMG = "/images/projects/national-grid";
const IMG_DS = "/images/projects/ibm-ng-ds";

const stats = [
  { value: "75%", label: "fewer design-match defects" },
  { value: "Highest NPS", label: "across IBM UK & Ireland" },
  { value: "2x", label: "design-to-output speed" },
];

const underlyingIssues = [
  {
    title: "Designers felt helpless",
    points: [
      "Designers saw long wait times, technical pushback they didn't understand, and a pattern of recurring mistakes.",
      "The gap between design intent and built output was wide, and the current process gave them no leverage to close it.",
    ],
  },
  {
    title: "Developers felt under-supported",
    points: [
      "Dev teams were offshore, working across timezone and language barriers, with insufficient experience for the complexity being asked of them.",
      "This made it hard to ask the right questions and build shared understanding, so decisions were short-sighted.",
    ],
  },
  {
    title: "Poor foundation → mess on top of mess",
    points: [
      "Each squad had their own set of ad hoc components, with heavy duplication, no standards, and tangled code.",
      "Developers spent ages just trying to understand the existing codebase before they could make any changes.",
    ],
  },
  {
    title: "Devs were building with blinders on",
    points: [
      "Developers were disconnected from product and design conversations, and had little visibility into the vision.",
      "Without that context, every component was built for its immediate use case and nothing beyond it — so naturally things kept breaking as requirements evolved.",
    ],
  },
];

const resultStats = [
  { value: "75% fewer", label: "design-match defects" },
  { value: "2x", label: "design-to-output speed" },
  { value: "Highest NPS", label: "for a project across IBM UK&I" },
  { value: "30% fewer", label: "edge case defects" },
];

const impactStats = [
  { value: "+283%", label: "jump in daily battery dispatch volume" },
  { value: "217 → 1,867", label: "increase in daily instructions" },
  {
    value: "£15 million/year",
    label: "projected consumer savings",
  },
  {
    value: "37,400 tons",
    label: (
      <>
        of CO<sub className="text-xs">2</sub> avoided since launch
      </>
    ),
  },
];

function BlackBand({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-black py-28 text-white lg:py-40">
      <Container>
        <div className="grid w-full grid-cols-12 gap-x-8">
          <div className="col-span-12 lg:col-span-9 lg:col-start-2">
            <p className="text-2xl font-semibold uppercase leading-8 text-[#ffb356]">
              {eyebrow}
            </p>
            <div className="mt-6 text-[32px] font-normal leading-[48px]">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TextBlock({
  title,
  children,
  className = "",
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {title ? <h2 className="text-3xl leading-[40px]">{title}</h2> : null}
      {children ? (
        <div className={title ? "mt-4" : undefined}>{children}</div>
      ) : null}
    </div>
  );
}

export default function NationalGridIntro() {
  const reduceMotion = useReducedMotion();
  const isExiting = useExitFade();
  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: "blur(12px)", y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: "blur(0px)", y: 0 };
  const spring = { type: "spring" as const, duration: 0.7, bounce: 0 };

  return (
    <motion.main
      animate={reduceMotion ? undefined : { opacity: isExiting ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_DURATION_S, ease: [0.2, 0, 0, 1] }}
      className="overflow-hidden bg-[#f1eaea] pb-40"
      data-lightbox>
      {/* ── Hero ── */}
      <section className="bg-gray-warm-200 px-10 pb-16 pt-44 md:pt-36 lg:px-20 xl:pt-44 2xl:px-page-edge-2xl 2xl:pt-72 [@media(min-width:1280px)_and_(pointer:coarse)]:pt-52!">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
          <motion.h1
            className="col-span-12 mb-16 font-display text-[48px] leading-[64px]"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.2 }}
          >
            Designing a new balancing platform for the UK energy grid
          </motion.h1>

          <motion.div
            className="col-span-12 flex flex-col gap-7 lg:col-span-3 lg:col-start-1"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.35 }}
          >
            {[
              { label: "Company", value: "IBM / National Grid" },
              { label: "Timeframe", value: "Aug 2022 — Feb 2025" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xl font-medium text-black/40">
                  {item.label}
                </p>
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
            couldn&apos;t support the massive complexity of the UK&apos;s
            net-zero goals. I joined the project team to lead the design system,
            but grew into a cross-disciplinary role spanning design strategy,
            Figma tooling, front-end dev, and designer and developer mentorship,
            sitting at the intersection of every gap between design intent and
            delivered product, and enabling us to successfully ship our new tool
            to very high praise from users and leadership alike. The platform is
            currently being used to balance the UK grid.
          </motion.p>

          <motion.div
            className="col-span-12 mb-12 mt-12 flex flex-wrap gap-x-20 gap-y-12 lg:col-span-8 lg:col-start-5"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.65 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex max-w-56 flex-col gap-1">
                <p className="text-3xl">{stat.value}</p>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
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
            alt="National Grid balancing platform interface"
            className="size-full object-cover"
          />
        </motion.div>
      </Container>

      {/* ── Context ── */}
      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock className="col-span-12 lg:col-span-7 lg:col-start-2">
            <p className="text-3xl leading-[40px] text-black/80">
              The UK&apos;s energy grid is managed in real time by a small group
              of balancing engineers.
            </p>
            <p className="mt-8 text-xl font-medium leading-7 text-black/60">
              They direct power across the country, keeping supply and demand in
              balance. When they make good decisions, the lights stay on. When
              they don&apos;t, the consequences ripple across the national
              infrastructure.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-16 overflow-hidden rounded-2xl">
            <img
              src={`${IMG}/context-monitors.png`}
              alt="Balancing engineers working at their multi-monitor stations"
              className="w-full object-cover"
            />
          </div>
        </div>
      </Container>

      {/* ── Old system ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 items-start gap-x-8">
          <img
            className="col-span-12 mt-0 rounded-2xl object-cover lg:col-span-5 lg:row-span-2 lg:mt-40 lg:h-[720px]"
            src={`${IMG_DS}/old-system-monitor.png`}
            alt="The legacy energy grid control system"
          />
          <div className="col-span-12 mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h2 className="text-3xl leading-[40px]">
              The software is decades old and about to buckle.
            </h2>
            <p className="mt-6 text-xl font-medium leading-7 text-black/60">
              The UK&apos;s net zero commitments mean the energy grid is
              undergoing a fundamental transformation &mdash; more renewable
              sources, more distributed generation, more units to manage, more
              complexity. The old system was already straining, and the load it
              bears is about to <em>skyrocket</em>.
            </p>
            <img
              className="mt-16 w-full rounded-2xl object-cover lg:h-[384px]"
              src={`${IMG_DS}/old-system-map.png`}
              alt="UK energy grid network map"
            />
          </div>
        </div>
      </Container>

      {/* ── IBM involvement ── */}
      <BlackBand eyebrow="The project">
        <p>
          IBM was rebuilding the platform from the ground up. I joined midway to
          lead the new design system, but I grew my role to span design
          strategy, Figma tooling, front-end dev, and mentorship.
        </p>
      </BlackBand>

      {/* ── The platform was broken ── */}
      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="The platform was dangerously broken."
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              On a platform where mistakes can cause blackouts, inconsistency
              goes beyond a minor annoyance, and becomes an actual danger.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-16 overflow-hidden rounded-2xl lg:col-span-10 lg:col-start-2">
            <img
              src={`${IMG_DS}/broken-ux.png`}
              alt="Examples of broken and inconsistent UI patterns"
              className="w-full"
            />
          </div>
        </div>
      </Container>

      {/* ── Underlying issues ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl leading-[40px] lg:col-span-8 lg:col-start-2">
            Uncovering underlying issues
          </h2>
          <div className="col-span-12 mt-16 grid gap-x-16 gap-y-14 lg:col-span-10 lg:col-start-2 lg:grid-cols-2">
            {underlyingIssues.map((issue) => (
              <div key={issue.title}>
                <h3 className="text-xl font-bold leading-7 text-black/80">
                  {issue.title}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-xl font-medium leading-7 text-black/60">
                  {issue.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* ── My goal ── */}
      <BlackBand eyebrow="My goal">
        <p>
          Accelerate the design and development loop, and systemically raise the
          experience quality level for the balancing engineers.
        </p>
      </BlackBand>

      {/* ── Radical refactor ── */}
      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="A radical refactor of our design components"
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              I refactored our design component architecture, making them more
              robust, more maintainable, and with far fewer pieces for the same
              or greater functionality.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-14 flex flex-col gap-10 lg:col-span-10 lg:col-start-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-black/40">
                Before
              </p>
              <img
                src={`${IMG}/refactor-components.png`}
                alt="Original design system with many duplicated atoms and components"
                className="w-full rounded-2xl"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-black/40">
                After
              </p>
              <img
                src={`${IMG}/refactor-reduction.png`}
                alt="Simplified design system with fewer, more robust components"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── Documentation ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock className="col-span-12 lg:col-span-7 lg:col-start-2">
            <h2 className="text-3xl leading-[40px]">
              Writing documentation <em>right</em>.
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-xl font-medium leading-7 text-black/60">
              <li>
                Our constraints meant that the first pass of design-to-dev on
                any ticket was critical.
              </li>
              <li>
                I designed and wrote new documentation for developer handoff to
                maximise clarity, and created new guidance and standards for
                other designers to do it too.
              </li>
              <li>I mentored designers to think like developers.</li>
            </ul>
          </TextBlock>
          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-12 items-start gap-4">
              <img
                src={`${IMG}/docs-1.png`}
                alt="Design documentation template"
                className="col-span-6 w-full rounded-2xl"
              />
              <img
                src={`${IMG}/docs-2.png`}
                alt="Design specification document"
                className="col-span-6 row-span-2 w-full rounded-2xl lg:col-span-6"
              />
              <img
                src={`${IMG}/docs-3.png`}
                alt="Component documentation guide"
                className="col-span-7 w-full rounded-2xl lg:col-span-6"
              />
              <img
                src={`${IMG}/docs-5.png`}
                alt="Developer handoff annotation"
                className="col-span-6 w-full rounded-2xl lg:col-span-4"
              />
              <img
                src={`${IMG}/docs-4.png`}
                alt="Design system documentation"
                className="col-span-5 w-full rounded-2xl lg:col-span-3"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── Deep dives ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="Deep dives with developers"
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              I embedded directly into the dev teams and made myself available in
              their timezone for questions, pair programming and code reviews. I
              also wrote reference implementations for trickier pieces of work.
            </p>
            <p className="mt-6 text-xl font-medium leading-7 text-black/60">
              Developers felt more supported and thus more motivated to raise the
              bar. Being in the trenches also gave me much more understanding of
              our codebase, and much more agency in pushing the boundaries of
              what we could build.
            </p>
          </TextBlock>
          <p className="col-span-12 mt-16 text-3xl font-medium leading-[40px] text-black/80 lg:col-span-9 lg:col-start-2">
            Designs that used to be &ldquo;not doable&rdquo; started being built
            on a regular basis.
          </p>
        </div>
      </Container>

      {/* ── Figma tools ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="Building tools to bypass Figma's bottlenecks"
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              I developed scripts and plugins to help designers work more
              efficiently in Figma. For example, designers were spending an
              inordinate amount of time manually adjusting lines, areas, colours,
              axes, etc. I developed an advanced Figma plugin that let designers
              dynamically design real graphs, instantly see results, and refine
              accordingly.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-12 items-start gap-4">
              <img
                src={`${IMG}/figma-tools-1.png`}
                alt="Custom Figma plugin for dynamic graph design"
                className="col-span-12 row-span-2 w-full rounded-2xl lg:col-span-7"
              />
              <img
                src={`${IMG}/figma-tools-3.png`}
                alt="Figma plugin chart configuration panel"
                className="col-span-6 w-full rounded-2xl lg:col-span-5"
              />
              <img
                src={`${IMG}/figma-tools-2.png`}
                alt="Real-time chart preview in Figma"
                className="col-span-6 w-full rounded-2xl lg:col-span-5"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── Mission critical tools ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="Designing mission critical end-to-end tools"
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              In addition to my design system work, I owned the end-to-end
              design of many mission critical tools that were fundamental to
              current and future workflows, enabling easy and informed bulk
              actions rather than individual controls, massively reducing
              dispatch effort.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-12 items-start gap-4">
              <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
                <img
                  src={`${IMG}/mission-3.png`}
                  alt="Energy monitoring tool interface"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/mission-4.png`}
                  alt="Quick scheduler tool"
                  className="w-full rounded-2xl"
                />
              </div>
              <img
                src={`${IMG}/mission-2.png`}
                alt="Unit monitoring dashboard"
                className="col-span-12 w-full rounded-2xl lg:col-span-6"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── Getting buy-in ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock
            title="Getting buy-in from leadership"
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              Since most of my initiatives were self-driven, I usually had to
              convince stakeholders that spending effort in a certain area was
              worthwhile. I spent a good chunk of time creating demos, video
              explainers, and visual presentations. Spending extra time here
              helped build trust both in the moment and long term.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <img
                  src={`${IMG}/buyin-3.png`}
                  alt="Demo presentation slide"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/mission-1.png`}
                  alt="Video explainer screenshot"
                  className="w-full rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-4">
                <img
                  src={`${IMG}/buyin-2.png`}
                  alt="Visual presentation for stakeholders"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/buyin-4.png`}
                  alt="Design system benefits overview"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/buyin-5.png`}
                  alt="Stakeholder demo recording"
                  className="w-full rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-4">
                <img
                  src={`${IMG}/buyin-6.png`}
                  alt="Technical concept visualization"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/buyin-7.png`}
                  alt="Impact metrics presentation"
                  className="w-full rounded-2xl"
                />
                <img
                  src={`${IMG}/buyin-1.png`}
                  alt="Leadership review deck"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Results ── */}
      <section className="bg-black py-28 text-white lg:py-40">
        <Container>
          <div className="grid grid-cols-12 gap-x-8 gap-y-24">
            <div className="col-span-12 lg:col-span-9 lg:col-start-2">
              <p className="text-2xl font-semibold uppercase leading-8 text-[#ffb356]">
                Results
              </p>
              <p className="mt-6 text-[32px] font-normal leading-[48px]">
                Over the course of my role on the project it had changed
                substantially &mdash; not just in what we were delivering, but
                in how the team was working together to deliver it.
              </p>
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-x-12 gap-y-10 lg:col-span-10 lg:col-start-2 lg:grid-cols-4">
              {resultStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-medium leading-[40px] text-white/80">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xl leading-8 text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── User impact ── */}
      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock className="col-span-12 lg:col-span-7 lg:col-start-2">
            <p className="text-xl font-medium leading-7 text-black/60">
              This enabled us to push massive benefits to the users. The
              platform turned a manual, one-unit-at-a-time workflow into bulk
              dispatch &mdash; hundreds of instructions sent at the press of a
              single button. Engineers went from hunting for units across
              fragmented legacy systems to choosing from a pre-optimised list.{" "}
              <strong className="text-black">
                The cognitive load shifted from finding the right action to
                confirming the right action.
              </strong>
            </p>
          </TextBlock>

          <p className="col-span-12 mt-16 text-3xl font-medium leading-[40px] text-black/80 lg:col-span-9 lg:col-start-2">
            Before, a single balancing action took a control room engineer 30
            minutes and 610 clicks. After &mdash; 3 minutes and 10 clicks. A
            90% reduction in user input.
          </p>

          <div className="col-span-12 mt-20 lg:col-span-10 lg:col-start-2">
            <p className="text-xl font-medium leading-7 text-black/60">
              A year after launching, we saw the wider impact on the grid and
              the UK at large.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-12 gap-y-10 lg:grid-cols-4">
              {impactStats.map((stat) => (
                <div key={typeof stat.label === "string" ? stat.label : "co2"}>
                  <p className="text-3xl font-medium leading-[40px] text-black/80">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xl leading-8">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ── Feedback ── */}
      <Container className="pb-40 lg:pb-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl leading-[40px] lg:col-span-7 lg:col-start-2">
            Feedback from colleagues
          </h2>
          <div className="col-span-12 mt-16 flex flex-col gap-16 lg:col-span-9 lg:col-start-2">
            <div>
              <p className="text-xl font-medium leading-7 text-black/60">
                &ldquo;Lalith you are a superstar, and I hope you know that. I
                am really glad that we got you to join the team, and I am
                excited about the work that we will do together over the coming
                months. You are operating at a level in excess of your seniority
                level, but your potential still reaches far further.&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-6">
                <img
                  src={`${IMG}/avatar-mark.png`}
                  alt=""
                  className="size-16 rounded-full object-cover"
                  data-no-lightbox
                />
                <div>
                  <p className="text-xl font-medium">Mark Williams</p>
                  <p className="text-xl text-black/60">
                    Programme Design Lead on the NG account
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xl font-medium leading-7 text-black/60">
                &ldquo;I really appreciated how you walked me through the whole
                design system process, starting with observing the current
                structure and outlining a vision for how the new change would be
                structured, to then actually building it, and following agile
                processes as the structure is redefined. Your approach to
                mentoring has allowed me to learn new skills and then apply them
                independently seeking guidance where I get stuck.&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-6">
                <img
                  src={`${IMG}/avatar-ellie.png`}
                  alt=""
                  className="size-16 rounded-full object-cover"
                  data-no-lightbox
                />
                <div>
                  <p className="text-xl font-medium">Ellie Ritchie</p>
                  <p className="text-xl text-black/60">
                    UX Designer that I mentored
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.main>
  );
}
