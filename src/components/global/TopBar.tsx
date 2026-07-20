import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AdminProfile from "./AdminProfile";
import type { RootState } from "../../store";
import { TYPE_OPTIONS, STATUS_OPTIONS } from "../../lib/data";
import CustomSelect from "../Form/CustomSelect";
import { useState } from "react";

export type TopBarProps = {
    searchValue: string;
    onSearchChange: (value: string) => void
}

export default function TopBar({ searchValue, onSearchChange }: TopBarProps) {
    const [types, setTypes] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const title = useSelector((state: RootState) => state.topBar.title)
    const location = useLocation()
    const isUsersPage = location.pathname === "/users"
    const isKycPage = location.pathname === "/kyc-review"
    const isTransactionsPage = location.pathname === "/transactions"

  return (
    <div className="py-[14px] px-[var(--spacing-screen-x)] flex items-center justify-between bg-sfx-card">
        <div className="flex items-center gap-4">
            <h2 className="font-rh-b text-[20px]">
                { title }
            </h2>
            {
                isKycPage && (
                    <div className="">
                        <span className="inline-block text-[14px] text-sfx-muted">
                            Oldest first
                        </span>
                    </div>
                )
            }
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
            {
                isTransactionsPage && (
                        <div className="flex items-center gap-3">
                            <CustomSelect
                                allLabel="All types"
                                options={TYPE_OPTIONS}
                                selected={types}
                                onChange={setTypes}
                            />
                            <CustomSelect
                                allLabel="All statuses"
                                options={STATUS_OPTIONS}
                                selected={statuses}
                                onChange={setStatuses}
                            />
                        </div>
                )
            }
        </div>
        
        <AdminProfile />
    </div>
  )
}