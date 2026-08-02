// import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { useGetReconciliationQuery } from "../../api/dashboard";
import { useGetTransactionsQuery, type TransactionStatus } from "../../api/transactions";
import { getErrorMessage } from "../../utils/errors";
import StatCardSkeleton from "../loaders/StatCardSkeleton";
import StatCardError from "../global/errors/StatCardError";

const SWEEP_STATUS_BADGE: Record<TransactionStatus, string> = {
  successful: "bg-sfx-success-bg text-sfx-success",
  pending: "bg-sfx-amber-bg text-sfx-amber",
  processing: "bg-sfx-amber-bg text-sfx-amber",
  failed: "bg-sfx-danger-bg text-sfx-danger",
};

function sweepStatusLabel(status: TransactionStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MasterWalletContent() {
  const {
    data: recon,
    isLoading: isReconLoading,
    isError: isReconError,
    refetch: refetchRecon,
  } = useGetReconciliationQuery();

  const {
    data: sweeps,
    isLoading: isSweepsLoading,
    isFetching: isSweepsFetching,
    isError: isSweepsError,
    error: sweepsError,
    refetch: refetchSweeps,
  } = useGetTransactionsQuery({ type: "sweep", limit: 20, offset: 0 });

  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="grid grid-cols-4 gap-[var(--spacing-screen-x)]">
        {isReconLoading && (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}

        {!isReconLoading && isReconError && (
          <>
            <StatCardError label="Master wallet USDC" onRetry={refetchRecon} />
            <StatCardError label="Unswept on deposit addrs" onRetry={refetchRecon} />
            <StatCardError label="Σ user balances" onRetry={refetchRecon} />
            <StatCardError label="Reconciliation" onRetry={refetchRecon} />
          </>
        )}

        {!isReconLoading && !isReconError && recon && (
          <>
            <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Master wallet {recon.asset.toLowerCase()}
              </p>
              <p className="font-rh-b text-[33px]">
                {parseFloat(recon.masterBalance).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Unswept on deposit addrs
              </p>
              <p className="font-rh-b text-[33px]">
                {parseFloat(recon.unsweptBalance).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Σ user balances
              </p>
              <p className="font-rh-b text-[33px]">
                {parseFloat(recon.liabilities).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-sfx-muted text-sm">from ledger</p>
            </div>

            <div
              className={`bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] border-2 h-fit w-full space-y-[var(--spacing-gutter)] ${
                recon.healthy ? "border-sfx-success" : "border-sfx-danger"
              }`}
            >
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Reconciliation
              </p>
              <p
                className={`font-rh-b text-[33px] ${
                  recon.healthy ? "text-sfx-success" : "text-sfx-danger"
                }`}
              >
                {recon.healthy ? "✓ Healthy" : "⚠ Discrepancy"}
              </p>
              <p className={recon.healthy ? "text-sfx-success" : "text-sfx-danger"}>
                <span className="inline-block">
                  {parseFloat(recon.liabilities).toLocaleString(undefined, { minimumFractionDigits: 2 })} ≤{" "}
                  {parseFloat(recon.custody).toLocaleString(undefined, { minimumFractionDigits: 2 })} · ran{" "}
                  {new Date(recon.checkedAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      {!isReconLoading && !isReconError && recon && !recon.healthy && (
        <div className="bg-sfx-danger/10 border border-sfx-danger rounded-[var(--radius-card)] p-[var(--spacing-card-pad)]">
          <p className="font-rh-sb text-sfx-danger">Reconciliation discrepancy detected</p>
          <p className="text-sfx-muted text-sm">
            Liabilities ({recon.liabilities} {recon.asset}) exceed custody (
            {recon.custody} {recon.asset}) by {recon.difference} {recon.asset}.
          </p>
        </div>
      )}

      <div className="w-full">
        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">Sweep history</TableHead>
              <TableHead className="py-[11px] px-[16px]">From Address</TableHead>
              <TableHead className="py-[11px] px-[16px]">Amount</TableHead>
              <TableHead className="py-[11px] px-[16px]">Status</TableHead>
              <TableHead className="py-[11px] px-[16px]">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSweepsLoading && (
              <TableRow>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableCell key={i} className="py-[11px] px-[16px]">
                    <div className="h-[16px] w-full max-w-[100px] rounded-full bg-black/10 animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            )}

            {!isSweepsLoading && isSweepsError && (
              <TableRow>
                <TableCell colSpan={5} className="py-[24px] px-[16px]">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-sfx-muted">
                      {getErrorMessage(sweepsError, "Couldn't load sweep history.")}
                    </span>
                    <button
                      onClick={() => refetchSweeps()}
                      className="text-sfx-primary text-sm font-rh-sb underline"
                    >
                      Retry
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isSweepsLoading && !isSweepsError && sweeps?.items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-[24px] px-[16px] text-center text-sfx-muted">
                  No sweeps recorded yet.
                </TableCell>
              </TableRow>
            )}

            {!isSweepsLoading && !isSweepsError && sweeps && sweeps.items.length > 0 && (
              sweeps.items.map((sweep) => (
                <TableRow key={sweep.id} className={isSweepsFetching ? "opacity-60" : undefined}>
                  <TableCell className="py-[11px] px-[16px]">
                    SWP-{sweep.id.split("-")[0].toUpperCase()}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {sweep.externalAddress ? shortAddress(sweep.externalAddress) : "—"}
                    {sweep.fromUsername ? ` (@${sweep.fromUsername})` : ""}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {parseFloat(sweep.amount).toFixed(2)} {sweep.asset}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <span
                      className={`inline-block font-rh-sb rounded-full py-[2px] px-[10px] ${SWEEP_STATUS_BADGE[sweep.status]}`}
                    >
                      {sweepStatusLabel(sweep.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {formatTime(sweep.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}