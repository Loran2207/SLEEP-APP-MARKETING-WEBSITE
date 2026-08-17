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

/**
 * The phone's lower edge, which the feature list ends on so the four frames
 * share a baseline.
 */
const PHONE_BOTTOM_GAP =
  SHOT_HEIGHT -
  (PHONE_TOP + Math.round(PHONE_SCREEN * (1748 / 804)) + Math.round(PHONE_SCREEN * 0.0318) * 2);

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
        src={isList ? "/store/nebula-frame.webp" : veil[shot.hue]}
        alt=""
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      {/* The frame with no phone carries the sky itself, so it gets the full
          nebula - and then the sky is graded like a shot: a dense top for the
          headline, the glow left burning in the middle, a settled floor for the
          cards, and the edges pulled to black. */}
      {isList ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0) 48%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.18) 33%, rgba(0,0,0,0) 44%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 74% 58% at 50% 46%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,0.88) 100%)",
            }}
          />
        </>
      ) : null}

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

      {/* Two passes of stars on the feature frame: a dense field, then a
          sparser brighter one over it, so the sky has depth instead of a
          single even sprinkle. */}
      <StarField
        count={150}
        seed={2411 + index * 137}
        className="opacity-80"
      />
      {/* the light the subject sits in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: -110,
          top: isList ? 420 : 440,
          width: 1510,
          height: 1620,
          backgroundImage: isList
            ? `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.2) 0%, rgba(${rgb}, 0.11) 30%, rgba(${rgb}, 0.05) 50%, rgba(${rgb}, 0.02) 65%, rgba(${rgb}, 0) 80%)`
            : `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.58) 0%, rgba(${rgb}, 0.34) 30%, rgba(${rgb}, 0.15) 50%, rgba(${rgb}, 0.05) 65%, rgba(${rgb}, 0) 80%)`,
        }}
      />

      {isList ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            left: 45,
            top: 480,
            width: 1200,
            height: 1200,
            border: `2px dashed rgba(${rgb}, 0.2)`,
          }}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 55,
          top: isList ? 2100 : 1800,
          width: 1180,
          height: 900,
          backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, ${isList ? 0.12 : 0.46}) 0%, rgba(${rgb}, ${isList ? 0.05 : 0.19}) 40%, rgba(${rgb}, 0) 72%)`,
        }}
      />

      <div
        className={
          isList
            ? "relative flex flex-col items-start px-[96px] pt-[240px] text-left"
            : "relative flex flex-col items-center px-[96px] pt-[200px] text-center"
        }
      >
        <h2
          className={
            isList
              ? "text-[196px] leading-[0.95] font-semibold tracking-[-0.05em] text-ink"
              : "text-[104px] leading-[1.04] font-medium tracking-[-0.035em] text-ink"
          }
          style={
            isList
              ? { textShadow: "0 0 100px rgba(180, 195, 255, 0.3)" }
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
                      textShadow: "0 0 90px rgba(157, 124, 255, 0.6)",
                    }
                  : undefined
              }
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* The list ends on the phone's baseline, so the set reads as one row. */}
      {shot.features ? (
        <div
          className="absolute"
          style={{ left: 96, right: 96, bottom: PHONE_BOTTOM_GAP }}
        >
          <StoreFeatureList features={shot.features} />
        </div>
      ) : null}

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
