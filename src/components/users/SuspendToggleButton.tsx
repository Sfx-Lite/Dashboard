import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useToggleUserStatusMutation } from "../../api/users";
import { getErrorMessage } from "../../utils/errors";

type SuspendToggleButtonProps = {
  userId: string;
  username: string;
  suspended: boolean;
};

export default function SuspendToggleButton({
  userId,
  username,
  suspended,
}: SuspendToggleButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [toggleUserStatus, { isLoading }] = useToggleUserStatusMutation();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleConfirm = async () => {
    try {
      const result = await toggleUserStatus(userId).unwrap();
      toast.success(
        result.suspended
          ? `@${username} has been suspended`
          : `@${username} has been unsuspended`
      );
      setOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't update this user's status."));
    }
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`py-[10px] px-[20px] font-rh-sb rounded-full border-2 ${
          suspended
            ? "text-sfx-success border-sfx-success bg-sfx-card"
            : "text-sfx-danger border-sfx-danger bg-sfx-card"
        }`}
      >
        {suspended ? "Unsuspend" : "Suspend"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[240px] rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-4 z-20 space-y-3">
          <p className="text-sm whitespace-pre-wrap">
            {suspended
              ? `Unsuspend @${username}? They'll regain access immediately.`
              : `Suspend @${username}? They'll lose access immediately.`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1 py-[8px] rounded-full font-rh-sb text-sfx-muted border-2 border-black/10 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`flex-1 py-[8px] rounded-full font-rh-sb text-sfx-card disabled:opacity-60 ${
                suspended ? "bg-sfx-success" : "bg-sfx-danger"
              }`}
            >
              {isLoading ? "..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}