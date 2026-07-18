import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";
import KycContent from "../components/kyc/KycContent";
// import KycDetail from "../components/kyc/KycDetail";

export default function KycReview() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTitle('KYC review queue'))
  }, [dispatch])

  return (
    <div className="space-y-(--spacing-gutter)">
          <div className="py-[var(--spacing-screen-x)] px-[22px]">
            <KycContent />
            {/* <KycDetail /> */}
          </div>
        </div>
  );
}
