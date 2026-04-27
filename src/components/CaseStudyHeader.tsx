import type { ReactNode } from "react";
import { ArrowLeft } from "@carbon/icons-react";
import { Link } from "@tanstack/react-router";
import Container from "./Container";

interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeaderProps {
  title: string;
  meta: MetaItem[];
  summary: string;
  children?: ReactNode;
}

export default function CaseStudyHeader({
  title,
  meta,
  summary,
  children,
}: CaseStudyHeaderProps) {
  return (
    <Container className="pt-8 mt-36 md:mt-44 xl:mt-52">
      <Link
        to="/"
        className="inline-flex items-center gap-4 text-2xl uppercase text-stone-500 hover:text-stone-900"
      >
        <ArrowLeft size={32} />
        All work
      </Link>

      <div className="mt-12 grid grid-cols-12 gap-x-8">
        <h1 className="col-span-12 font-display text-5xl mb-16">{title}</h1>

        <div className="col-span-12 flex flex-col gap-7 lg:col-span-3">
          {meta.map((item) => (
            <div key={item.label}>
              <p className="text-xl font-medium text-stone-400">{item.label}</p>
              <p className="mt-1 text-xl font-medium text-stone-600 uppercase">{item.value}</p>
            </div>
          ))}
        </div>

        <p className="col-span-12 text-xl text-stone-600 lg:col-span-8 lg:col-start-5">
          {summary}
        </p>

        {children}
      </div>
    </Container>
  );
}
