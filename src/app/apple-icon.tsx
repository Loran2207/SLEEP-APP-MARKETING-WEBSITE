import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.tsx, sized for an iOS home screen on the pure black canvas.
export default function AppleIcon() {
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
            width: "116px",
            height: "116px",
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
              top: "-12px",
              left: "38px",
              width: "108px",
              height: "108px",
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
