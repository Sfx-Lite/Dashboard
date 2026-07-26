import { useGetKycSubmissionsQuery } from "../../api/kyc";
import { getErrorMessage } from "../../utils/errors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import SkeletonRows from "../loaders/SkeletonRows";
import { formatSubmittedAt, waitingColor, waitingHoursSince, docTypeLabel, withAttemptNumbers, ordinal } from "../../utils/helper-funcs";
import { Link } from "react-router";

const COLUMN_COUNT = 6;

export default function KycContent() {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetKycSubmissionsQuery({ status: "pending" });

  const rows = data ? withAttemptNumbers(data) : undefined;

  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">User</TableHead>
              <TableHead className="py-[11px] px-[16px]">Country</TableHead>
              <TableHead className="py-[11px] px-[16px]">Document</TableHead>
              <TableHead className="py-[11px] px-[16px]">Submited</TableHead>
              <TableHead className="py-[11px] px-[16px]">Waiting</TableHead>
              <TableHead className="py-[11px] px-[16px]">Attempt</TableHead>
              <TableHead className="py-[11px] px-[16px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <SkeletonRows />}

            {!isLoading && isError && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="py-[32px] px-[16px]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="text-sfx-muted">
                      {getErrorMessage(error, "Couldn't load KYC submissions.")}
                    </span>
                    <button
                      onClick={() => refetch()}
                      className="py-[8px] px-[16px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full"
                    >
                      Try again
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="py-[32px] px-[16px]">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-rh-sb">All caught up</span>
                    <span className="text-sfx-muted text-sm">
                      No pending KYC submissions right now.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && rows && rows.length > 0 && (
              rows.map((submission) => {
                const hours = waitingHoursSince(submission.createdAt);
                return (
                  <TableRow key={submission.id} className={isFetching ? "opacity-60" : undefined}>
                    <TableCell className="py-[11px] px-[16px]">
                      {submission.userId}
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px] text-sfx-muted">
                      —
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px]">
                      {docTypeLabel(submission.docType)}
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px]">
                      {formatSubmittedAt(submission.createdAt)}
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px]">
                      <span className={`inline-block ${waitingColor(hours)}`}>
                        {hours} h
                      </span>
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px]">
                      {ordinal(submission.attemptNumber)}
                    </TableCell>
                    <TableCell className="py-[11px] px-[16px]">
                      <Link
                        to={`/kyc-review/${submission.id}`}
                        className="py-[10px] px-[20px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full inline-block"
                      >
                        Review
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}