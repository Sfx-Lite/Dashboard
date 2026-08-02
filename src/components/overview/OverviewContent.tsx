import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import {
  useGetDashboardMetricsQuery,
  useGetRevenueQuery,
  useGetReconciliationQuery,
} from "../../api/dashboard";
import { useGetTransactionsQuery, type TransactionStatus } from "../../api/transactions";
import { getErrorMessage } from "../../utils/errors";
import { Link } from "react-router";

function StatCardSkeleton() {
  return (
    <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
      <div className="h-[14px] w-[100px] animate-pulse rounded-full bg-black/10" />
      <div className="h-[33px] w-[80px] animate-pulse rounded-full bg-black/10" />
      <div className="h-[16px] w-[120px] animate-pulse rounded-full bg-black/10" />
    </div>
  );
}

function StatCardError({ label, onRetry }: { label: string; onRetry: () => void }) {
  return (
    <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
      <p className="uppercase text-[14px] font-rh-b text-sfx-muted">{label}</p>
      <p className="text-sfx-danger text-sm">Couldn't load this.</p>
      <button
        onClick={onRetry}
        className="text-sfx-primary text-sm font-rh-sb underline"
      >
        Retry
      </button>
    </div>
  );
}

function formatUsd(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const RECENT_STATUS_BADGE: Record<TransactionStatus, string> = {
  successful: "bg-sfx-success-bg text-sfx-success",
  pending: "bg-sfx-amber-bg text-sfx-amber",
  processing: "bg-sfx-amber-bg text-sfx-amber",
  failed: "bg-sfx-danger-bg text-sfx-danger",
};

function recentStatusLabel(status: TransactionStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function recentTypeLabel(type: string) {
  const labels: Record<string, string> = {
    deposit: "Deposit",
    internal_transfer: "Internal transfer",
    withdrawal: "Withdrawal",
    sweep: "Sweep",
  };
  return labels[type] ?? type;
}

function formatRecentTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OverviewContent() {
  const {
    data: metrics,
    isLoading: isMetricsLoading,
    isError: isMetricsError,
    refetch: refetchMetrics,
  } = useGetDashboardMetricsQuery();

  const {
    data: revenue,
    isLoading: isRevenueLoading,
    isError: isRevenueError,
    refetch: refetchRevenue,
  } = useGetRevenueQuery();

  const {
    data: reconciliation,
    isLoading: isReconLoading,
    isError: isReconError,
    error: reconError,
    refetch: refetchRecon,
  } = useGetReconciliationQuery();

  const {
    data: recentTx,
    isLoading: isRecentTxLoading,
    isError: isRecentTxError,
    error: recentTxError,
    refetch: refetchRecentTx,
  } = useGetTransactionsQuery({ limit: 5, offset: 0 });

  return (
    <section className="flex flex-col gap-[var(--spacing-screen-x)]">
      <div className="grid grid-cols-4 gap-[var(--spacing-screen-x)]">
        {isMetricsLoading && (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}

        {!isMetricsLoading && isMetricsError && (
          <>
            <StatCardError label="Total users" onRetry={refetchMetrics} />
            <StatCardError label="Pending kyc" onRetry={refetchMetrics} />
          </>
        )}

        {!isMetricsLoading && !isMetricsError && metrics && (
          <>
            <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Total users
              </p>
              <p className="font-rh-b text-[33px]">
                {metrics.users.total.toLocaleString()}
              </p>
              <p className="text-sfx-muted text-sm">
                {metrics.users.active.toLocaleString()} active ·{" "}
                {metrics.users.inactive.toLocaleString()} inactive
              </p>
            </div>

            <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
              <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
                Pending kyc
              </p>
              <p className="font-rh-b text-[33px]">{metrics.pendingKyc}</p>
              <p className="text-sfx-muted text-sm">
                {metrics.pendingKyc === 0 ? "All caught up" : "Awaiting review"}
              </p>
            </div>
          </>
        )}

        {isRevenueLoading && <StatCardSkeleton />}
        {!isRevenueLoading && isRevenueError && (
          <StatCardError label="Volume" onRetry={refetchRevenue} />
        )}
        {!isRevenueLoading && !isRevenueError && revenue && (
          <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
            <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
              Volume
            </p>
            <p className="font-rh-b text-[33px]">
              {formatUsd(revenue.totalVolume)}
            </p>
            <p className="text-sfx-muted text-sm">
              {revenue.totalTransactions.toLocaleString()} transactions
            </p>
          </div>
        )}

        {isReconLoading && <StatCardSkeleton />}
        {!isReconLoading && isReconError && (
          <StatCardError label="Master wallet" onRetry={refetchRecon} />
        )}
        {!isReconLoading && !isReconError && reconciliation && (
          <div className="bg-sfx-card p-[var(--spacing-card-pad)] rounded-[var(--radius-card)] h-fit w-full space-y-[var(--spacing-gutter)]">
            <p className="uppercase text-[14px] font-rh-b text-sfx-muted">
              Master wallet
            </p>
            <p className="font-rh-b text-[33px]">
              {parseFloat(reconciliation.masterBalance).toLocaleString()} {reconciliation.asset.toLowerCase()}
            </p>
            <p className={reconciliation.healthy ? "text-sfx-success" : "text-sfx-danger"}>
              <span className="inline-block">
                {reconciliation.healthy ? "Reconciled" : "Discrepancy"}
              </span>{" "}
              <span className="inline-block">
                {reconciliation.healthy ? "✓" : "⚠"}
              </span>
            </p>
          </div>
        )}
      </div>

      {!isReconLoading && !isReconError && reconciliation && !reconciliation.healthy && (
        <div className="bg-sfx-danger/10 border border-sfx-danger rounded-[var(--radius-card)] p-[var(--spacing-card-pad)]">
          <p className="font-rh-sb text-sfx-danger">
            Reconciliation discrepancy detected
          </p>
          <p className="text-sfx-muted text-sm">
            Liabilities ({reconciliation.liabilities} {reconciliation.asset}) exceed custody (
            {reconciliation.custody} {reconciliation.asset}) by {reconciliation.difference}{" "}
            {reconciliation.asset}. Checked {new Date(reconciliation.checkedAt).toLocaleString()}.
          </p>
        </div>
      )}

      {isReconError && (
        <p className="text-sfx-danger text-sm">
          {getErrorMessage(reconError, "Couldn't verify wallet reconciliation.")}
        </p>
      )}

      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-rh-sb text-sfx-muted">Recent Activity</span>
          <Link to="/transactions" className="text-sfx-primary text-sm font-rh-sb">
            View all
          </Link>
        </div>

        <Table className="bg-white/80 rounded-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="py-[11px] px-[16px]">Recent Activity</TableHead>
              <TableHead className="py-[11px] px-[16px]">Type</TableHead>
              <TableHead className="py-[11px] px-[16px]">Amount</TableHead>
              <TableHead className="py-[11px] px-[16px]">Status</TableHead>
              <TableHead className="py-[11px] px-[16px]">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isRecentTxLoading && (
              <TableRow>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableCell key={i} className="py-[11px] px-[16px]">
                    <div className="h-[16px] w-full max-w-[100px] rounded-full bg-black/10 animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            )}

            {!isRecentTxLoading && isRecentTxError && (
              <TableRow>
                <TableCell colSpan={5} className="py-[24px] px-[16px]">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-sfx-muted">
                      {getErrorMessage(recentTxError, "Couldn't load recent activity.")}
                    </span>
                    <button
                      onClick={() => refetchRecentTx()}
                      className="text-sfx-primary text-sm font-rh-sb underline"
                    >
                      Retry
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isRecentTxLoading && !isRecentTxError && recentTx?.items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-[24px] px-[16px] text-center text-sfx-muted">
                  No transactions recorded yet.
                </TableCell>
              </TableRow>
            )}

            {!isRecentTxLoading && !isRecentTxError && recentTx && recentTx.items.length > 0 && (
              recentTx.items.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="py-[11px] px-[16px]">
                    {tx.fromUsername ? `@${tx.fromUsername}` : "—"}
                    {" → "}
                    {tx.toUsername ? `@${tx.toUsername}` : tx.externalAddress ? `${tx.externalAddress.slice(0, 6)}…` : "—"}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {recentTypeLabel(tx.type)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    <span
                      className={`inline-block font-rh-sb rounded-full py-[2px] px-[10px] ${RECENT_STATUS_BADGE[tx.status]}`}
                    >
                      {recentStatusLabel(tx.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-[11px] px-[16px]">
                    {formatRecentTime(tx.createdAt)}
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