import { SHOT_WIDTH, StoreFrame } from "@/components/store/StoreFrame";
import { storeShots } from "@/data/store";

type StorePageProps = {
  searchParams: Promise<{ only?: string }>;
};

/**
 * The App Store screenshot set.
 *
 * `/store` stacks all eight frames for review. `/store?only=03` renders one
 * frame on its own, which is what the Figma capture loads: one page, one
 * frame, nothing around it to measure wrong.
 */
export default async function StorePage({ searchParams }: StorePageProps) {
  const { only } = await searchParams;
  const shots = only
    ? storeShots.filter((shot) => shot.id.startsWith(only))
    : storeShots;

  return (
    <main id="main" className="bg-void" style={{ width: SHOT_WIDTH }}>
      {shots.map((shot) => (
        <div key={shot.id}>
          {only ? null : (
            <p className="px-[96px] py-[34px] text-[26px] text-faint">
              {shot.id} · 1290 x 2796
            </p>
          )}
          <StoreFrame shot={shot} index={storeShots.indexOf(shot)} />
        </div>
      ))}
    </main>
  );
}