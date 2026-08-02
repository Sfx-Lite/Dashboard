export default function StatCardError({ label, onRetry }: { label: string; onRetry: () => void }) {
  return (
    <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
      <p className="uppercase text-[14px] font-rh-b text-sfx-muted">{label}</p>
      <p className="text-sfx-danger text-sm">Couldn't load this.</p>
      <button onClick={onRetry} className="text-sfx-primary text-sm font-rh-sb underline">
        Retry
      </button>
    </div>
  );
}