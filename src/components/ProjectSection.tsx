import type { ReactNode } from 'react';

interface ProjectSectionProps {
  heading: string;
  description: string;
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

export default function ProjectSection({
  heading,
  description,
  leftColumn,
  rightColumn,
}: ProjectSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold uppercase">{heading}</h2>
      <p className="mt-4 max-w-[640px] text-xl font-regular">
        {description}
      </p>
      <div className="mt-10 flex max-w-[968px] gap-2">
        <div className="flex flex-1 flex-col gap-2">{leftColumn}</div>
        <div className="flex flex-1 flex-col gap-2">{rightColumn}</div>
      </div>
    </section>
  );
}
