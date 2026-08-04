import { StarField } from "@/components/ambient/StarField";

/** What App Store Connect asks for. Apple applies the rounded mask itself. */
export const ICON_SIZE = 1024;

const MOON = 560;
const GLOW = 940;
/** The carve takes mass off the upper right, so the disc sits right of centre
 *  to put the crescent itself in the middle. */
const MOON_LEFT = Math.round((ICON_SIZE - MOON) / 2) + 34;
const MOON_TOP = Math.round((ICON_SIZE - MOON) / 2) - 18;

/**
 * The app icon.
 *
 * The mark is the one the app already uses: a pearl disc with a crescent
 * carved out of it. Here it carries a real pearl surface and sits in the
 * light, instead of being flat white.
 *
 * The moon is a PNG with the crescent already cut into its alpha, so the sky
 * glows through the carve. Cutting it with an opaque circle would leave a flat
 * disc sitting on top of a gradient.
 */
export function AppIcon({ id }: { id?: string }) {
  return (
    <div
      id={id}
      className="relative overflow-hidden"
      style={{ width: ICON_SIZE, height: ICON_SIZE, background: "#010206" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/store/icon-ground.webp"
        alt=""
        width={ICON_SIZE}
        height={ICON_SIZE}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      <StarField count={54} seed={5104} className="opacity-70" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/store/icon-moonglow.png"
        alt=""
        width={GLOW}
        height={GLOW}
        style={{
          position: "absolute",
          left: MOON_LEFT - (GLOW - MOON) / 2,
          top: MOON_TOP - (GLOW - MOON) / 2,
          display: "block",
          opacity: 0.62,
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/store/icon-moon.png"
        alt="The SLEEP moon"
        width={MOON}
        height={MOON}
        style={{
          position: "absolute",
          left: MOON_LEFT,
          top: MOON_TOP,
          display: "block",
        }}
      />
    </div>
  );
}