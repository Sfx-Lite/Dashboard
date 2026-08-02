/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";
import TransactionContent from "../components/transactions/TransactionContent";

type OutletContext = {
  search: string;
  types: string[];
  statuses: string[];
};

const PAGE_SIZE = 20;

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>();
  const { search, types, statuses } = useOutletContext<OutletContext>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(setTitle("Transactions"));
  }, [dispatch]);

  useEffect(() => {
    setOffset(0);
  }, [search, types, statuses]);

  return (
    <div className="space-y-[var(--spacing-gutter)]">
      <div className="py-[var(--spacing-screen-x)] px-[22px]">
        <TransactionContent
          search={search}
          type={types[0]}
          status={statuses[0]}
          offset={offset}
          pageSize={PAGE_SIZE}
          onOffsetChange={setOffset}
        />
      </div>
    </div>
  );
}