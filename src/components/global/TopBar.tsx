import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AdminProfile from "./AdminProfile";
import type { RootState } from "../../store";

export type TopBarProps = {
    searchValue: string;
    onSearchChange: (value: string) => void
}

export default function TopBar({ searchValue, onSearchChange }: TopBarProps) {
    const title = useSelector((state: RootState) => state.topBar.title)
    const location = useLocation()
    const isUsersPage = location.pathname === "/users"

  return (
    <div className="py-[14px] px-[var(--spacing-screen-x)] flex items-center justify-between bg-sfx-card">
        <div className="flex items-center gap-4">
            <h2 className="font-rh-b text-[20px]">
                { title }
            </h2>
            {
                isUsersPage && (
                    <div className="w-[250px] flex items-center gap-2 py-[8px] px-[14px] border-2 border-sfx-muted rounded-full">
                        <span className="inline-block text-[17px]">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="Search username or email"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                )
            }
        </div>
        
        <AdminProfile />
    </div>
  )
}