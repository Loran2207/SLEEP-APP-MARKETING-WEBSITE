import { ImageResponse } from "next/og";

export const alt = "SLEEP - a calmer end to the day";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const stars = [
  { left: 62, top: 92, size: 3, opacity: 0.72 },
  { left: 128, top: 198, size: 2, opacity: 0.42 },
  { left: 186, top: 68, size: 2, opacity: 0.52 },
  { left: 238, top: 274, size: 4, opacity: 0.76 },
  { left: 294, top: 148, size: 2, opacity: 0.38 },
  { left: 342, top: 388, size: 3, opacity: 0.56 },
  { left: 402, top: 92, size: 3, opacity: 0.78 },
  { left: 458, top: 226, size: 2, opacity: 0.46 },
  { left: 514, top: 54, size: 2, opacity: 0.68 },
  { left: 574, top: 172, size: 3, opacity: 0.5 },
  { left: 628, top: 76, size: 4, opacity: 0.82 },
  { left: 684, top: 248, size: 2, opacity: 0.44 },
  { left: 742, top: 112, size: 3, opacity: 0.62 },
  { left: 798, top: 334, size: 2, opacity: 0.42 },
  { left: 856, top: 62, size: 2, opacity: 0.7 },
  { left: 914, top: 206, size: 4, opacity: 0.74 },
  { left: 972, top: 126, size: 2, opacity: 0.46 },
  { left: 1034, top: 304, size: 3, opacity: 0.58 },
  { left: 1094, top: 84, size: 3, opacity: 0.76 },
  { left: 1142, top: 226, size: 2, opacity: 0.48 },
  { left: 84, top: 486, size: 2, opacity: 0.36 },
  { left: 164, top: 558, size: 3, opacity: 0.62 },
  { left: 268, top: 514, size: 2, opacity: 0.48 },
  { left: 442, top: 566, size: 3, opacity: 0.52 },
  { left: 704, top: 536, size: 2, opacity: 0.4 },
  { left: 884, top: 574, size: 3, opacity: 0.56 },
  { left: 1006, top: 486, size: 2, opacity: 0.44 },
  { left: 1128, top: 552, size: 3, opacity: 0.64 },
] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "black",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -170,
            left: 210,
            width: 780,
            height: 490,
            borderRadius: 999,
            backgroundImage:
              "radial-gradient(circle at center, rgba(92, 155, 255, 0.36) 0%, rgba(92, 155, 255, 0.14) 38%, rgba(0, 0, 0, 0) 72%)",
          }}
        />

        {stars.map((star) => (
          <div
            key={`${star.left}-${star.top}`}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: 999,
              backgroundColor: "white",
              opacity: star.opacity,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "72px 96px 84px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "0.34em",
              lineHeight: 1,
            }}
          >
            SLEEP
          </div>

          <div
            style={{
              width: 940,
              display: "flex",
              marginTop: 142,
              textAlign: "center",
              fontSize: 76,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            Wind down, drift off, wake up clear
          </div>
        </div>
      </div>
    ),
    size,
  );
}
