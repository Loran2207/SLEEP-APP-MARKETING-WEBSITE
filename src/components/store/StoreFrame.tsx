import { StarField } from "@/components/ambient/StarField";
import type { ShotHue, StoreShot } from "@/data/store";

import { StoreFeatureList } from "./StoreFeatureList";
import { phoneBodyWidth, StorePhone } from "./StorePhone";

/** What App Store Connect asks for on the 6.9" iPhone slot. */
export const SHOT_WIDTH = 1290;
export const SHOT_HEIGHT = 2796;

/** The app's own accents, written as rgb triples so no color-mix survives. */
const hueRgb: Record<ShotHue, string> = {
  blue: "92, 155, 255",
  coral: "255, 142, 124",
  mint: "93, 221, 179",
  violet: "157, 124, 255",
};

const veil: Record<ShotHue, string> = {
  blue: "/store/veil-blue.webp",
  coral: "/store/veil-coral.webp",
  mint: "/store/veil-mint.webp",
  violet: "/store/veil-violet.webp",
};

/** The phone frames: headline high, phone large, nothing between them. */
const PHONE_TOP = 600;
const PHONE_SCREEN = 920;

/** The moon on the feature frame - the app's own mark, half out of the frame. */
const MOON = 300;

/**
 * The crescent is two circles, not one path: a single evenodd path renders as a
 * ring cut flat by the canvas. Drawn in markup so it stays editable in Figma.
 */
function Moon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ top: 74, right: -84, width: MOON, height: MOON }}
    >
      <span
        className="absolute rounded-full"
        style={{
          left: -MOON * 1.05,
          top: -MOON * 1.05,
          width: MOON * 3.1,
          height: MOON * 3.1,
          backgroundImage:
            "radial-gradient(circle, rgba(206, 224, 255, 0.2) 0%, rgba(157, 124, 255, 0.09) 34%, rgba(157, 124, 255, 0) 68%)",
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: -84,
          top: -84,
          width: MOON + 168,
          height: MOON + 168,
          border: "2px dashed rgba(206, 224, 255, 0.16)",
        }}
      />
      <span
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 34% 28%, #f6f9ff 0%, #e2eafc 52%, #bfd2f4 100%)",
          boxShadow: "0 0 120px rgba(206, 224, 255, 0.34)",
        }}
      >
        <span
          className="absolute rounded-full bg-void"
          style={{
            width: MOON * 0.8,
            height: MOON * 0.8,
            left: MOON * 0.23,
            top: -MOON * 0.03,
          }}
        />
      </span>
    </div>
  );
}

export function StoreFrame({ shot, index }: { shot: StoreShot; index: number }) {
  const rgb = hueRgb[shot.hue];
  const isList = Boolean(shot.features);
  const phoneLeft = Math.round((SHOT_WIDTH - phoneBodyWidth(PHONE_SCREEN)) / 2);

  return (
    <section
      id={`shot-${shot.id}`}
      className="relative shrink-0 overflow-hidden bg-void"
      style={{ width: SHOT_WIDTH, height: SHOT_HEIGHT }}
    >
      {/* A cosmic veil, already dimmed and vignetted to true black at every
          edge, so nothing can leave a visible rectangle on the canvas. Every
          frame in the set stands in the same sky. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={veil[shot.hue]}
        alt=""
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: -180,
          top: -40,
          width: 1650,
          height: 840,
          backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.22) 0%, rgba(${rgb}, 0.09) 42%, rgba(${rgb}, 0) 72%)`,
        }}
      />

      {isList ? <Moon /> : null}

      {/* Two passes of stars on the feature frame: a dense field, then a
          sparser brighter one over it, so the sky has depth instead of a
          single even sprinkle. */}
      <StarField
        count={isList ? 260 : 150}
        seed={2411 + index * 137}
        className="opacity-80"
      />
      {isList ? (
        <StarField count={70} seed={9137} className="opacity-90" />
      ) : null}

      {/* the light the subject sits in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: -110,
          top: isList ? 620 : 440,
          width: 1510,
          height: 1620,
          backgroundImage: isList
            ? `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.4) 0%, rgba(${rgb}, 0.22) 30%, rgba(${rgb}, 0.1) 50%, rgba(${rgb}, 0.04) 65%, rgba(${rgb}, 0) 80%)`
            : `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.58) 0%, rgba(${rgb}, 0.34) 30%, rgba(${rgb}, 0.15) 50%, rgba(${rgb}, 0.05) 65%, rgba(${rgb}, 0) 80%)`,
        }}
      />

      {/* the app draws a dashed ring around every medallion; here it holds the
          subject of the frame the same way */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          left: 45,
          top: isList ? 760 : 480,
          width: 1200,
          height: 1200,
          border: `2px dashed rgba(${rgb}, ${isList ? 0.16 : 0.2})`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 55,
          top: isList ? 2020 : 1800,
          width: 1180,
          height: 900,
          backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, ${isList ? 0.3 : 0.46}) 0%, rgba(${rgb}, ${isList ? 0.13 : 0.19}) 40%, rgba(${rgb}, 0) 72%)`,
        }}
      />

      {/* Every frame opens its headline on the same line, so the four read as
          one set when App Store Connect puts them side by side. */}
      <div
        className={
          isList
            ? "relative flex flex-col items-start px-[96px] pt-[200px] text-left"
            : "relative flex flex-col items-center px-[96px] pt-[200px] text-center"
        }
      >
        <h2
          className={
            isList
              ? "text-[126px] leading-[1.02] font-semibold tracking-[-0.04em] text-ink"
              : "text-[104px] leading-[1.04] font-medium tracking-[-0.035em] text-ink"
          }
          style={
            isList
              ? { textShadow: "0 0 90px rgba(180, 195, 255, 0.28)" }
              : undefined
          }
        >
          {shot.headline.map((line, lineIndex) => (
            <span
              key={line}
              className="block whitespace-nowrap"
              style={
                lineIndex === shot.accentLine
                  ? {
                      color: "rgb(205, 189, 255)",
                      textShadow: "0 0 80px rgba(157, 124, 255, 0.55)",
                    }
                  : undefined
              }
            >
              {line}
            </span>
          ))}
        </h2>

        {shot.features ? (
          <div className="mt-[130px] w-full">
            <StoreFeatureList features={shot.features} />
          </div>
        ) : null}
      </div>

      {shot.screen ? (
        <StorePhone
          src={shot.screen}
          alt={shot.screenAlt ?? ""}
          screenWidth={PHONE_SCREEN}
          style={{
            position: "absolute",
            left: phoneLeft,
            top: PHONE_TOP,
          }}
        />
      ) : null}
    </section>
  );
}
