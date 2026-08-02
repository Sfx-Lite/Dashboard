export default function StatCardSkeleton() {
  return (
    <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
      <div className="h-[14px] w-[130px] animate-pulse rounded-full bg-black/10" />
      <div className="h-[33px] w-[90px] animate-pulse rounded-full bg-black/10" />
      <div className="h-[16px] w-[140px] animate-pulse rounded-full bg-black/10" />
    </div>
  );
}