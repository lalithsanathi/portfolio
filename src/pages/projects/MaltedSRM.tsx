import Container from "../../components/Container";
import CaseStudyHeader from "../../components/CaseStudyHeader";

export default function MaltedSRM() {
  return (
    <main className="pb-40">
      <CaseStudyHeader
        title="Accelerating due diligence at Malted"
        meta={[
          { label: "Company", value: "Malted / S-RM" },
          { label: "Timeframe", value: "Mar — Jul 2025" },
        ]}
        summary="I owned the end-to-end experience of an AI-powered due diligence tool for S-RM, a global intelligence and cyber security consultancy. Over a 4-month period, we went through the process from discovery to a system that analysts genuinely trusted and wanted to use — demonstrating over £1M in potential annual value. I collaborated closely with ML engineers on the data model and pipeline, building a tool that extracts and structures information from messy, multilingual documents into investigation briefs and final reports."
      >
        <div className="col-span-12 mt-12 mb-12 flex flex-wrap gap-x-20 gap-y-12 lg:col-span-7 lg:col-start-5">
          {[
            { value: "£1.2 million", label: "projected annual value" },
            { value: "10-15%", label: "time savings per case" },
            { value: "0% → 90%", label: "analyst trust in AI system" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <p className="text-3xl font-regular">{stat.value}</p>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </CaseStudyHeader>

      {/* ── Hero image ── */}
      <Container variant="full" className="mt-16">
        <div className="relative overflow-hidden rounded-2xl h-[640px]">
          <img
            src="/images/projects/malted-srm/hero.png"
            alt=""
            className="absolute inset-0 size-full object-cover"
            aria-hidden
          />
          {/* <div className="relative flex items-center justify-center px-4 py-6 md:px-12 md:py-10">
            <img
              src="/images/projects/srm/hero.png"
              alt="The due diligence tool showing a document review interface with extracted personal details"
              className="w-full max-w-4xl rounded-lg shadow-2xl"
            />
          </div> */}
        </div>
      </Container>

      {/* ── Context ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="lg:pt-18 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 flex flex-col lg:col-span-5">
            <p className="text-3xl">
              S-RM runs background checks on people and organisations around the
              world.
            </p>
            <p className="mt-8 text-xl ">
              Analysts are trained to make high-stakes judgment calls and spot
              hidden connections. But a lot of their time goes to data entry:
              copying fields between documents, re-entering the same data into
              different templates, and formatting reports.
            </p>
            <p className="mt-8 text-2xl font-medium">
              The <span className="italic">expertise</span> is in the judgment.{" "}
              <br /> The <span className="italic">hours</span> are in the data
              entry.
            </p>
          </div>
          <div className="col-span-8 col-start-3 mt-10 rounded-2xl overflow-hidden flex items-center justify-center lg:col-span-6 lg:-col-end-1 lg:mt-0">
            <img
              src="/images/projects/malted-srm/srm-context-graph.svg"
              alt="Network graph showing a person connected to multiple data points"
              className="w-full"
            />
          </div>
        </div>
      </Container>

      {/* ── Our goal ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-2xl font-regular uppercase tracking-widest text-stone-500">
            Our goal
          </p>
          <p className="col-span-12 mt-4 text-5xl font-light lg:col-span-9">
            Use AI to minimise manual data entry, so analysts can spend more
            time doing actual intelligence work.
          </p>
        </div>
      </Container>

      {/* ── Learning the process ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8 pt-18">
          <h2 className="col-span-12 text-3xl">Learning the process</h2>
          <p className="col-span-12 mt-4 text-xl  lg:col-span-6">
            I sat with the analysts and other client stakeholders to understand
            their full workflow, from ingestion to final report. I also started
            shadowing several cases, observing analysts as they went through the
            process.
          </p>
          <img
            className="col-span-12 mt-16 w-full rounded-2xl lg:col-span-10"
            src="/images/projects/srm/process-map.png"
            alt="DD Case Service Blueprint showing the full due diligence workflow across setup, scoping, verification, research, and monitoring phases"
          />
        </div>
      </Container>

      {/* ── Three insight cards ── */}
      <Container className="mt-16 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-16 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-3xl">
              Case files are <span className="italic">chaos</span>
            </h3>
            <p className="mt-4 text-xl ">
              They're handwritten, poorly photographed, in multiple languages,
              with information in the wrong places.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-3xl">
              Analysts move <span className="italic">quickly</span>
            </h3>
            <p className="mt-4 text-xl ">
              They've built years of muscle memory moving data around and
              mentally keeping track of information as they go.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-3xl">
              The stakes are <span className="italic">high</span>
            </h3>
            <p className="mt-4 text-xl ">
              Get it wrong and a sanctioned individual gets a visa, or a company
              partners with someone involved in financial crime.
            </p>
          </div>
        </div>
      </Container>

      {/* ── Workflow image ── */}
      {/* <Container className="mt-16">
        <img
          src="/images/projects/srm/workflow.png"
          alt="Workflow showing case file processing stages"
          className="w-full rounded-2xl"
        />
      </Container> */}

      {/* ── Data extraction focus ── */}
      <Container className="mt-12 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-2xl font-medium lg:col-span-6">
            Data extraction work is short (30-90 mins) but underpins everything
            else, so is our main focus.
          </p>
          <div className="col-span-12 mt-8 overflow-hidden rounded-2xl bg-stone-200">
            <img
              src="/images/projects/srm/data-timeline.png"
              alt="Timeline showing how data extraction connects to downstream workflows including scoping, deep research, and report writing"
              className="w-full"
            />
          </div>
        </div>
      </Container>

      {/* ── The solution ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-x-8">
          <p className="col-span-12 text-2xl font-regular uppercase tracking-widest text-stone-500">
            The solution
          </p>
          <p className="col-span-12 mt-4 text-5xl font-light lg:col-span-9">
            A tool that automatically extracts key applicant info from raw case
            files, and auto-populates reports and artefacts.
          </p>
        </div>
      </Container>

      {/* ── Tension between trust and speed ── */}
      <Container className="mt-20 lg:mt-80">
        <div className="lg:pt-18 grid grid-cols-12 gap-x-8 items-start">
          {/* 28% accuracy card */}
          <img
            className="col-span-5 mt-40 rounded-2xl"
            src="/images/projects/malted-srm/initial-accuracy.svg"
            alt="Chart showing the initial accuracy of the AI system"
          />

          {/* Narrative + chart */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:mt-0 grid grid-cols-7 gap-x-8">
            <h2 className="text-3xl col-span-4">
              The tension between trust and speed
            </h2>
            <p className="mt-6 text-xl col-span-5">
              Early ML testing showed the consequences of our chaotic data. The
              system made a lot of mistakes.
              <br />
              <br />
              That created a design problem: if analysts check everything, they
              trust the output but lose speed. If they skim through without
              checking, they're fast but can't be confident the information is
              right. There's an inherent speed cost to reaching a high trust
              level.
            </p>
            <img
              className="col-span-7 mt-16 w-full rounded-2xl"
              src="/images/projects/malted-srm/tension-graph.svg"
              alt="Chart showing the tension between trust and speed"
            />
          </div>
        </div>
      </Container>

      {/* ── Establishing principles ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 lg:pt-18 gap-x-8">
          {/* <h2 className="col-span-12 text-3xl">Establishing principles</h2> */}
          <h2 className="col-span-12 text-3xl lg:col-span-8">
            AI mistakes are inevitable. <br /> I wrote principles to keep them
            in check.
          </h2>
          {/* <p className="col-span-12 mt-4 text-xl lg:col-span-6">
            Model mistakes aren't edge cases, they're a normal part of the
            workflow, so I developed design principles to guide us to maintain a
            high standard of user experience.
          </p> */}

          <div className="col-span-12 mt-20 lg:col-start-1 grid grid-cols-2 gap-x-12 gap-y-12">
            <div className="flex flex-col gap-2 col-span-1">
              <h3 className="text-2xl font-medium">
                "Make mistakes cheap, not rare"
              </h3>
              <p className="mt-3 text-xl text-stone-500">
                The AI will be wrong. Instead of trying to prevent every error,
                make errors painless to notice and fix. We can rely on future AI
                tech to seamlessly reduce the error count.
              </p>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <h3 className="text-2xl font-medium">
                "Wrong AI should never be worse than no AI"
              </h3>
              <p className="mt-3 text-xl text-stone-500">
                The UX floor of the AI-assisted experience is the manual
                experience. If a wrong output actively creates extra work,
                you've gone below the floor. That's unacceptable.
              </p>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <h3 className="text-2xl font-medium">
                "Unverified data is one click from the source"
              </h3>
              <p className="mt-3 text-xl text-stone-500">
                Every piece of unverified AI output must be traceable in at most
                one click. Not "you can find it if you dig." One click. This
                constrains the entire verification interface.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Can't count on confidence scores ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-8">
          <h2 className="col-span-12 text-3xl">
            Can't count on confidence scores
          </h2>
          {/* <p className="col-span-12 mt-4 text-xl lg:col-span-12">
            AI ambiguity was a big part of our workflow, so we experimented with
            adding confidence scores to the UI.
          </p> */}
          <img
            className="col-span-12 mt-8 w-full rounded-2xl lg:col-span-5"
            src="/images/projects/malted-srm/confidence-percent.png"
            alt="Image showing the confidence scores in percentages for the AI system"
          />
          <img
            className="col-span-12 mt-8 w-full rounded-2xl lg:col-span-5"
            src="/images/projects/malted-srm/confidence-bucket.png"
            alt="Image showing the confidence scores in buckets for the AI system"
          />
          <img
            className="col-span-12 w-full rounded-2xl lg:col-span-8"
            src="/images/projects/malted-srm/confidence-doc-level.png"
            alt="Image showing the confidence scores at the document level for the AI system"
          />

          {/* <h3 className="col-span-12 mt-16 text-2xl font-medium">
            A more fundamental issue
          </h3> */}
          <p className="col-span-12 mt-12 text-3xl italic leading-snug text-stone-500 lg:col-span-5">
            Confidence scores are really only useful when they give the analyst
            "permission to ignore".
          </p>
          <p className="col-span-12 mt-12 text-xl lg:col-span-6 lg:col-start-7">
            We'd never get accuracy high enough to feel comfortable telling
            analysts to <em>ignore</em> high confidence fields, so they don't
            really add value at all. Instead, I proposed that we focus on
            speeding up the process of verifying the AI.
          </p>
        </div>
      </Container>

      {/* ── Refining referencing ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 lg:pt-18 gap-x-8">
          <h2 className="col-span-12 text-3xl">Refining our referencing</h2>
          <p className="col-span-12 mt-4 text-xl lg:col-span-6">
            Exposing the source of AI extractions is core to our verification
            process. I explored ways to visually connect AI output to its
            sources — balancing precision, readability, and technical
            constraints.
          </p>
        </div>
      </Container>
      <Container variant="full" className="mt-12">
        <div className="col-span-12 overflow-hidden rounded-xl bg-stone-100">
          <img
            src="/images/projects/malted-srm/ref-exploration.png"
            alt="Exploration of different referencing approaches including bounding boxes, pin connections, and text highlighting"
            className="w-full"
          />
        </div>
        <div className="col-span-12 mt-8 overflow-hidden rounded-xl bg-stone-100">
          <img
            src="/images/projects/malted-srm/ref-feel-exploration.png"
            alt="Exploration of different pin interaction models including collision detection, consolidation, and proximity-based approaches"
            className="w-full"
          />
        </div>
      </Container>

      {/* ── Finding the right feel ── */}
      {/* <Container className="mt-20 lg:mt-32">
        <div className="grid grid-cols-12 gap-x-8">
          <h2 className="col-span-12 text-2xl font-medium">
            Finding the right feel
          </h2>
          <p className="col-span-12 mt-4 text-base leading-7 lg:col-span-6">
            The interaction design still had open questions — how should pins
            behave when they're close together, how does the user target a
            specific one, and how does the system handle overlapping sources on
            dense documents?
          </p>
          <img
            src="/images/projects/srm/feel-exploration.png"
            alt="Exploration of different pin interaction models including collision detection, consolidation, and proximity-based approaches"
            className="col-span-12 mt-10 w-full rounded-2xl"
          />
        </div>
      </Container> */}

      {/* ── Results ── */}
      <Container className="mt-20 lg:mt-56">
        <div className="grid grid-cols-12 gap-4">
          <h2 className="col-span-12 text-3xl">Results</h2>
          <p className="col-span-12 text-xl lg:col-span-6">
            Launching the pilot proved the tool's viability in real workflows and with real users.
          </p>
          <div className="col-span-8 mt-12 grid grid-cols-12 gap-12">
            <div className="flex flex-col gap-2 col-span-6">
              <p className="text-5xl font-light">£1.2 million</p>
              <p className="text-2xl">projected annual value</p>
            </div>
            <div className="flex flex-col gap-2 col-span-6">
              <p className="text-5xl font-light">0% → 90%</p>
              <p className="text-2xl">analyst trust in AI system</p>
            </div>
            <div className="flex flex-col gap-2 col-span-6">
              <p className="text-5xl font-light">10-15%</p>
              <p className="text-2xl">time savings per case</p>
            </div>
            <div className="flex flex-col gap-2 col-span-6">
              <p className="text-5xl font-light">3 → 1 tools</p>
              <p className="text-2xl">tools consolidated</p>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Feedback ── */}
      <Container className="mt-20">
        <div className="grid grid-cols-12 gap-x-8 text-stone-500">
          {/* <h2 className="col-span-12 text-2xl font-medium">Feedback from users</h2> */}

          <blockquote className="col-span-12 lg:col-span-8">
            <p className="text-3xl italic">
              "The interface feels super smooth now, I can mostly just tab
              through the results and correcting mistakes is very quick."
            </p>
            {/* <footer className="mt-4 flex items-center gap-4">
              <img
                src="/images/projects/srm/avatar-mark.png"
                alt=""
                className="size-14 rounded-full object-cover"
              />
              <div>
                <p className="text-2xl">Intelligence analyst</p>
              </div>
            </footer> */}
          </blockquote>
          <blockquote className="col-span-12 mt-10 lg:col-span-8">
            <p className="text-3xl italic">
              "Seeing the report auto-populate felt fantastic!"
            </p>
            {/* <footer className="mt-4 flex items-center gap-4">
              <img
                src="/images/projects/srm/avatar-mark.png"
                alt=""
                className="size-14 rounded-full object-cover"
              />
              <div>
                <p className="text-2xl">Intelligence analyst</p>
              </div>
            </footer> */}
          </blockquote>
          <blockquote className="col-span-12 mt-10 lg:col-span-8">
            <p className="text-3xl italic">
              "I was definitely sceptical, but this does seem to work quite well."
            </p>
            {/* <footer className="mt-4 flex items-center gap-4">
              <img
                src="/images/projects/srm/avatar-mark.png"
                alt=""
                className="size-14 rounded-full object-cover"
              />
              <div>
                <p className="text-2xl">Intelligence analyst</p>
              </div>
            </footer> */}
          </blockquote>
        </div>
      </Container>
    </main>
  );
}
