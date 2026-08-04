import type { CSSProperties } from "react";

/** Every app capture is 804x1748 - the phone viewport at 2x. */
const SCREEN_RATIO = 1748 / 804;

/**
 * The proportions are the real ones. On a 6.9" iPhone the glass is 72.9mm of a
 * 77.6mm body, so the edge around the screen is 3.2% of the screen width, and
 * the display corner radius is an eighth of it.
 */
const EDGE = 0.0318;
const CORNER = 0.125;
const RAIL = 0.0045;

/** Black titanium: dark, with the two bright catches the rail always has. */
const METAL =
  "linear-gradient(102deg, #4a4d54 0%, #9ba0a8 9%, #33363c 26%, #70747c 48%, #2b2e33 68%, #878b93 86%, #3a3d43 100%)";

/** How wide the whole body is, so a frame can centre it. */
export function phoneBodyWidth(screenWidth: number) {
  return screenWidth + Math.round(screenWidth * EDGE) * 2;
}

type StorePhoneProps = {
  src: string;
  alt: string;
  /** Width of the glass, in frame pixels. The body is built around it. */
  screenWidth: number;
  className?: string;
  style?: CSSProperties;
  /** Push a screen back into the stack. */
  recede?: boolean;
};

function Button({
  side,
  top,
  height,
  width,
}: {
  side: "left" | "right";
  top: number;
  height: number;
  width: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute"
      style={{
        [side]: -width,
        top,
        width,
        height,
        background: METAL,
        borderRadius: width,
      }}
    />
  );
}

export function StorePhone({
  src,
  alt,
  screenWidth,
  className,
  style,
  recede = false,
}: StorePhoneProps) {
  const screenHeight = Math.round(screenWidth * SCREEN_RATIO);
  const edge = Math.round(screenWidth * EDGE);
  const rail = Math.max(2, Math.round(screenWidth * RAIL));
  const screenRadius = Math.round(screenWidth * CORNER);
  const bodyRadius = screenRadius + edge;
  const bodyHeight = screenHeight + edge * 2;
  const buttonWidth = Math.max(3, Math.round(screenWidth * 0.0055));

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: screenWidth + edge * 2,
        height: bodyHeight,
        borderRadius: bodyRadius,
        background: METAL,
        padding: rail,
        ...style,
      }}
    >
      {/* the rails, cut by the frame edge on the screens that sit behind */}
      <Button side="left" top={Math.round(bodyHeight * 0.147)} height={Math.round(bodyHeight * 0.033)} width={buttonWidth} />
      <Button side="left" top={Math.round(bodyHeight * 0.212)} height={Math.round(bodyHeight * 0.062)} width={buttonWidth} />
      <Button side="left" top={Math.round(bodyHeight * 0.289)} height={Math.round(bodyHeight * 0.062)} width={buttonWidth} />
      <Button side="right" top={Math.round(bodyHeight * 0.223)} height={Math.round(bodyHeight * 0.098)} width={buttonWidth} />

      <div
        className="relative h-full w-full"
        style={{
          borderRadius: bodyRadius - rail,
          background: "#050507",
          padding: edge - rail,
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: screenRadius, height: screenHeight }}
        >
          {/* A plain img on purpose: the Figma exporter takes the pixels it is
              given, so the file is pre-sized and nothing is left to a srcset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={screenWidth}
            height={screenHeight}
            style={{ display: "block", width: screenWidth, height: screenHeight }}
          />

          {/* the light that always catches the top edge of the glass */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-px"
            style={{
              left: "9%",
              right: "9%",
              background:
                "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))",
            }}
          />

          {recede ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.38) 100%)",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}