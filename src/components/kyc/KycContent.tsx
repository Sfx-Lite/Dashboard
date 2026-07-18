import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

export default function KycContent() {
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
                Country
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Document
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Submited
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Waiting
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                Attempt
              </TableHead>
              <TableHead className="py-[11px] px-[16px]">
                
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-[11px] px-[16px]">
                <b>Zainab Bello</b> · @zee
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                🇳🇬 Nigeria
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                Passport
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                Yesterday, 11:20pm
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <span className="inline-block text-sfx-amber">14 h</span>
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                1st
              </TableCell>
              <TableCell className="py-[11px] px-[16px]">
                <button className="py-[10px] px-[20px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full">
                  Review
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}