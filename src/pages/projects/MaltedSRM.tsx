import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import Container from "../../components/Container";
import { EXIT_FADE_DURATION_S, useExitFade } from "../../hooks/useExitFade";

const IMG = "/images/projects/malted-srm";

const stats = [
  { value: "£1.2 million", label: "projected annual value" },
  { value: "20% → 90%", label: "user trust in AI system" },
  { value: "10-15%", label: "time savings per case" },
];

const research: Array<{
  title: string;
  body?: Array<{ strong: string; text: string }>;
  text?: string;
}> = [
  {
    title: "Discovery",
    body: [
      {
        strong: "Shadowing analysts",
        text: "watching the full process end-to-end to understand what the work actually looked like, not just what stakeholders described",
      },
      {
        strong: "Stakeholder interviews",
        text: "aligning on business priorities, constraints, and what success would look like",
      },
      {
        strong: "Service blueprint",
        text: "mapping the workflow to pinpoint exactly where manual effort concentrated and where intervention would have the most impact",
      },
    ],
  },
  {
    title: "Iterative testing",
    text: "3 rounds tied to build stages. Async questionnaires captured honest, unobserved tool usage. Live design feedback sessions after each build demo. Each round fed directly into the next iteration.",
  },
];

const insights = [
  {
    icon: "🌀",
    title: "Case files are chaos",
    body: "They’re handwritten, poorly photographed, in multiple languages, with information in the wrong places.",
  },
  {
    icon: "⏩",
    title: "Analysts move quickly",
    body: "They’ve built years of muscle memory moving data around and mentally keeping track of information as they go.",
  },
  {
    icon: "⚖️",
    title: "The stakes are high",
    body: "Get it wrong and a sanctioned individual gets a visa, or a company partners with someone involved in financial crime.",
  },
];

const processSteps = [
  {
    title: "Extraction",
    body: "The AI extracts the data from the case files before the analyst looks at them.",
  },
  {
    title: "Verification",
    body: "The analyst checks the AI’s output for accuracy and corrects any mistakes.",
  },
  {
    title: "Population",
    body: "The artefacts (report and scoping doc) are pre-populated with the now verified data.",
  },
  {
    title: "Completion",
    body: "The analysts do their deep research and add their findings to the report, ready to send it off.",
  },
];

const principles = [
  {
    key: "mistakes",
    title: (
      <>
        “Make mistakes <em>cheap</em>, not rare.”
      </>
    ),
    body: "The AI will be wrong. Instead of trying to prevent every error, make errors painless to notice and fix. We can rely on future AI tech to seamlessly reduce the error count.",
  },
  {
    key: "one-click",
    title: (
      <>
        “<em>One click</em> to verify AI claims”
      </>
    ),
    body: "Every piece of unverified AI output must be traceable in at most one click. Not “you can find it if you dig.” One click. This constrains the entire verification interface.",
  },
  {
    key: "floor",
    title: (
      <>
        “Look at the <em>floor</em>, not the ceiling.”
      </>
    ),
    body: "Driving adoption relies on trust, and broken experiences can lead analysts to write off the whole tool, so the MVP should be measured on its worst journey, not its best.",
  },
];

const screenCopy = [
  {
    title: "Case view",
    body: "The case files get automatically processed as they’re added. The analyst can see their case progress as well as generate reports",
  },
  {
    title: "Verification",
    body: "The analyst can read and verify every file from start to finish without leaving this page. As soon as a file is verified, they can click to move on.",
  },
  {
    title: "Population",
    body: "Any final changes or notes can be added here, before the report is generated.",
  },
];

const finalResults = [
  {
    value: "£1.2 million",
    label: "projected annual value",
  },
  {
    value: "20% → 90%",
    label: "user trust in AI system",
  },
  {
    value: "10-15%",
    label: "time savings per case",
  },
  {
    value: "3 → 1 tools",
    label: "tools consolidated",
  },
];

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

