function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-stone-400 mb-1">{children}</p>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`size-10 rounded-lg ring-1 ring-black/5 ${className}`} />
      <span className="text-[10px] text-stone-400">{label}</span>
    </div>
  );
}

export default function DesignSystem() {
  return (
    <div className="min-h-screen px-8 py-16 max-w-4xl">
      <h1 className="font-display text-4xl mb-16">Design System</h1>

      {/* Fonts */}
      <Section title="Fonts">
        <p className="font-display text-2xl">
          Adamina — the display face (font-display)
        </p>
        <p className="text-2xl">
          IBM Plex Sans — the body face (font-sans, default)
        </p>
      </Section>

      {/* Weights */}
      <Section title="Weights (IBM Plex Sans)">
        <div className="space-y-1">
          <p className="font-light">Light (font-light, 300)</p>
          <p className="font-normal">Regular (font-normal, 400)</p>
          <p className="font-medium">Medium (font-medium, 500)</p>
          <p className="font-semibold">Semibold (font-semibold, 600)</p>
          <p className="font-bold">Bold (font-bold, 700)</p>
        </div>
        <div className="mt-4 space-y-1">
          <p className="italic font-light">Light Italic</p>
          <p className="italic font-normal">Regular Italic</p>
          <p className="italic font-medium">Medium Italic</p>
          <p className="italic font-semibold">Semibold Italic</p>
          <p className="italic font-bold">Bold Italic</p>
        </div>
      </Section>

      {/* Type Scale */}
      <Section title="Type Scale">
        <div className="space-y-4">
          <div>
            <Label>text-4xl — 40/56 (overridden)</Label>
            <p className="text-4xl">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-3xl — 32/40 (overridden)</Label>
            <p className="text-3xl">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-2xl — 24/32 (default)</Label>
            <p className="text-2xl">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-xl — 20/28 (default)</Label>
            <p className="text-xl">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-lg — 18/28 (default)</Label>
            <p className="text-lg">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-base — 16/24 (default)</Label>
            <p className="text-base">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-sm — 14/20 (default)</Label>
            <p className="text-sm">The quick brown fox jumps</p>
          </div>
          <div>
            <Label>text-xs — 12/16 (default)</Label>
            <p className="text-xs">The quick brown fox jumps</p>
          </div>
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <div className="space-y-6">
          <div>
            <Label>Accent — orange</Label>
            <div className="flex gap-1 mt-1">
              <Swatch label="50" className="bg-orange-50" />
              <Swatch label="100" className="bg-orange-100" />
              <Swatch label="200" className="bg-orange-200" />
              <Swatch label="300" className="bg-orange-300" />
              <Swatch label="400" className="bg-orange-400" />
              <Swatch label="500" className="bg-orange-500" />
              <Swatch label="600" className="bg-orange-600" />
              <Swatch label="700" className="bg-orange-700" />
              <Swatch label="800" className="bg-orange-800" />
              <Swatch label="900" className="bg-orange-900" />
              <Swatch label="950" className="bg-orange-950" />
            </div>
          </div>

          <div>
            <Label>Stone — current grays</Label>
            <div className="flex gap-1 mt-1">
              <Swatch label="50" className="bg-stone-50" />
              <Swatch label="100" className="bg-stone-100" />
              <Swatch label="200" className="bg-stone-200" />
              <Swatch label="300" className="bg-stone-300" />
              <Swatch label="400" className="bg-stone-400" />
              <Swatch label="500" className="bg-stone-500" />
              <Swatch label="600" className="bg-stone-600" />
              <Swatch label="700" className="bg-stone-700" />
              <Swatch label="800" className="bg-stone-800" />
              <Swatch label="900" className="bg-stone-900" />
              <Swatch label="950" className="bg-stone-950" />
            </div>
          </div>

          <div>
            <Label>Gray Warm — custom scale (on standby)</Label>
            <div className="flex gap-1 mt-1">
              <Swatch label="50" className="bg-gray-warm-50" />
              <Swatch label="100" className="bg-gray-warm-100" />
              <Swatch label="200" className="bg-gray-warm-200" />
              <Swatch label="300" className="bg-gray-warm-300" />
              <Swatch label="400" className="bg-gray-warm-400" />
              <Swatch label="500" className="bg-gray-warm-500" />
              <Swatch label="600" className="bg-gray-warm-600" />
              <Swatch label="700" className="bg-gray-warm-700" />
              <Swatch label="800" className="bg-gray-warm-800" />
              <Swatch label="900" className="bg-gray-warm-900" />
              <Swatch label="950" className="bg-gray-warm-950" />
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-48 rounded-2xl bg-stone-300 p-6 shadow-[inset_0_1px_0_0_white]">
            <p className="text-base font-medium uppercase">stone-300</p>
          </div>
          <div className="h-48 rounded-2xl bg-stone-200 p-6 shadow-[inset_0_1px_0_0_white]">
            <p className="text-base font-medium uppercase">stone-200</p>
          </div>
          <div className="h-48 rounded-2xl bg-gray-warm-300 p-6 shadow-[inset_0_1px_0_0_white]">
            <p className="text-base font-medium uppercase">gray-warm-300</p>
          </div>
          <div className="h-48 rounded-2xl bg-gray-warm-200 p-6 shadow-[inset_0_1px_0_0_white]">
            <p className="text-base font-medium uppercase">gray-warm-200</p>
          </div>
        </div>
      </Section>

      {/* Sample Composition */}
      <Section title="Sample Composition">
        <h2 className="font-display text-4xl max-w-lg">
          I'm a designer that codes. I like turning complex systems into
          playful interactions.
        </h2>
        <p className="mt-3 font-display text-4xl">
          Currently at <span className="text-orange-700">Malted</span>.
        </p>
        <h3 className="mt-16 text-2xl font-bold uppercase">Malted AI</h3>
        <p className="mt-2 text-xl leading-8 font-medium max-w-xl">
          Helping financial organisations use language models to better
          understand their customer data.
        </p>
        <p className="mt-6 text-xl leading-8 italic max-w-xl">
          The expertise is in the judgment. The hours are in the data entry.
        </p>
      </Section>
    </div>
  );
}
