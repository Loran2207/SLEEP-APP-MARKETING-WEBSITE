type QuestionTitleProps = {
  title: string;
  accentWord: string;
};

export function QuestionTitle({
  title,
  accentWord,
}: QuestionTitleProps) {
  const accentIndex = title.indexOf(accentWord);

  if (accentIndex < 0) {
    return <>{title}</>;
  }

  const before = title.slice(0, accentIndex);
  const after = title.slice(accentIndex + accentWord.length);

  return (
    <>
      {before}
      <span className="accent-serif inline-block pb-1 leading-[1.15]">
        {accentWord}
      </span>
      {after}
    </>
  );
}
