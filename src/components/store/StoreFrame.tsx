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
          edge, so nothing can leave a visible rectangle on the canvas. The
          feature frame keeps it deep in the background - there the light comes
          from the sun off the corner, the way the app's welcome screen does. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={veil[shot.hue]}
        alt=""
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        className="absolute inset-0"
        style={{ display: "block", opacity: isList ? 0.4 : 1 }}
      />

      {isList ? (
        <>
          {/* the sun just off the top-right corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              top: -430,
              right: -330,
              width: 1180,
              height: 1180,
              backgroundImage:
                "radial-gradient(circle, rgba(255, 252, 245, 0.26) 0%, rgba(255, 250, 240, 0.08) 42%, rgba(255, 250, 240, 0) 70%)",
            }}
          />
          {/* two shafts raking down from it, angled in the gradient itself
              because the exporter strips a rotate() in transit */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(197deg, rgba(255, 253, 247, 0.055) 12%, rgba(255, 253, 247, 0) 33%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(206deg, rgba(255, 253, 247, 0.035) 22%, rgba(255, 253, 247, 0) 44%)",
            }}
          />
          {/* the pool of light the headline sits in */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: -220,
              top: 60,
              width: 1180,
              height: 820,
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(206, 214, 255, 0.11) 0%, rgba(206, 214, 255, 0) 62%)",
            }}
          />
        </>
      ) : (
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
      )}

      <StarField count={150} seed={2411 + index * 137} className="opacity-80" />

      {isList ? null : (
        <>
          {/* the light the phone sits in */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: -110,
              top: 440,
              width: 1510,
              height: 1620,
              backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.58) 0%, rgba(${rgb}, 0.34) 30%, rgba(${rgb}, 0.15) 50%, rgba(${rgb}, 0.05) 65%, rgba(${rgb}, 0) 80%)`,
            }}
          />
          {/* the app draws a dashed ring around every medallion; here it holds
              the phone the same way */}
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
        </>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 55,
          top: isList ? 2020 : 1800,
          width: 1180,
          height: 900,
          backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, ${isList ? 0.16 : 0.46}) 0%, rgba(${rgb}, ${isList ? 0.07 : 0.19}) 40%, rgba(${rgb}, 0) 72%)`,
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
          {shot.headline.map((line) => (
            <span key={line} className="block whitespace-nowrap">
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
