import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The brand mark: the app's white moon disc with a crescent carved out of it.
// Satori requires an explicit display on every element that has children, so
// every div below sets one even when it holds a single child.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            overflow: "hidden",
            background:
              "radial-gradient(circle at 34% 28%, #ffffff 0%, #f2f4f8 60%, #dceaff 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "-3px",
              left: "9px",
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "#000000",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
