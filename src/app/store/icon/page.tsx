import { AppIcon, ICON_SIZE } from "@/components/store/AppIcon";

/**
 * The app icon at export size. `?bare=1` drops everything around it, which is
 * what the Figma capture loads.
 */
export default async function IconPage({
  searchParams,
}: {
  searchParams: Promise<{ bare?: string }>;
}) {
  const { bare } = await searchParams;

  return (
    <main id="main" className="bg-void" style={{ width: ICON_SIZE }}>
      {bare ? null : (
        <p className="px-[40px] py-[28px] text-[22px] text-faint">
          App icon · {ICON_SIZE} x {ICON_SIZE}
        </p>
      )}

      <AppIcon id="app-icon" />

      {bare ? null : (
        <div className="flex items-end gap-[36px] px-[40px] py-[48px]">
          {[180, 120, 60, 40].map((size) => (
            <div key={size} className="flex flex-col items-center gap-3">
              <div
                style={{
                  width: size,
                  height: size,
                  borderRadius: size * 0.2237,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    transform: `scale(${size / ICON_SIZE})`,
                    transformOrigin: "top left",
                  }}
                >
                  <AppIcon />
                </div>
              </div>
              <span className="text-[18px] text-faint">{size}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}