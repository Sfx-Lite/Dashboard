import { TableRow, TableCell } from "../ui/table";

export default function SkeletonRows() {
    
const COLUMN_COUNT = 7;

  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: COLUMN_COUNT }).map((_, cellIndex) => (
            <TableCell key={cellIndex} className="py-[11px] px-[16px]">
              <div className="h-[16px] w-full max-w-[120px] rounded-full bg-black/10 animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}