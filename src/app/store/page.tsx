import { SHOT_WIDTH, StoreFrame } from "@/components/store/StoreFrame";
import { storeShots } from "@/data/store";

type StorePageProps = {
  searchParams: Promise<{ only?: string; bare?: string }>;
};

/**
 * The App Store screenshot set.
 *
 * `/store` stacks the set for review. `?only=03` renders one frame on its
 * own; `?bare=1` drops the labels, which is what the Figma capture loads.
 */
export default async function StorePage({ searchParams }: StorePageProps) {
  const { only, bare } = await searchParams;
  const shots = only
    ? storeShots.filter((shot) => shot.id.startsWith(only))
    : storeShots;

  return (
    <main id="main" className="bg-void" style={{ width: SHOT_WIDTH }}>
      {shots.map((shot) => (
        <div key={shot.id}>
          {only || bare ? null : (
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