function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-card bg-black/10 ${className}`} />
  );
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-[14px] animate-pulse rounded-full bg-black/10 ${className}`} />
  );
}

export default function KycDetailSkeleton() {
  return (
    <div className="flex h-[calc(100vh-110px)] gap-[18px] py-screen-x px-5.5">
      <div className="flex h-full w-[60%] gap-[18px]">
        <div className="w-1/2 rounded-card bg-sfx-card p-[18px] space-y-2">
          <SkeletonLine className="w-[160px]" />
          <SkeletonBlock className="h-[330px] w-full" />
          <SkeletonLine className="w-[220px]" />
        </div>

        <div className="w-1/2 rounded-card bg-sfx-card p-[18px] space-y-2">
          <SkeletonLine className="w-[100px]" />
          <SkeletonBlock className="h-[330px] w-full" />
          <SkeletonLine className="w-[180px]" />
        </div>
      </div>

      <div className="flex w-[40%] flex-col gap-6">
        <div className="flex-1 rounded-card bg-sfx-card p-[18px] space-y-[18px]">
          <SkeletonLine className="w-[130px]" />

          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <SkeletonLine className="w-[60px]" />
              <SkeletonLine className="w-[140px]" />
            </li>
            <li className="flex items-center justify-between">
              <SkeletonLine className="w-[70px]" />
              <SkeletonLine className="w-[90px]" />
            </li>
            <li className="flex items-center justify-between">
              <SkeletonLine className="w-[50px]" />
              <SkeletonLine className="w-[80px]" />
            </li>
          </ul>
        </div>

        <div className="flex-1 rounded-card bg-sfx-card p-[18px] space-y-[18px]">
          <SkeletonLine className="w-[90px]" />

          <div className="space-y-4">
            <SkeletonLine className="w-[240px]" />
            <SkeletonBlock className="h-[72px] w-full" />
            <div className="flex items-center gap-[10px]">
              <SkeletonBlock className="h-[42px] w-full !rounded-full" />
              <SkeletonBlock className="h-[42px] w-full !rounded-full" />
            </div>
            <SkeletonLine className="w-full max-w-[280px]" />
          </div>
        </div>
      </div>
    </div>
  );
}