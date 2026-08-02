import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import {
  useGetTransactionsQuery,
  useGetTransactionDetailQuery,
  type TransactionType,
  type TransactionStatus,
} from "../../api/transactions";
import { getErrorMessage } from "../../utils/errors";
import SkeletonRows from "../loaders/SkeletonRows";

const COLUMN_COUNT = 8;

const STATUS_BADGE: Record<TransactionStatus, string> = {
  successful: "bg-sfx-success-bg text-sfx-success",
  pending: "bg-sfx-amber-bg text-sfx-amber",
  processing: "bg-sfx-amber-bg text-sfx-amber",
  failed: "bg-sfx-danger-bg text-sfx-danger",
};

function statusLabel(status: TransactionStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function typeLabel(type: TransactionType) {
  const labels: Record<TransactionType, string> = {
    deposit: "Deposit",
    internal_transfer: "Internal",
    withdrawal: "Withdrawal",
    sweep: "Sweep",
  };
  return labels[type];
}

function shortRef(id: string) {
  return id.split("-")[0].toUpperCase();
}

function shortHash(hash: string) {
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

type TransactionContentProps = {
  search: string;
  type?: string;
  status?: string;
  offset: number;
  pageSize: number;
  onOffsetChange: (offset: number) => void;
};

export default function TransactionContent({
  search,
  type,
  status,
  offset,
  pageSize,
  onOffsetChange,
}: TransactionContentProps) {
  const [detailId, setDetailId] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useGetTransactionsQuery({
    limit: pageSize,
    offset,
    search: search || undefined,
    type: (type as TransactionType) || undefined,
    status: (status as TransactionStatus) || undefined,
  });

  const items = data?.items;
  const total = data?.total ?? 0;
  const hasNextPage = offset + pageSize < total;
  const hasPrevPage = offset > 0;

  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">Ref</TableHead>
              <TableHead className="py-[11px] px-[16px]">Type</TableHead>
              <TableHead className="py-[11px] px-[16px]">From → To</TableHead>
              <TableHead className="py-[11px] px-[16px]">Amount</TableHead>
              <TableHead className="py-[11px] px-[16px]">Fee</TableHead>
              <TableHead className="py-[11px] px-[16px]">Status</TableHead>
              <TableHead className="py-[11px] px-[16px]">Tx Hash</TableHead>
              <TableHead className="py-[11px] px-[16px]">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <SkeletonRows />}

            {!isLoading && isError && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="py-[32px] px-[16px]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="text-sfx-muted">
                      {getErrorMessage(error, "Couldn't load transactions.")}
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

            {!isLoading && !isError && items?.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="py-[32px] px-[16px]">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-rh-sb">No transactions found</span>
                    <span className="text-sfx-muted text-sm">
                      {search ? `No results for "${search}".` : "No transactions match the current filters."}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && items && items.length > 0 && (
              items.map((tx) => (
                <TableRow
                  key={tx.id}
                  className={isFetching ? "opacity-60" : undefined}
                >
                  <TableCell className="py-[11px] px-[16px] font-rh-sb">
                    SFX-{shortRef(tx.id)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {typeLabel(tx.type)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {tx.fromUsername ? `@${tx.fromUsername}` : "—"}
                    {" → "}
                    {tx.toUsername ? `@${tx.toUsername}` : tx.externalAddress ? shortHash(tx.externalAddress) : "—"}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    ${parseFloat(tx.fee).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <span
                      className={`inline-block font-rh-sb rounded-full py-[2px] px-[10px] ${STATUS_BADGE[tx.status]}`}
                    >
                      {statusLabel(tx.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {tx.txHash ? (
                      <button
                        onClick={() => setDetailId(tx.id)}
                        className="text-sfx-primary underline"
                      >
                        {shortHash(tx.txHash)}
                      </button>
                    ) : (
                      <button
                        onClick={() => setDetailId(tx.id)}
                        className="text-sfx-muted underline"
                      >
                        View ledger
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {formatTime(tx.createdAt)}
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

      {detailId && (
        <TransactionDetailDrawer id={detailId} onClose={() => setDetailId(null)} />
      )}
    </section>
  );
}

function TransactionDetailDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const { data, isLoading, isError, error } = useGetTransactionDetailQuery(id);

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-[420px] overflow-y-auto bg-white p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-rh-b text-[18px]">Transaction detail</h3>
          <button onClick={onClose} className="text-sfx-muted">
            Close ✕
          </button>
        </div>

        {isLoading && <p className="text-sfx-muted">Loading...</p>}

        {isError && (
          <p className="text-sfx-danger text-sm">
            {getErrorMessage(error, "Couldn't load transaction detail.")}
          </p>
        )}

        {data && (
          <>
            <div className="rounded-card bg-sfx-card p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-sfx-muted">Reference</span>
                <span className="font-rh-b">SFX-{shortRef(data.transaction.id)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sfx-muted">Type</span>
                <span className="font-rh-b">{typeLabel(data.transaction.type)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sfx-muted">Status</span>
                <span className="font-rh-b">{statusLabel(data.transaction.status)}</span>
              </div>
              {data.transaction.note && (
                <div className="flex justify-between">
                  <span className="text-sfx-muted">Note</span>
                  <span className="font-rh-b">{data.transaction.note}</span>
                </div>
              )}
              {data.transaction.txHash && (
                <div className="flex justify-between">
                  <span className="text-sfx-muted">Tx hash</span>
                  <span className="font-rh-b">{shortHash(data.transaction.txHash)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-rh-sb uppercase text-sfx-muted text-sm">Ledger entries</h4>
              {data.ledgerEntries.map((entry) => (
                <div key={entry.id} className="rounded-card bg-sfx-card p-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sfx-muted">{entry.direction === "debit" ? "Debit" : "Credit"}</span>
                    <span className="font-rh-b">${parseFloat(entry.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sfx-muted">Balance after</span>
                    <span className="font-rh-b">${parseFloat(entry.balanceAfter).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}