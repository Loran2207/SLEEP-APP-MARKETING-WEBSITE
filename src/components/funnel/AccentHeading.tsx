type AccentHeadingProps = {
  before: string;
  accent: string;
  after?: string;
  className?: string;
};

export function AccentHeading({
  before,
  accent,
  after,
  className,
}: AccentHeadingProps) {
  return (
    <h1
      className={[
        "text-balance text-[40px] leading-[1.08] font-medium tracking-[-0.035em] text-ink",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {before}
      <span className="accent-serif inline-block pb-1 leading-[1.15]">
        {accent}
      </span>
      {after}
    </h1>
  );
}
