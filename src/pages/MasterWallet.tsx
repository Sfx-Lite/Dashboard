import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";

import MasterWalletContent from "../components/wallet/MasterWalletContent";

export default function MasterWallet() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTitle('Master wallet & reconciliation'))
  }, [dispatch])

  return (
    <div className="space-y-[var(--spacing-gutter)]">
          <div className="py-[var(--spacing-screen-x)] px-[22px]">
            <MasterWalletContent />
          </div>
        </div>
  );
}
