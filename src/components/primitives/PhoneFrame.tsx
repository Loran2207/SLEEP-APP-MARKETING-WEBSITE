import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  src: ImageProps["src"];
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PhoneFrame({ src, alt, className, priority = false }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "rim-strong rounded-phone border border-hair bg-surface-2 p-[10px]",
        className,
      )}
    >
      <div className="aspect-[201/437] overflow-hidden rounded-[36px]">
        <Image
          src={src}
          alt={alt}
          width={804}
          height={1748}
          priority={priority}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 402px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
