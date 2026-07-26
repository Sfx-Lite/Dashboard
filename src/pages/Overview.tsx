import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";

import OverviewContent from "../components/overview/OverviewContent";

export default function Overview() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setTitle('Overview'))
  }, [dispatch])

  return (
    <div className="space-y-[var(--spacing-gutter)]">
      <div className="py-[var(--spacing-screen-x)] px-[22px]">
        <OverviewContent />
      </div>
    </div>
  );
}
