import { motion, useReducedMotion } from "motion/react";
import Container from "../../components/Container";

const IMG = "/images/projects/community-crisis";

export default function CommunityCrisis() {
  const reduceMotion = useReducedMotion();
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
    <main className="pb-40" data-lightbox>
      <section className="bg-gray-warm-200 px-10 pb-16 pt-44 lg:px-20 md:pt-36 xl:pt-44 2xl:pt-72 [@media(min-width:1280px)_and_(pointer:coarse)]:pt-52! 2xl:px-page-edge-2xl">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
          <motion.h1
            className="col-span-12 mb-16 font-display text-[48px] leading-[64px]"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.2 }}
          >
            A community platform for times of crisis
          </motion.h1>

          <motion.div
            className="col-span-12 flex flex-col gap-7 lg:col-span-3 lg:col-start-1"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ ...spring, delay: 0.35 }}
          >
            {[
              { label: "Type", value: "Side Project" },
              { label: "Timeframe", value: "2020 — 2020" },
              {
                label: "Recognition",
                value: "Winner of Ford Smart Mobility Fund",
              },
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
            Herd is a platform that I co-designed that helps people maintain
            their mobility in times of crisis. It connects those in need to
            other members of their community who can provide help and
            resources. Users send out a &apos;flare&apos; from their mobile
            device, and those who can help respond — enabling the natural
            instinct we have to help one another in times of need.
          </motion.p>
        </div>
      </section>

      {/* ── Hero image (dark nav while nav overlaps this band) ── */}
      <section data-nav-theme="dark" aria-label="Project hero">
        <Container variant="full" className="mt-0">
          <div className="relative h-[600px] overflow-hidden rounded-2xl">
            <img
              src={`${IMG}/hero2.png`}
              alt="Herd app interface showing the flare system"
              className="absolute inset-0 size-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </Container>
      </section>

      {/* ── Context ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-3xl lg:col-span-8">
            When a crisis hits, communities often have no strong resources or infrastructure to be self-resilient.
          </p>
          <p className="col-span-12 mt-6 text-xl text-stone-600 lg:col-span-6 lg:col-start-1"></p>
        </div>
      </Container>
      <Container variant="full" className="mt-12">
        <div className="grid grid-cols-12 gap-4">
          <img
            src={`${IMG}/context.png`}
            alt="Sending a flare for help through the Herd app"
            className="col-span-12 w-full rounded-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Container>

      {/* ── Goal ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-2xl font-medium uppercase tracking-widest text-stone-600">
            Our goal
          </p>
          <p className="col-span-12 mt-4 text-5xl font-light lg:col-span-10">
            Enable communities to self-organise and maintain mobility during
            times of crisis
          </p>
        </div>
      </Container>

      {/* ── MVP Scope / Features ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">Figuring out the right thing to build</h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            We explored different areas of focus and identified three areas of high opportunity — each addressing a
            distinct phase of crisis response.
          </p>
        </div>
      </Container>
      <Container className="mt-16">
        <div className="grid grid-cols-12 gap-x-16 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            {/* <img
              src={`${IMG}/golden-moment.svg`}
              alt="The Golden Moment icon"
              className="mb-6 size-full object-contain"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">The Golden Moment</h3>
            <p className="mt-2 text-lg text-stone-500">
              The period of time when self-help is most crucial.
            </p>
            <ul className="mt-4 list-disc list-outside text-xl text-stone-600 ml-5">
              <li className="my-2">Early warning signals pulled from sensor networks and weather data </li>
              <li className="my-2">
                Recommendation of personal actions and resources in line with a flood timeline
              </li>
              <li className="my-2">
                New options for mobility as the flood evolves
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-4">
            {/* <img
              src={`${IMG}/Sending_Flare_Circle.png`}
              alt="Sending a Flare icon"
              className="mb-6 size-20 object-contain"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">Sending a Flare</h3>
            <p className="mt-2 text-lg text-stone-500">
              A rapid request for assistance.
            </p>
            <ul className="mt-4 list-disc list-outside text-xl text-stone-600 ml-5">
              <li className="my-2">
                Allows users to communicate their individual needs to the wider
                community
              </li>
              <li className="my-2">
                Facilitate immediate response based on priority
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-4">
            {/* <img
              src={`${IMG}/Resource_distribution_circle.svg`}
              alt="Resource Distribution icon"
              className="mb-6 size-20 object-contain"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">Resource Distribution</h3>
            <p className="mt-2 text-lg text-stone-500">
              Improving the mobility of necessary items.
            </p>
            <ul className="mt-4 list-disc list-outside text-xl text-stone-600 ml-5">
              <li className="my-2">
                Maintain a database of local resource information
              </li>
              <li className="my-2">Build a request-based system</li>
              <li className="my-2">
                Establish supply chains optimised for flooding conditions
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* ── Design Principles ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl lg:col-span-8">
            I wrote principles to guide design decisions throughout the project.
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            {/* <img
              src={`${IMG}/principle_1.svg`}
              alt="Intuition over fluency principle illustration"
              className="mb-4 h-16 w-16"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">Intuition over fluency</h3>
            <p className="mt-3 text-xl text-stone-500">
              This service is likely to be used most often by people new to it
              or who haven't used it in a while, so the design should cater to
              beginners rather than power users.
            </p>
            <ul className="mt-4 list-disc list-outside text-lg text-stone-600 ml-5">
              <li className="my-1">Actions are discoverable</li>
              <li className="my-1">Fewer interactions</li>
              <li className="my-1">Transferable mental models</li>
              <li className="my-1">Scalable metaphors</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            {/* <img
              src={`${IMG}/principle_2.svg`}
              alt="Momentum not thought principle illustration"
              className="mb-4 h-16 w-16"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">Momentum, not thought</h3>
            <p className="mt-3 text-xl text-stone-500">
              The interface must make action as simple and easy as possible. In
              a crisis, every second of hesitation counts.
            </p>
            <ul className="mt-4 list-disc list-outside text-lg text-stone-600 ml-5">
              <li className="my-1">Always suggest</li>
              <li className="my-1">Flare everywhere</li>
              <li className="my-1">Don't overwhelm</li>
              <li className="my-1">Remove action friction</li>
              <li className="my-1">Build habits</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            {/* <img
              src={`${IMG}/principle_3.svg`}
              alt="Social over personal principle illustration"
              className="mb-4 h-16 w-16"
              data-no-lightbox
            /> */}
            <h3 className="text-2xl font-medium">Social over personal</h3>
            <p className="mt-3 text-xl text-stone-500">
              Primarily being a social service, the user must be encouraged to
              act in a social way.
            </p>
            <ul className="mt-4 list-disc list-outside text-lg text-stone-600 ml-5">
              <li className="my-1">Reinforce social choices</li>
              <li className="my-1">Encourage sharing</li>
              <li className="my-1">
                Maintain internal social rewards (such as feeling pride by
                publicly volunteering)
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* ── Flare Development ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">Developing the flare</h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            The flare is the core interaction of the product — a rapid request
            for help. I iterated through many rounds to find the right balance
            between information density and visual clarity when stacked in a
            list.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <img
              src={`${IMG}/Hero_Herd_2.png`}
              alt="Early flare design — visually cluttered with too much text"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            <p className="text-lg text-stone-500">
              Early iterations felt old and visually cluttering when stacked.
              Too much text.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <img
              src={`${IMG}/Hero_herd_3.png`}
              alt="Simplified flare design with colour categories"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            <p className="text-lg text-stone-500">
              Simplified the visual design and attempted to communicate category
              through colour. Increased the prominence of the message itself and
              limited character count to 50.
            </p>
          </div>
        </div>
      </Container>
      <Container className="mt-4">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <img
              src={`${IMG}/Hero_Herd_5.png`}
              alt="Further simplified flare with lighter font and time sent"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            <p className="text-lg text-stone-500">
              Further simplifying. Explored lighter font thickness, introduced
              'time sent', and explored sub-categories.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <img
              src={`${IMG}/Hero_Herd_7.png`}
              alt="Final minimal flare design balanced for list view"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            <p className="text-lg text-stone-500">
              Removed colour as a communicator — it was hard for users to
              associate colour with unfamiliar categories. Settled on the most
              minimal but balanced option for comfortable list viewing across
              devices.
            </p>
          </div>
        </div>
      </Container>

      {/* ── User Flows ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">User flows</h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            I mapped out three core user journeys that cover the full spectrum
            of crisis interaction — from receiving a warning, to asking for
            help, to offering it.
          </p>
        </div>
      </Container>

      <Container className="mt-16">
        <div className="flex flex-col gap-20">
          <div className="grid grid-cols-12 gap-x-8 items-start">
            <div className="col-span-12 lg:col-span-4">
              <h3 className="text-2xl font-medium">
                Risk is predicted, product guides action
              </h3>
              <p className="mt-4 text-xl text-stone-600">
                This journey tackles common barriers to mobility in a crisis —
                confusion and lack of awareness of risk. The personalised
                warning ensures users respond, and the ensuing actions keep them
                able to prepare calmly.
              </p>
            </div>
            <img
              src={`${IMG}/User_Journey_1.svg`}
              alt="User flow: predicted risk guides user actions"
              className="col-span-12 mt-8 w-full lg:col-span-8 lg:mt-0"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="grid grid-cols-12 gap-x-8 items-start">
            <div className="col-span-12 lg:col-span-4">
              <h3 className="text-2xl font-medium">
                User needs help, product communicates to the community
              </h3>
              <p className="mt-4 text-xl text-stone-600">
                This journey pieces together how a user alerts the community to
                their need, and how the product maintains their mental state as
                they wait. If the flare receives no response, further options
                are explored.
              </p>
            </div>
            <img
              src={`${IMG}/User_Journey_2.svg`}
              alt="User flow: sending a flare for community help"
              className="col-span-12 mt-8 w-full lg:col-span-8 lg:mt-0"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="grid grid-cols-12 gap-x-8 items-start">
            <div className="col-span-12 lg:col-span-4">
              <h3 className="text-2xl font-medium">
                User wants to help, product enables it
              </h3>
              <p className="mt-4 text-xl text-stone-600">
                Those who want to help are encouraged to identify the ways in
                which they can contribute. The product then uses an algorithm to
                match helpers with those in need.
              </p>
            </div>
            <img
              src={`${IMG}/User_Journey_3.svg`}
              alt="User flow: volunteering help through the platform"
              className="col-span-12 mt-8 w-full lg:col-span-8 lg:mt-0"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
