import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setTitle } from "../../store/topBarSlice";
import type { AppDispatch } from "../../store";
import type { KycUser } from "../../lib/types/kyc";

export default function KycDetail() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<KycUser | null>(null);

  useEffect(() => {
    if(!userId) return;

    axios.get<KycUser>(`/api/kyc/${userId}`)
      .then((res) => {
        setUser(res.data)
        dispatch(setTitle(`Review — ${res.data.name} `)) // TODO: Add field for username
      })
  }, [userId, dispatch])

  if(!user) return <p>Loading...</p>

  return (
    <div className="h-[calc(100vh-110px)] flex gap-[18px]">
      <div className="w-[60%] h-full flex gap-[18px]">
        <div className="w-1/2 bg-sfx-card p-[18px] rounded-card space-y-2">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Document · Passport
          </h3>

          <div className="bg-sfx-primary-tint h-[330px] rounded-card flex items-center justify-center">
            Icon goes here
          </div>

          <p className="text-sfx-muted ">
            Signed URL · expires in 10 min · zoom on click
          </p>
        </div>
        <div className="w-1/2 bg-sfx-card p-[18px] rounded-card space-y-1.5">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Selfie
          </h3>

          <div className="bg-sfx-primary-tint h-[330px] rounded-card flex items-center justify-center">
            Icon goes here
          </div>

          <p className="text-sfx-muted ">
            Compare face to document photo
          </p>
        </div>
      </div>
      <div className="w-[40%] flex flex-col gap-6">
        <div className="flex-1 space-y-[18px] bg-sfx-card rounded-card p-[18px]">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Profile Details
          </h3>

          <ul>
            <li className="flex justify-between items-center">
              <span className="inline-block">
                Name
              </span>
              <span className="inline-block font-rh-b ">
                Zainab Bello
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="inline-block">
                Country
              </span>
              <span className="inline-block font-rh-b ">
                🇳🇬 Nigeria
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="inline-block">
                Joined
              </span>
              <span className="inline-block font-rh-b ">
                3 Jul 2026
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="inline-block">
                Attempt
              </span>
              <span className="inline-block font-rh-b ">
                1st
              </span>
            </li>
          </ul>
        </div>

        <div className="flex-1 space-y-[18px] bg-sfx-card rounded-card p-[18px]">
          <h3 className="font-rh-sb uppercase text-sfx-muted">
            Decision
          </h3>

          <div className="space-y-4">
            <p className="text-sfx-muted">
              Rejection reason (required if rejecting)
            </p>
            <div>
              {/* Add Select component */}
            </div>
            <div className="flex gap-[10px] items-center">
              <button className="w-full py-[10px] rounded-full font-rh-sb text-sfx-card bg-sfx-danger">
                Reject
              </button>
              <button className="w-full py-[10px] rounded-full font-rh-sb text-sfx-card bg-sfx-success">
                Approve
              </button>
            </div>
            <p className="text-sfx-muted">
              Decision notifies the user and is written to the audit log.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}