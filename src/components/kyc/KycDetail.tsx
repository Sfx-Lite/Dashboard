import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { AnimatePresence } from "motion/react";

import { setTitle } from "../../store/topBarSlice";
import type { AppDispatch } from "../../store";
import {
  useGetKycSubmissionQuery,
  useReviewKycSubmissionMutation,
} from "../../api/kyc";
import { getErrorMessage } from "../../utils/errors";
import { docTypeLabel } from "../../utils/helper-funcs";
import KycDetailSkeleton from "../loaders/KycDetailSkeleton";
import ImageZoomModal from "../../components/kyc/ImageZoomModal";
import { trackEvent } from "../../utils/trackEvent";

type ZoomTarget = { src: string; alt: string } | null;

export default function KycDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [zoomTarget, setZoomTarget] = useState<ZoomTarget>(null);

  const {
    data: submission,
    isLoading,
    isError,
    error,
  } = useGetKycSubmissionQuery(id ?? "", {
    skip: !id,
  });

  const [reviewSubmission, { isLoading: isSubmitting }] =
    useReviewKycSubmissionMutation();

  useEffect(() => {
    if (submission) {
      dispatch(setTitle(`Review — ${submission.userId}`));
    }
  }, [submission, dispatch]);

  const handleDecision = async (
    status: "approved" | "rejected"
  ) => {
    if (!id) return;

    if (status === "rejected" && !reason.trim()) {
      toast.error("A rejection reason is required.");
      return;
    }

    try {
      await reviewSubmission({
        id,
        body: {
          status,
          reason: reason.trim() || undefined,
        },
      }).unwrap();

      if (status === "approved") {
        trackEvent("kyc_approved", { submission_id: id });
      }
      else {
        trackEvent("kyc_rejected", { reason: reason.trim(), submission_id: id });
      }

      toast.success(
        status === "approved"
          ? "Submission approved"
          : "Submission rejected"
      );

      navigate("/kyc-review");
    } catch (err) {
      toast.error(
        getErrorMessage(err, "Couldn't save this decision.")
      );
    }
  };

  if (isLoading) {
    return <KycDetailSkeleton />;
  }

  if (isError || !submission) {
    return (
      <div className="flex flex-col items-center gap-3 py-[32px] text-center">
        <span className="text-sfx-muted">
          {getErrorMessage(error, "Couldn't load this submission.")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-110px)] gap-[18px] px-5.5 py-screen-x">
      <div className="flex h-full w-[60%] gap-[18px]">
        <div className="w-1/2 rounded-card bg-sfx-card p-[18px] space-y-2">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Document · {docTypeLabel(submission.docType)}
          </h3>

          <button
            type="button"
            onClick={() =>
              setZoomTarget({ src: submission.docUrl, alt: "Submitted document" })
            }
            className="flex h-[330px] w-full items-center justify-center overflow-hidden rounded-card bg-sfx-primary-tint"
          >
            <img
              src={submission.docUrl}
              alt="Submitted document"
              className="h-full w-full object-cover"
            />
          </button>

          <p className="text-sfx-muted">
            Signed URL · expires in 10 min · zoom on click
          </p>
        </div>

        <div className="w-1/2 rounded-card bg-sfx-card p-[18px] space-y-2">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Selfie
          </h3>

          <button
            type="button"
            onClick={() =>
              setZoomTarget({ src: submission.selfieUrl, alt: "Selfie" })
            }
            className="flex h-[330px] w-full items-center justify-center overflow-hidden rounded-card bg-sfx-primary-tint"
          >
            <img
              src={submission.selfieUrl}
              alt="Selfie"
              className="h-full w-full object-cover"
            />
          </button>

          <p className="text-sfx-muted">
            Compare face to document photo
          </p>
        </div>
      </div>

      <div className="flex w-[40%] flex-col gap-6">
        <div className="flex-1 rounded-card bg-sfx-card p-[18px] space-y-[18px]">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Profile Details
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span>User ID</span>
              <span className="font-rh-b text-sm">
                {submission.userId}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span>Submitted</span>
              <span className="font-rh-b">
                {new Date(submission.createdAt).toLocaleDateString(
                  undefined,
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span>Status</span>
              <span className="font-rh-b capitalize">
                {submission.status.replace("_", " ")}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex-1 rounded-card bg-sfx-card p-[18px] space-y-[18px]">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Decision
          </h3>

          <div className="space-y-4">
            <p className="text-sfx-muted">
              Rejection reason (required if rejecting)
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Document photo is blurry"
              rows={3}
              className="w-full rounded-card border border-sfx-muted/30 p-3 text-sm"
            />

            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                onClick={() => handleDecision("rejected")}
                disabled={isSubmitting}
                className="w-full rounded-full bg-sfx-danger py-[10px] font-rh-sb text-sfx-card disabled:opacity-60"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => handleDecision("approved")}
                disabled={isSubmitting}
                className="w-full rounded-full bg-sfx-success py-[10px] font-rh-sb text-sfx-card disabled:opacity-60"
              >
                Approve
              </button>
            </div>

            <p className="text-sfx-muted">
              Decision notifies the user and is written to the audit log.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomTarget && (
          <ImageZoomModal
            src={zoomTarget.src}
            alt={zoomTarget.alt}
            onClose={() => setZoomTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}