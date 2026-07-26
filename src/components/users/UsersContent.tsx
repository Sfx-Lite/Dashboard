import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

export default function UsersContent() {
  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">
                User
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Email
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Country
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Kyc
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Balance
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Status
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-[11px] px-[16px]">
                <b>Amara Okafor</b> · @amara
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                amara@sfx.app
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                🇳🇬 NG
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block font-rh-sb bg-sfx-success-bg text-sfx-success rounded-full py-[2px] px-[10px]">
                  Verified
                </span>
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                $103.40
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block font-rh-sb bg-sfx-success-bg text-sfx-success rounded-full py-[2px] px-[10px]">
                  Active
                </span>
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <button className="py-[10px] px-[20px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full">
                  View
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}