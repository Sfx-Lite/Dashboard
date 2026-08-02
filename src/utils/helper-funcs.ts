import type { KycSubmission } from "../api/kyc";

export function formatSubmittedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function waitingHoursSince(iso: string): number {
  const created = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.round((now - created) / (1000 * 60 * 60)));
}

export function waitingColor(hours: number): string {
  if (hours >= 24) return "text-red-500";
  if (hours >= 12) return "text-sfx-amber";
  return "text-sfx-muted";
}

export function docTypeLabel(docType: string): string {
  const labels: Record<string, string> = {
    national_id: "National ID",
    passport: "Passport",
    drivers_license: "Driver's license",
  };
  return labels[docType] ?? docType;
}


export function withAttemptNumbers(
  submissions: KycSubmission[]
): (KycSubmission & { attemptNumber: number })[] {
  const countByUser = new Map<string, number>();

  return submissions.map((submission) => {
    const nextAttempt = (countByUser.get(submission.userId) ?? 0) + 1;
    countByUser.set(submission.userId, nextAttempt);
    return { ...submission, attemptNumber: nextAttempt };
  });
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function fullName(user: { firstName: string | null; lastName: string | null }): string {
  const parts = [user.firstName, user.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}