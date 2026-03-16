import Container from "../../components/Container";
import CaseStudyHeader from "../../components/CaseStudyHeader";

const IMG = "/images/projects/national-grid";

export default function BridgingDesignDev() {
  return (
    <main className="pb-40">
      <CaseStudyHeader
        title="Bringing balance at National Grid"
        meta={[
          { label: "Company", value: "IBM / National Grid" },
          { label: "Timeframe", value: "Aug 2022 — Feb 2025" },
        ]}
        summary="National Grid's balancing engineers manage the country's electricity supply in real time. The decades-old software they use couldn't support the massive complexity of the UK's net-zero goals. I joined the project team to lead the design system, but grew into a cross-disciplinary role spanning design strategy, Figma tooling, front-end dev, and designer and developer mentorship, sitting at the intersection of every gap between design intent and delivered product, and enabling us to successfully ship our new tool to very high praise from users and leadership alike. The platform is currently being used to balance the UK grid."
      >
        <div className="col-span-12 mt-12 mb-12 flex flex-wrap gap-x-20 gap-y-12 lg:col-span-7 lg:col-start-5">
          {[
            { value: "75%", label: "fewer design-match defects" },
            { value: "Highest NPS", label: "for a project across IBM UK&I" },
            { value: "2x", label: "design-to-output speed" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <p className="text-3xl">{stat.value}</p>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </CaseStudyHeader>

      {/* ── Hero image ── */}
      <Container variant="full" className="mt-16">
        <div className="relative overflow-hidden rounded-2xl h-[600px]">
          <img
            src={`${IMG}/hero.png`}
            alt="National Grid balancing platform interface"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </Container>

      {/* ── Context ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-3xl lg:col-span-6">
            The UK's energy grid is managed in real time by a small group of
            balancing engineers.
          </p>
          <p className="col-span-12 mt-6 text-xl text-stone-600 lg:col-span-6 lg:col-start-7 lg:mt-0">
            They direct power across the country, keeping supply and demand in
            balance. When they make good decisions, the lights stay on. When
            they don't, the consequences ripple across the national
            infrastructure.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <img
          src={`${IMG}/context-monitors.png`}
          alt="Balancing engineers working at their multi-monitor stations"
          className="w-full rounded-2xl max-h-[480px] overflow-hidden object-cover"
        />
      </Container>

      <Container className="mt-20 lg:mt-32">
        <div className="lg:pt-18 grid grid-cols-12 gap-x-8 items-start">
          {/* Old system */}
          <img
            className="col-span-5 mt-40 rounded-2xl h-[720px] object-cover"
            src="/images/projects/ibm-ng-ds/old-system-monitor.png"
            alt="The legacy energy grid control system"
          />

          {/* Narrative + chart */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:mt-0 grid grid-cols-7 gap-x-8">
            <h2 className="text-3xl col-span-4">
              The software is decades old and about to buckle.
            </h2>
            <p className="mt-6 text-xl col-span-5 text-stone-600 text-balance">
              The UK's net zero commitments mean the energy grid is undergoing a
              fundamental transformation — more renewable sources, more
              distributed generation, more units to manage, more complexity. The
              old system was already straining, and the load it bears is about
              to <em>skyrocket</em>.
            </p>
            <img
              className="col-span-7 mt-16 w-full rounded-2xl h-[384px] object-cover"
              src="/images/projects/ibm-ng-ds/old-system-map.png"
              alt="UK energy grid network map"
            />
          </div>
        </div>
      </Container>

      {/* ── IBM involvement ── */}
      <Container className="mt-20 grid grid-cols-12 gap-x-8 lg:mt-56">
        <p className="col-span-12 text-3xl lg:col-span-8">
          IBM was rebuilding it from the ground up.
        </p>
        <p className="col-span-12 mt-8 text-3xl lg:col-span-8 text-balance">
          I joined midway to lead the new design system, but I grew my role to
          span design strategy, Figma tooling, front-end dev, and mentorship.
        </p>
      </Container>

      {/* ── Platform was broken ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            The platform was <em>dangerously</em> broken.
          </h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            On a platform where mistakes can cause blackouts, inconsistency goes
            beyond a minor annoyance, and becomes an actual danger.
          </p>
          {/* <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            Entire screens didn't work. Labels on graphs were hidden. Interactions were inconsistent across tools. On a platform where an incorrect energy allocation is a real risk, that kind of inconsistency goes beyond a minor annoyance, and becomes an actualdanger.
          </p> */}
        </div>
        <img
          src={`/images/projects/ibm-ng-ds/broken-ux.png`}
          alt="Balancing engineers working at their multi-monitor stations"
          className="mt-12 w-full rounded-2xl overflow-hidden object-cover"
        />
      </Container>

      {/* ── Uncovering underlying issues ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">Uncovering underlying issues</h2>
          {/* <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            Through my immersion into the different squads, and by speaking and
            working closely with the people actually building the platform, I
            dug up several underlying issues.
          </p> */}
        </div>
      </Container>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-medium mb-4">
              Designers felt helpless
            </h3>
            {/* <p className="mt-3 text-xl text-stone-600">
              Designers had flagged visual and behavioural inconsistencies
              repeatedly, but were met with long wait times, technical pushback
              they weren't equipped to evaluate, and the same patterns of
              mistakes recurring. They'd grown used to their designs not being
              built accurately the first time, and felt powerless to change it.
              The gap between design intent and development output was wide, and
              nothing in the current setup gave them the tools or the leverage
              to close it.
            </p> */}
            <ul className="mt-3 list-disc list-outside text-xl text-stone-600">
              <li className="my-2">
                Designers saw long wait times, technical pushback they didn't
                understand, and a pattern of recurring mistakes.
              </li>
              <li className="my-2">
                The gap between design intent and built output was wide, and the
                current process gave them no leverage to close it.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-4">
              Developers felt under-supported
            </h3>
            {/* <p className="mt-3 text-xl text-stone-600">
              The development teams were offshore, working across timezone and
              language barriers with limited front-end experience for the
              complexity being asked of them. They were under-supported. One dev
              had been recording the meetings to play back at slower speed just
              to keep up. The conditions made it hard to ask the right
              questions, build shared understanding, or develop the kind of
              intuition for the product that leads to good implementation
              decisions.
            </p> */}
            <ul className="mt-3 list-disc list-outside text-xl text-stone-600">
              <li className="my-2">
                Dev teams were offshore, working across timezone and language
                barriers, with insufficient experience for the complexity being
                asked of them.
              </li>
              <li className="my-2">
                This made it hard to ask the right questions and build
                shared understanding, so decisions were short-sighted.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Poor foundation → mess on top of mess
            </h3>
            {/* <p className="mt-3 text-xl text-stone-600">
              There was no shared component library. Each squad had built their
              own messy set of ad hoc components, with heavy duplication, no
              standardisation, and deeply tangled code. Developers were spending
              a significant chunk of their time just trying to understand the
              existing codebase before they could make any changes. The
              foundations they were building on were fighting them.
            </p> */}
            <ul className="mt-3 list-disc list-outside text-xl text-stone-600">
              <li className="my-2">
                Each squad had their own set of ad hoc components, with heavy
                duplication, no standards, and tangled code.
              </li>
              <li className="my-2">
                Developers spent ages just trying to understand the existing
                codebase before they could make any changes.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Devs were building with blinders on
            </h3>
            {/* <p className="mt-3 text-xl text-stone-600">
              Developers were largely disconnected from the bigger picture. They
              weren't part of product or design conversations, didn't have deep
              context on the energy balancing domain, and had little visibility
              into where the product was heading. Their scope started and
              stopped at the ticket. Without that context, every component was
              built for its immediate use case and nothing beyond it — so
              naturally things kept breaking as requirements evolved.
            </p> */}
            <ul className="mt-3 list-disc list-outside text-xl text-stone-600">
              <li className="my-2">
                Developers were disconnected from product and design
                conversations, and had little visibility into the vision.
              </li>
              <li className="my-2">
                Without that context, every component was built for its
                immediate use case and nothing beyond it — so naturally things
                kept breaking as requirements evolved.
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* ── My goal ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-2xl font-medium uppercase tracking-widest text-stone-600">
            My goal
          </p>
          <p className="col-span-12 mt-4 text-5xl font-light lg:col-span-10">
            Accelerate the design and development loop, and systemically raise
            the experience quality level for the balancing engineers
          </p>
        </div>
      </Container>

      {/* ── Snapshots from the project ── */}
      {/* <Container className="mt-20 lg:mt-56">
        <p className="text-6xl font-light">
          Snapshots from
          <br />
          the project
        </p>
      </Container> */}

      {/* ── Radically refactoring design components ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            A radical refactor of our design components
          </h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            I refactored our design component architecture, making them more
            robust, more maintainable, and with far fewer pieces for the same or
            greater functionality.
            {/* The button component saw a 10x reduction in
            complexity, all while fixing existing responsiveness bugs. This also
            made future updates happen much faster. */}
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <img
          src={`${IMG}/refactor-components.png`}
          alt="Figma component architecture showing the refactored design system"
          className="w-full lg:w-10/12"
        />
        <img
          src={`${IMG}/refactor-reduction.png`}
          alt="Button component complexity reduction"
          className="mt-4 w-1/3 ml-auto"
        />
      </Container>

      {/* ── Documentation ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            Writing documentation <em>right</em>.
          </h2>
          {/* <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            The barriers we had meant that the first pass of design-to-dev on
            any ticket was critical. I designed and wrote new documentation for
            developer handoff to maximise clarity, and created new guidance and
            standards for other designers to do it too. I mentored designers to
            get better at thinking like a dev, and I standardised templates to
            ensure that developers were less likely to miss important notes.
          </p> */}
          <ul className="col-span-12 mt-4 list-disc list-outside text-xl text-stone-600 lg:col-span-6">
            <li className="my-2">
              Our constraints meant that the first pass of design-to-dev on any
              ticket was critical.
            </li>
            <li className="my-2">
              I designed and wrote new documentation for developer handoff to
              maximise clarity, and created new guidance and standards for other
              designers to do it too.
            </li>
            <li className="my-2">
              I mentored designers to think like developers.
            </li>
          </ul>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="grid grid-cols-12 gap-4 items-start">
          <img
            src={`${IMG}/docs-1.png`}
            alt="Design documentation template"
            className="col-span-6 lg:col-span-5 w-full"
          />
          <img
            src={`${IMG}/docs-5.png`}
            alt="Developer handoff annotation"
            className="col-span-6 lg:col-span-2 w-full"
          />
          <img
            src={`${IMG}/docs-2.png`}
            alt="Design specification document"
            className="col-span-12 lg:col-span-5 lg:row-span-2 w-full"
          />
          <img
            src={`${IMG}/docs-3.png`}
            alt="Component documentation guide"
            className="col-span-7 lg:col-span-5 w-full"
          />
          <img
            src={`${IMG}/docs-4.png`}
            alt="Design system documentation"
            className="col-span-5 lg:col-span-3 w-full"
          />
        </div>
      </Container>

      {/* ── Deep dives with developers ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8 items-start">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-3xl">Deep dives with developers</h2>
            <p className="mt-4 text-xl text-stone-600">
              I embedded directly into the dev teams and made myself available
              in their timezone for questions, pair programming and code
              reviews. I also wrote reference implementations for trickier
              pieces of work.
            </p>
            <p className="mt-4 text-xl text-stone-600">
              Developers felt more supported and thus more motivated to raise
              the bar. Being in the trenches also gave me much more
              understanding of our codebase, and much more agency in pushing the
              boundaries of what we could build. Holding the design intent and
              the implementation reality in my head at the same time meant that
              I knew where support would be needed, and how best to give it.
            </p>
            <p className="mt-4 text-xl text-stone-600">
              This let designers get more ambitious, and design much smarter and
              more capable experiences for our users.
            </p>
          </div>
          <p className="mt-12 col-span-12 text-3xl lg:col-span-6 lg:col-start-1">
            Designs that used to be "not doable" started being built on a
            regular basis.
          </p>
        </div>
      </Container>

      {/* ── Figma tools ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            Building tools to bypass Figma's bottlenecks
          </h2>
          <p className="col-span-12 mt-6 text-xl text-stone-600 lg:col-span-6">
            I developed scripts and plugins to help designers work more
            efficiently in Figma. For example, designers were spending an
            inordinate amount of time manually adjusting lines, areas, colours,
            axes, etc. and therefore ended up with less refined behaviour and
            missed edge cases. I developed an advanced Figma plugin that let
            designers dynamically design real graphs, instantly see results, and
            refine accordingly.
          </p>
          <p className="col-span-12 mt-6 text-xl text-stone-600 lg:col-span-6">
            Design crits that used to span multiple sessions over days started
            happening live — someone would suggest a change, the designer would
            make it on the spot, and we'd evaluate it together in real time.
            Designers who had previously spent their energy catching visual
            inconsistencies in user testing were now uncovering deeper issues,
            like engineers being unsure about the state of a unit. And the users
            themselves were able to see much more realistic data, which
            fundamentally changed the quality of the feedback we got.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="grid grid-cols-12 gap-4 items-start">
          <img
            src={`${IMG}/figma-tools-1.png`}
            alt="Custom Figma plugin for dynamic graph design"
            className="col-span-12 lg:col-span-7 lg:row-span-2 w-full"
          />
          <img
            src={`${IMG}/figma-tools-3.png`}
            alt="Figma plugin chart configuration panel"
            className="col-span-6 lg:col-span-5 w-full"
          />
          <img
            src={`${IMG}/figma-tools-2.png`}
            alt="Real-time chart preview in Figma"
            className="col-span-6 lg:col-span-5 w-full"
          />
        </div>
      </Container>

      {/* ── Mission critical tools ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            Designing mission critical end-to-end tools
          </h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            In addition to my design system work, I owned the end-to-end design
            of many mission critical tools, such as complex energy and unit
            monitoring tools, compact and ever-present quick schedulers, and
            investigation tools that help diagnose and address issues.
          </p>
          <p className="col-span-12 mt-6 text-xl text-stone-600 lg:col-span-6">
            These tools were fundamental to current and future workflows,
            enabling easy and informed bulk actions rather than individual
            controls, massively reducing dispatch effort.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="grid grid-cols-12 gap-4 items-start">
          <img
            src={`${IMG}/mission-3.png`}
            alt="Energy monitoring tool interface"
            className="col-span-12 mt-0 w-full lg:col-span-6 lg:mt-40"
          />
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
            <img
              src={`${IMG}/mission-2.png`}
              alt="Unit monitoring dashboard"
              className="w-full"
            />
            <img
              src={`${IMG}/mission-4.png`}
              alt="Quick scheduler tool"
              className="w-full"
            />
          </div>
        </div>
      </Container>

      {/* ── Getting buy-in ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">
            Getting buy-in from leadership
          </h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            Since most of my initiatives were self-driven, I usually had to
            convince stakeholders that spending effort in a certain area was
            worthwhile. I had to communicate concepts and benefits that were
            often quite detailed or technical to people who operated at a
            strategic level, so I spent a good chunk of time creating demos,
            video explainers, and visual presentations. Spending extra time here
            helped build trust both in the moment and long term.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
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
      </Container>

      {/* ── Results ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-3xl">Results</h2>
          <p className="col-span-12 mt-4 text-xl text-stone-600 lg:col-span-6">
            Over the course of my role on the project it had changed
            substantially — not just in what we were delivering, but in how the
            team was working together to deliver it.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">75% fewer</p>
            <p className="text-xl">design-match defects</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">2x</p>
            <p className="text-xl">design-to-output speed</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">Highest NPS</p>
            <p className="text-xl">for a project across IBM UK&I</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">30% fewer</p>
            <p className="text-xl">edge case defects</p>
          </div>
        </div>
      </Container>

      <Container className="mt-20">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-xl text-stone-600 lg:col-span-6">
            This enabled us to push massive benefits to the users. The platform
            turned a manual, one-unit-at-a-time workflow into bulk dispatch —
            hundreds of instructions sent at the press of a single button.
            Engineers went from hunting for units across fragmented legacy
            systems to choosing from a pre-optimised list.{" "}
            <strong className="text-black">
              The cognitive load shifted from finding the right action to
              confirming the right action.
            </strong>
          </p>
        </div>
      </Container>

      <Container className="mt-12">
        <p className="max-w-[563px] text-2xl opacity-80">
          Before, a single balancing action took a control room engineer 30
          minutes and 610 clicks. After — 3 minutes and 10 clicks. A 90%
          reduction in user input.
        </p>
      </Container>

      <Container className="mt-16">
        <p className="max-w-[555px] text-xl text-stone-600">
          A year after launching, we saw the wider impact on the grid and the UK
          at large.
        </p>
      </Container>
      <Container className="mt-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">+283%</p>
            <p className="text-xl">jump in daily battery dispatch volume</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">217 → 1,867</p>
            <p className="text-xl">Change in daily instructions</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">£15 million/year</p>
            <p className="text-xl">projected consumer savings</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl opacity-80">37,400 tons</p>
            <p className="text-xl">
              of CO<sub className="text-xs">2</sub> avoided since launch
            </p>
          </div>
        </div>
      </Container>

      {/* ── Feedback ── */}
      <Container className="mt-20 lg:mt-56">
        <h2 className="text-3xl">Feedback from colleagues</h2>
      </Container>
      <Container className="mt-12">
        <div className="flex flex-col gap-16">
          <div>
            <p className="max-w-[800px] text-xl">
              "Lalith you are a superstar, and I hope you know that. I am really
              glad that we got you to join the team, and I am excited about the
              work that we will do together over the coming months. You are
              operating at a level in excess of your seniority level, but your
              potential still reaches far further."
            </p>
            <div className="mt-6 flex items-center gap-6">
              <img
                src={`${IMG}/avatar-mark.png`}
                alt=""
                className="size-16 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-medium">Mark Williams</p>
                <p className="text-xl">
                  Programme Design Lead on the NG account
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="max-w-[800px] text-xl">
              "I really appreciated how you walked me through the whole design
              system process, starting with observing the current structure and
              outlining a vision for how the new change would be structured, to
              then actually building it, and following agile processes as the
              structure is redefined. Your approach to mentoring has allowed me
              to learn new skills and then apply them independently seeking
              guidance where I get stuck."
            </p>
            <div className="mt-6 flex items-center gap-6">
              <img
                src={`${IMG}/avatar-ellie.png`}
                alt=""
                className="size-16 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-medium">Ellie Ritchie</p>
                <p className="text-xl">UX Designer that I mentored</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
