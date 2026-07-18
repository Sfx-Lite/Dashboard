import { Link } from "react-router";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

export default function MasterWalletContent() {
  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="grid grid-cols-4 gap-[var(--spacing-screen-x)]">
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Master wallet usdc
          </p>

          <p className="font-rh-b text-[33px]">
            1,904.00
          </p>

          <Link to="/overview" className="text-sfx-success">
            <span className="inline-block">
              0x2Ee4…9A17
            </span>{" "}
            <span className="inline-block">
              ↗
            </span>
          </Link>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Unswept on deposit addrs
          </p>

          <p className="font-rh-b text-[33px]">
            62.00
          </p>

          <p className="text-sfx-success">
            {/* <span className="inline-block">
              ▲
            </span> */}
            <span className="inline-block text-sfx-amber">
              3 addresses queued
            </span>
          </p>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Σ user balances
          </p>

          <p className="font-rh-b text-[33px]">
            1,958.40
          </p>

          <p className="text-sfx-success">
            <span className="inline-block">
              from ledger
            </span>
          </p>
        </div>
        <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] border-2 border-sfx-success h-fit w-full space-y-[var(--spacing-gutter)]">
          <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
            Reconciliation
          </p>

          <p className="font-rh-b text-[33px] text-sfx-success">
            ✓ Healthy
          </p>

          <p className="text-sfx-success">
            <span className="inline-block">
              1,958.40 ≤ 1,966.00 · ran 06:00
            </span>
          </p>
        </div>
      </div>

      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">
                Sweep history
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                From Address
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Amount
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Gas dropped
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
                SWP-114
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                0x4B7a…51c3 (@amara)
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                50.00 USDC
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                0.02 POL
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block font-rh-sb bg-sfx-amber-bg text-sfx-amber rounded-full py-[2px] px-[10px]">
                  Processing
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