export default function MaltedSRM() {
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
      className="overflow-x-clip bg-[#f1eaea] pb-40"
      data-lightbox>
      <section className="bg-gray-warm-200 px-10 pb-16 pt-44 md:pt-36 lg:px-20 xl:pt-44 2xl:px-page-edge-2xl 2xl:pt-72 [@media(min-width:1280px)_and_(pointer:coarse)]:pt-52!">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
          <motion.h1
            className="col-span-12 mb-16 font-display text-[48px] leading-[64px]"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.2 }}
          >
            Building an AI-powered background check tool
          </motion.h1>

          <motion.div
            className="col-span-12 flex flex-col gap-7 lg:col-span-3 lg:col-start-1"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.35 }}
          >
            {[
              { label: "Company", value: "Malted / S-RM" },
              { label: "Timeframe", value: "MAR — Jul 2025" },
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
            I owned the end-to-end experience of an AI-powered tool for S-RM, a
            global intelligence and cyber security consultancy, accelerating
            their background check process. Over a 4-month period, we
            went through the process from discovery to a system that analysts
            genuinely trusted and wanted to use — projecting over £1M in
            potential annual value. I collaborated closely with ML engineers on
            the data model and pipeline, building a tool that extracts and
            structures information from messy, multilingual documents into
            investigation briefs and final reports.
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
            alt="AI background check product on a desktop monitor"
            className="size-full object-cover"
          />
        </motion.div>
      </Container>

      <section className="mt-16 bg-black py-28 text-white md:mt-24 lg:mt-40 lg:py-40">
        <Container>
          <div className="grid grid-cols-12 gap-x-8 gap-y-24">
            <div className="col-span-12 lg:col-span-4 lg:col-start-2">
              <p className="text-2xl font-semibold uppercase leading-8 text-[#ffb356]">
                The client
              </p>
              <img
                src={`${IMG}/srm-logo.png`}
                alt="S-RM"
                className="mt-8 h-16 w-auto object-contain"
                data-no-lightbox
              />
              <p className="mt-8 text-3xl leading-[40px] text-white/80">
                S-RM, a global corporate intelligence agency
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-2">
              <p className="text-2xl font-semibold uppercase leading-8 text-[#ffb356]">
                My role
              </p>
              <p className="mt-4 text-xl leading-7">
                The sole designer from research through delivery. I defined and
                ran the research programme, shaped the product vision with
                leadership, and presented my designs in regular playbacks to
                S-RM stakeholders.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-7">
              <p className="text-2xl font-semibold uppercase leading-8 text-[#ffb356]">
                The team
              </p>
              <p className="mt-4 text-xl leading-7">
                I worked alongside our product manager to shape the roadmap, 2
                front-end, 2 back-end, and 3 ML engineers — with whom I
                collaborated particularly closely to bridge design and model
                development, shaping the interface and the AI together, not
                joining them after the fact.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <TextBlock className="col-span-12 lg:col-span-5 lg:col-start-2">
            <p className="text-3xl leading-[40px] text-black/80">
              S-RM runs background checks on people and organisations around the
              world.
            </p>
            <p className="mt-8 text-xl font-medium leading-7 text-black/60">
              Analysts are trained to make high-stakes judgment calls and spot
              hidden connections. But a lot of their time goes to data entry:
              copying fields between documents, re-entering the same data into
              different templates, and formatting reports.
            </p>
          </TextBlock>
          <div className="col-span-12 mt-16 overflow-hidden rounded-2xl bg-[#fafafa]">
            <img
              src={`${IMG}/context-graph.png`}
              alt="Network graph showing extracted information around a person"
              className="w-full mix-blend-darken"
            />
          </div>
          <p className="col-span-12 mt-16 text-3xl font-medium leading-[40px] text-black/80 lg:col-span-5 lg:col-start-2">
            The <span className="italic">expertise</span> is in the judgment.
            <br />
            The <span className="italic">hours</span> are in the data entry.
          </p>
        </div>
      </Container>

      <BlackBand eyebrow="The challenge">
        <p>
          Every case involves 2-3 hours of manual data entry. That’s skilled
          analysts copying and pasting between documents, re-entering data
          across files`, formatting reports, repeated thousands of times a
          year.
        </p>
      </BlackBand>

      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl leading-[40px] lg:col-span-4 lg:col-start-2">
            Research plan
          </h2>
          <div className="col-span-12 mt-16 grid gap-16 lg:col-span-8 lg:col-start-2 lg:grid-cols-2">
            {research.map((item) => (
              <div key={item.title}>
                <h3 className="text-2xl font-semibold uppercase leading-8">
                  {item.title}
                </h3>
                {item.body ? (
                  <ul className="mt-2 list-disc space-y-0 pl-8 text-xl font-medium leading-8 text-black/60">
                    {item.body.map((point) => (
                      <li key={point.strong}>
                        <span className="font-bold text-black/80">
                          {point.strong}
                        </span>{" "}
                        — {point.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xl font-medium leading-7 text-black/60">
                    {item.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          <h2 className="col-span-12 mt-24 text-3xl leading-[40px] lg:col-span-4 lg:col-start-2">
            The service blueprint
          </h2>
          <div className="col-span-12 mt-10 overflow-hidden rounded-2xl lg:col-span-10 lg:col-start-2">
            <img
              src={`${IMG}/service-blueprint.png`}
              alt="Due diligence case service blueprint"
              className="w-full"
            />
          </div>

          <div className="col-span-12 mt-24 lg:col-span-10 lg:col-start-2">
            <p className="text-2xl font-semibold uppercase leading-8">
              Initial insights
            </p>
            <div className="mt-10 grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {insights.map((insight) => (
                <div key={insight.title} className="flex gap-8">
                  <p className="w-16 shrink-0 text-[56px] font-semibold leading-[72px]">
                    {insight.icon}
                  </p>
                  <div>
                    <h3 className="text-xl font-bold leading-7 text-black/80">
                      {insight.title}
                    </h3>
                    <p className="mt-2 text-xl font-medium leading-7 text-black/60">
                      {insight.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <BlackBand eyebrow="Design approach">
        <p>
          Designing a tool that slots into the analyst’s process rather than
          replacing it, automating the data entry stages while keeping analysts
          in control of the judgment calls.
        </p>
      </BlackBand>

      <Container className="py-40 lg:py-56">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <p className="text-2xl font-semibold uppercase leading-8">
              The proposed new process
            </p>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="text-3xl font-medium leading-[40px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-xl font-medium leading-7 text-black/60">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <TextBlock
            title="Testing our first extraction model"
            className="col-span-12 mt-28 lg:col-span-5 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              We ran a test to see how much data we could reliably extract using
              a baseline OCR model. The complexity of the case files made it
              clear that this was going to be a difficult problem.
            </p>
          </TextBlock>

          <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-2">
            <img
              src={`${IMG}/accuracy.png`}
              alt="Model accuracy at 28 percent with sample extracted fields"
              className="w-full rounded-2xl"
            />
          </div>

          <p className="col-span-12 mt-8 text-xl font-medium leading-7 text-black/60 lg:col-span-5 lg:col-start-2">
            I knew the model would get better, but I also knew that it would
            never be perfect. The job of design is to meet the model where it’s
            at and make it as easy as possible for the analysts to leverage the
            speed gain while still trusting the output.
          </p>

          <p className="col-span-12 mt-56 text-3xl leading-[40px] lg:col-span-7 lg:col-start-2">
            The model’s mistakes aren’t edge cases, they’re part of the core
            journey. How can we design a tool that saves time even though the AI
            can mess up? I made a set of design principles to answer this.
          </p>

          <div className="col-span-12 mt-20 grid gap-x-24 gap-y-20 lg:col-span-10 lg:col-start-2 lg:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.key}>
                <h3 className="text-3xl font-medium leading-[48px]">
                  {principle.title}
                </h3>
                <p className="mt-6 text-xl font-medium leading-7 text-black/60">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>

          <div className="col-span-12 mt-56 lg:col-span-10 lg:col-start-2">
            <h2 className="text-3xl leading-[40px]">
              Saying no to confidence scores
            </h2>
            <p className="mt-4 max-w-[532px] text-xl font-medium leading-7 text-black/60">
              AI ambiguity was a big part of our workflow, so I experimented
              with adding confidence scores to the UI.
            </p>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <img
                src={`${IMG}/confidence-percent.png`}
                alt="Confidence score percentage exploration"
                className="w-full rounded-2xl"
              />
              <img
                src={`${IMG}/confidence-bucket.png`}
                alt="Confidence score bucket exploration"
                className="w-full rounded-2xl"
              />
            </div>
            <img
              src={`${IMG}/confidence-doc-level.png`}
              alt="Document-level confidence exploration"
              className="mt-8 w-full rounded-2xl"
            />
            <div className="mt-12 grid gap-x-8 gap-y-8 lg:grid-cols-12">
              <p className="text-4xl leading-[64px] lg:col-span-7">
                Confidence scores are really only useful when they give the
                analyst “permission to ignore”.
              </p>
              <div className="lg:col-span-5 col-start-10">
                <p className="text-2xl font-semibold leading-8">
                  A more fundamental issue
                </p>
                <p className="mt-4 text-xl font-medium leading-7 text-black/60">
                  The stakes are too high for us to feel comfortable telling
                  analysts to ignore high confidence fields, so they don’t
                  really add value at all. Instead, I proposed that we focus on
                  speeding up the process of verifying the AI.
                </p>
              </div>
            </div>
          </div>

          <TextBlock
            title="Refining how the tool highlights extracted fields"
            className="col-span-12 mt-56 lg:col-span-5 lg:col-start-2"
          >
            <p className="text-xl font-medium leading-7 text-black/60">
              Showing the source of AI output is a core part of the verification
              experience. I explored different ways to visually connect
              extracted fields to their location in the document — balancing
              precision, readability, and what the model could reliably deliver.
            </p>
          </TextBlock>

          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <img
              src={`${IMG}/bounding/bounding-1.png`}
              alt="Exploration of one highlight approach for linking extracted fields to their source in the document"
              className="w-full rounded-2xl"
            />
          </div>

          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <img
              src={`${IMG}/bounding/bounding-2.png`}
              alt="Exploration of another highlight approach for linking extracted fields to their source in the document"
              className="w-full rounded-2xl"
            />
          </div>

          <div className="col-span-12 mt-14 lg:col-span-10 lg:col-start-2">
            <img
              src={`${IMG}/bounding/bounding-final.png`}
              alt="Chosen highlight approach for linking extracted fields to their source"
              className="w-full rounded-2xl"
            />
          </div>

          <div className="col-span-12 mt-28 lg:col-span-10 lg:col-start-2">
            <h3 className="text-2xl font-semibold leading-8">
              Rapid prototyping with code
            </h3>
            <p className="mt-4 max-w-[536px] text-xl font-medium leading-7 text-black/60">
              I built a coded prototype to make the interaction tangible,
              then used it with team members and users to refine the pin
              behaviour, stress-test dense documents, and move quickly through
              iteration cycles.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl">
              <video
                src={`${IMG}/tooltips.mp4`}
                aria-label="Coded prototype showing source pin tooltip interactions"
                className="m-[-16px] w-[calc(100%+32px)] max-w-none"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-40">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl leading-[40px] lg:col-span-10 lg:col-start-2">
            Main flow
          </h2>

          {screenCopy.map((screen, index) => {
            const slug = ["extraction", "verification", "population"][index];
            return (
              <Fragment key={screen.title}>
                <div className="col-span-12 mt-20 lg:col-span-5 lg:col-start-2">
                  <h3 className="text-2xl font-semibold leading-8">
                    {screen.title}
                  </h3>
                  <p className="mt-4 text-xl font-medium leading-7 text-black/60">
                    {screen.body}
                  </p>
                </div>
                <div className="col-span-12 mt-10 lg:col-span-10 lg:col-start-2">
                  <img
                    src={`${IMG}/final-screens/${slug}.png`}
                    alt={`${screen.title} screen`}
                    className="w-full rounded-2xl"
                  />
                </div>
              </Fragment>
            );
          })}

          <div className="col-span-12 mt-40 lg:col-span-10 lg:col-start-2">
            <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl leading-[40px]">Results</h2>
                <p className="mt-4 text-xl font-medium leading-7 text-black/60">
                  The pilot proved the tool could make AI useful inside a
                  high-stakes analyst workflow: faster case preparation,
                  higher confidence in the output, and a clearer path to an
                  MVP the team could build.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {finalResults.map((stat) => (
                <div key={stat.label} className="border-t border-black/10 pt-6">
                  <p className="text-3xl font-medium leading-[40px] text-black/80">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xl leading-8">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-16 max-w-[760px] text-3xl font-light italic leading-[40px] text-black/80">
              The biggest shift was trust. Analysts did not need the AI to be
              perfect, they needed a fast way to check it.
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl leading-[40px] lg:col-span-10 lg:col-start-2">
            More projects
          </h2>
        </div>
      </Container>
      <Container variant="full" className="pb-40">
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              title: "Malted Pulse",
              eyebrow: "Product systems",
              summary:
                "A calmer operating layer for reviewing risk, surfacing context, and moving investigations forward.",
              detail: "Built for complex review flows",
              href: "/projects/malted-pulse",
              imageSrc: "/images/projects/malted-pulse/hero.png",
            },
            {
              title: "Bringing balance at National Grid",
              eyebrow: "Design systems",
              summary:
                "Helping balancing engineers work faster inside high-stakes electricity grid software.",
              detail: "Highest NPS across IBM UK&I",
              href: "/projects/national-grid-intro",
              imageSrc: "/images/projects/national-grid/hero.png",
            },
          ].map((project) => (
            <div
              key={project.href}
              className="group relative aspect-7/6 overflow-hidden rounded-2xl bg-stone-200 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] transition-shadow duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-[0_22px_70px_rgba(29,28,26,0.12)] focus-within:shadow-[0_22px_70px_rgba(29,28,26,0.12)]"
            >
              <img
                src={project.imageSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] will-change-transform group-hover:scale-[1.035] group-focus-within:scale-[1.035]"
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,248,0)_28%,rgba(250,250,248,0.38)_68%,rgba(250,250,248,0.82)_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
              />
              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 rounded-xl border border-white/70 bg-gray-warm-50/76 p-4 text-gray-warm-900 opacity-0 shadow-[0_16px_42px_rgba(29,28,26,0.13),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:opacity-100 group-focus-within:opacity-100 sm:inset-x-4 sm:bottom-4 sm:p-5 [@media(hover:none)]:opacity-100">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-warm-600">
                    {project.eyebrow}
                  </p>
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-warm-900/8 text-lg leading-none text-gray-warm-800 transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5">
                    ↗
                  </span>
                </div>
                <h3 className="mt-2 max-w-[calc(100%-4.5rem)] text-pretty font-display text-2xl leading-8 text-gray-warm-950 sm:text-[28px] sm:leading-9">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-[min(64rem,calc(100%-4.5rem))] text-pretty text-[15px] leading-6 text-gray-warm-700 sm:text-base sm:leading-7">
                  {project.summary}
                </p>
                <p className="mt-4 inline-flex rounded-full border border-gray-warm-900/8 bg-white/60 px-3 py-1 text-[13px] font-medium leading-5 text-gray-warm-700">
                  {project.detail}
                </p>
              </div>
              <Link
                to={project.href}
                preload="viewport"
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
                aria-label={`${project.title}. ${project.summary}`}
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset" />
            </div>
          ))}
        </div>
      </Container>
    </motion.main>
  );
}
