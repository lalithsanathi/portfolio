import Container from "../../components/Container";
import CaseStudyHeader from "../../components/CaseStudyHeader";

const IMG = "/images/projects/national-grid";

export default function BridgingDesignDevV2() {
  return (
    <main className="pb-40" data-lightbox>
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
        <div className="relative overflow-hidden rounded-2xl h-[720px]">
          <img
            src={`${IMG}/hero.png`}
            alt="National Grid balancing platform interface"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </Container>
    </main>
  );
}
