import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

export default function TransactionContent() {
  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">
                Ref
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Type
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                From → To
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Amount
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Fee
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Status
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Tx Hash
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-[11px] px-[16px]">
                SFX-8241
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                Internal
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                @amara → @kwame
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                $25.00
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                $0.00
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block font-rh-sb bg-sfx-success-bg text-sfx-success rounded-full py-[2px] px-[10px]">
                  Successful
                </span>
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                — ledger
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                2:31 pm
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}