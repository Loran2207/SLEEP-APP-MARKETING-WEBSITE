import { StarField } from "@/components/ambient/StarField";
import type { ShotHue, StoreShot } from "@/data/store";

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

const MAIN_TOP = 726;
const FAN_TOP = 792;

export function StoreFrame({ shot, index }: { shot: StoreShot; index: number }) {
  const rgb = hueRgb[shot.hue];
  const fan = shot.behind?.length === 2;
  const mainScreen = fan ? 700 : 860;
  const sideScreen = 600;
  const mainLeft = Math.round((SHOT_WIDTH - phoneBodyWidth(mainScreen)) / 2);
  const sideLeft = Math.round(SHOT_WIDTH - phoneBodyWidth(sideScreen) + 70);

  return (
    <section
      id={`shot-${shot.id}`}
      className="relative shrink-0 overflow-hidden bg-void"
      style={{ width: SHOT_WIDTH, height: SHOT_HEIGHT }}
    >
      {/* A cosmic veil, already dimmed and vignetted to true black at every
          edge, so nothing can leave a visible rectangle on the canvas. */}
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

      <StarField count={150} seed={2411 + index * 137} className="opacity-80" />

      {/* the light the phone sits in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: -110,
          top: 520,
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
          top: 596,
          width: 1200,
          height: 1200,
          border: `2px dashed rgba(${rgb}, 0.2)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 55,
          top: 1780,
          width: 1180,
          height: 900,
          backgroundImage: `radial-gradient(ellipse 50% 50% at center, rgba(${rgb}, 0.46) 0%, rgba(${rgb}, 0.19) 40%, rgba(${rgb}, 0) 72%)`,
        }}
      />

      <div className="relative flex flex-col items-center px-[96px] pt-[150px] text-center">
        <div className="flex w-full max-w-[660px] items-center gap-6">
          <span aria-hidden="true" className="hair-fade h-px flex-1" />
          <span className="shrink-0 text-[26px] font-medium tracking-[0.14em] text-muted">
            {shot.eyebrow}
          </span>
          <span aria-hidden="true" className="hair-fade h-px flex-1" />
        </div>

        <h2 className="mt-[46px] text-[98px] leading-[1.04] font-medium tracking-[-0.035em] text-ink">
          {shot.headline.map((line, lineIndex) => (
            <span key={lineIndex} className="block whitespace-nowrap">
              {line.before}
              {line.accent ? <span className="accent-serif">{line.accent}</span> : null}
              {line.after}
            </span>
          ))}
        </h2>

        {shot.sub ? (
          <p className="mt-[52px] text-[36px] leading-[1.5] text-ink-2">
            {shot.sub.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </p>
        ) : null}

        {shot.pills ? (
          <div className="mt-[54px] flex flex-col items-center gap-[18px]">
            {[shot.pills.slice(0, 3), shot.pills.slice(3)].map((row, rowIndex) => (
              <ul key={rowIndex} className="flex justify-center gap-[18px]">
                {row.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full px-[30px] py-[15px] text-[30px] whitespace-nowrap text-ink-2"
                    style={{
                      border: "1px solid rgba(245, 245, 247, 0.14)",
                      background: "rgba(245, 245, 247, 0.045)",
                    }}
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : null}
      </div>

      {fan ? (
        <>
          <StorePhone
            src={shot.behind![0].src}
            alt={shot.behind![0].alt}
            screenWidth={sideScreen}
            recede
            style={{ position: "absolute", left: -70, top: 930, transform: "rotate(-6deg)" }}
          />
          <StorePhone
            src={shot.behind![1].src}
            alt={shot.behind![1].alt}
            screenWidth={sideScreen}
            recede
            style={{ position: "absolute", left: sideLeft, top: 930, transform: "rotate(6deg)" }}
          />
        </>
      ) : null}

      <StorePhone
        src={shot.screen}
        alt={shot.screenAlt}
        screenWidth={mainScreen}
        style={{
          position: "absolute",
          left: mainLeft,
          top: fan ? FAN_TOP : MAIN_TOP,
        }}
      />
    </section>
  );
}