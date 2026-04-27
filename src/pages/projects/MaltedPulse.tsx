import { Launch } from "@carbon/icons-react";
import CaseStudyHeader from "../../components/CaseStudyHeader";
import Container from "../../components/Container";

const IMG = "/images/projects/malted-pulse";

export default function MaltedPulse() {
  return (
    <main className="pb-40">
      <CaseStudyHeader
        title="Malted Pulse"
        meta={[
          { label: "Company", value: "Malted" },
          { label: "Timeframe", value: "Jul 2025 — Present" },
        ]}
        summary="I designed several key experiences and patterns on Malted's core product, Pulse. I played a key role in shaping it from early concept to a platform clients are paying to use. including designing cluster-based data navigation — one of the product's central interaction paradigms — and a configurable data explorer, establishing foundational patterns used across multiple contexts."
      >
        <a
          href="https://www.malted.ai/pulse"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-12 mt-10 inline-flex w-fit items-center gap-3 border-orange-700 pb-2 text-2xl uppercase text-orange-700 hover:text-orange-800 hover:border-orange-800 lg:col-span-8 lg:col-start-5"
        >
          See Pulse
          <Launch size={28} />
        </a>
      </CaseStudyHeader>

      <Container variant="full" className="mt-16">
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

      {/* ── Hero image ── */}
      {/* <Container variant="full" className="mt-16">
        <div className="relative overflow-hidden rounded-2xl h-[605px]">
          <img
            src="/images/projects/malted-pulse/hero-bg.png"
            alt=""
            className="absolute inset-0 size-full object-cover"
            aria-hidden
          />
          <img
            src="/images/projects/malted-pulse/hero-screenshot.png"
            alt="Pulse platform showing a document review interface with extracted personal details and verification workflow"
            className="absolute left-1/2 top-[34px] -translate-x-1/2 h-[660px] w-[891px] object-cover"
          />
        </div>
      </Container> */}
    </main>
  );
}
