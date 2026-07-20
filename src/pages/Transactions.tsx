import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import TransactionContent from "../components/transactions/TransactionContent";
import { setTitle } from "../store/topBarSlice";

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setTitle('Transactions'))
  }, [dispatch])

  return (
    <div className="space-y-[var(--spacing-gutter)]">
          <div className="py-[var(--spacing-screen-x)] px-[22px]">
            <TransactionContent />
          </div>
        </div>
  );
}
