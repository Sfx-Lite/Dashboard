import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import type { AppDispatch, RootState } from "../../store";
import { logout, selectAuth } from "../../store/authSlice";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => selectAuth(state));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const initial = user?.email?.charAt(0).toUpperCase() ?? "A";
  const label = user?.email ?? "SFx Admin";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-[var(--spacing-gutter)]"
      >
        <div className="user__gradient size-[2.5rem] rounded-full flex items-center justify-center">
          <span className="font-rh-b text-white">{initial}</span>
        </div>
        <span className="inline-block font-rh-sb">{label}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[160px] rounded-2xl bg-white shadow-lg ring-1 ring-black/5 py-2 z-20"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-sfx-danger hover:bg-sfx-danger/5 transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}