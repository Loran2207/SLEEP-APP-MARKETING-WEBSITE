type DisplayHeadingProps = {
  before: string;
  accent: string;
  after?: string;
};

export function DisplayHeading({ before, accent, after }: DisplayHeadingProps) {
  return (
    <h1 className="mx-auto max-w-[900px] text-balance text-[40px] leading-[1.02] font-medium tracking-[-0.035em] text-ink sm:text-[56px] md:text-[76px]">
      {before}<span className="accent-serif">{accent}</span>{after}
    </h1>
  );
}
