import { useGetUsersQuery } from "../../api/users";
import { getErrorMessage } from "../../utils/errors";
import { fullName } from "../../utils/helper-funcs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import SkeletonRows from "../loaders/SkeletonRows";

const COLUMN_COUNT = 6;

const KYC_BADGE: Record<string, string> = {
  verified: "bg-sfx-success-bg text-sfx-success",
  pending: "bg-sfx-amber-bg text-sfx-amber",
  unverified: "bg-black/5 text-sfx-muted",
  rejected: "bg-sfx-danger-bg text-sfx-danger",
};

function kycLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

type UsersContentProps = {
  search: string;
  offset: number;
  pageSize: number;
  onOffsetChange: (offset: number) => void;
};

export default function UsersContent({
  search,
  offset,
  pageSize,
  onOffsetChange,
}: UsersContentProps) {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetUsersQuery({
      limit: pageSize,
      offset,
      search: search || undefined,
    });

  const users = data?.users;
  const total = data?.total ?? 0;
  const hasNextPage = offset + pageSize < total;
  const hasPrevPage = offset > 0;

  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">User</TableHead>
              <TableHead className="py-[11px] px-[16px]">Email</TableHead>
              <TableHead className="py-[11px] px-[16px]">Country</TableHead>
              <TableHead className="py-[11px] px-[16px]">Kyc</TableHead>
              <TableHead className="py-[11px] px-[16px]">Status</TableHead>
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
                      {getErrorMessage(error, "Couldn't load users.")}
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

            {!isLoading && !isError && users?.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="py-[32px] px-[16px]">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-rh-sb">No users found</span>
                    <span className="text-sfx-muted text-sm">
                      {search
                        ? `No results for "${search}".`
                        : "No users match the current filters."}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && users && users.length > 0 && (
              users.map((user) => (
                <TableRow key={user.id} className={isFetching ? "opacity-60" : undefined}>
                  <TableCell className="py-[11px] px-[16px]">
                    <b>{fullName(user)}</b> · @{user.username}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {user.country ?? "—"}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <span
                      className={`inline-block font-rh-sb rounded-full py-[2px] px-[10px] ${
                        KYC_BADGE[user.kycStatus] ?? "bg-black/5 text-sfx-muted"
                      }`}
                    >
                      {kycLabel(user.kycStatus)}
                    </span>
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <span
                      className={`inline-block font-rh-sb rounded-full py-[2px] px-[10px] ${
                        user.suspended
                          ? "bg-sfx-danger-bg text-sfx-danger"
                          : "bg-sfx-success-bg text-sfx-success"
                      }`}
                    >
                      {user.suspended ? "Suspended" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <button className="py-[10px] px-[20px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && !isError && total > pageSize && (
        <div className="flex items-center justify-between">
          <span className="text-sfx-muted text-sm">
            Showing {Math.min(offset + 1, total)}–{Math.min(offset + pageSize, total)} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={!hasPrevPage}
              onClick={() => onOffsetChange(Math.max(0, offset - pageSize))}
              className="py-[8px] px-[16px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={!hasNextPage}
              onClick={() => onOffsetChange(offset + pageSize)}
              className="py-[8px] px-[16px] font-rh-sb text-sfx-primary border-2 border-sfx-primary bg-sfx-card rounded-full disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}