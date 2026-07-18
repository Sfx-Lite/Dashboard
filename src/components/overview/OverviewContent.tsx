import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

export default function OverviewContent() {
  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="grid grid-cols-4 gap-[var(--spacing-screen-x)]">
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Total users
          </p>

          <p className="font-rh-b text-[33px]">
            142
          </p>

          <p className="text-sfx-success">
            <span className="inline-block">
              ▲
            </span>{" "}
            <span className="inline-block">
              18 this week
            </span>
          </p>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Pending kyc
          </p>

          <p className="font-rh-b text-[33px]">
            7
          </p>

          <p className="text-sfx-success">
            {/* <span className="inline-block">
              ▲
            </span> */}
            <span className="inline-block text-sfx-amber">
              oldest 14 h
            </span>
          </p>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Volume 7 days
          </p>

          <p className="font-rh-b text-[33px]">
            $4,218
          </p>

          <p className="text-sfx-success">
            <span className="inline-block">
              ▲
            </span>{" "}
            <span className="inline-block">
              22%
            </span>
          </p>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Master wallet
          </p>

          <p className="font-rh-b text-[33px]">
            1,904 usdc
          </p>

          <p className="text-sfx-success">
            <span className="inline-block">
              Reconciled
            </span>{" "}
            <span className="inline-block">
              ✓
            </span>
          </p>
        </div>
      </div>

      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">
                Recent Activity
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Type
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Amount
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Status
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-[11px] px-[16px]">
                @kwame → @amara
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                Internal transfer
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                $25.00
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block bg-sfx-success/20 text-sfx-success rounded-full py-[2px] px-[10px]">
                  Sucesssful
                </span>
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                2:31pm
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}