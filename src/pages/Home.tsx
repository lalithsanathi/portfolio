import Container from '../components/Container';
import ProjectCard from '../components/ProjectCard';
import ProjectSection from '../components/ProjectSection';

export default function Home() {
  return (
    <Container className="pb-40" as="main">
      {/* Hero */}
      <div className="max-w-[800px] mt-48">
        <h1 className="font-display text-4xl">
          Award winning London based product designer building expressive, AI-native products.
          
          {/* Currently at{' '}
          <a href="https://malted.ai" className="text-orange-700">
            Malted
          </a>
          . */}
        </h1>
      </div>

      {/* Sections */}
      <div className="mt-56 flex flex-col gap-40">
        {/* Malted AI */}
        <ProjectSection
          heading="Malted AI"
          description="Helping financial organisations use small language models to better understand their customer data."
          leftColumn={
            <ProjectCard
              title="Malted Pulse"
              href="/projects/malted-pulse"
              size="short"
              imageSrc="/images/projects/malted-pulse/project-card-image.png"
              variant="light"
            />
          }
          rightColumn={
            <ProjectCard
              title="AI Accelerated Due Diligence"
              href="/projects/malted-srm"
              size="tall"
              imageSrc="/images/projects/malted-srm/project-card-image.png"
              variant="light"
            />
          }
        />

        {/* IBM / National Grid */}
        <ProjectSection
          heading="IBM / National Grid"
          description="Revolutionising the platform that balances the energy grid for the UK and beyond, and enabling the UK's goal to become net zero by 2050."
          leftColumn={
            <>
              <ProjectCard
                title="Bridging Design and Dev"
                href="/projects/bridging-design-and-dev"
                size="tall"
                imageSrc="/images/projects/ibm-ng-ds/project-card-image.png"
                variant="dark"
              />
              {/* <ProjectCard title="Unifying our data vis" size="short" /> */}
            </>
          }
          rightColumn={
            <>
              <ProjectCard
                title="COMING SOON"
                size="short"
                imageSrc="/images/projects/ibm-ng-keyboard/project-card-image.png"
                variant="dark"
                className="opacity-60 pointer-events-none"
              />
              {/* <ProjectCard
                title="Demystifying Daylight savings"
                size="short"
              /> */}
            </>
          }
        />

        {/* Side Projects */}
        {/* <ProjectSection
          heading="Side projects"
          description="I like to create playful tools and useful toys. The following are a few of my experiments, explorations, and endeavors."
          leftColumn={
            <>
              <ProjectCard
                title="Embedding models for user research"
                href="/projects/embedding-models"
                size="short"
                imageSrc="/images/projects/side-embedding-models.png"
                variant="dark"
              />
              <ProjectCard
                title="A visual, Spatial Search for Typefaces"
                size="short"
              />
            </>
          }
          rightColumn={
            <ProjectCard
              title="A community platform for times of crisis"
              href="/projects/community-crisis"
              size="tall"
            />
          }
        />
      </div> */}

      {/* Bottom fade */}
      {/* <div className="pointer-events-none fixed inset-x-0 bottom-0 h-64 bg-linear-to-t from-stone-100 to-transparent" /> */}
    </Container>
  );
}
