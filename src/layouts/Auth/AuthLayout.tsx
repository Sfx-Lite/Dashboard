import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-dvh w-full bg-sfx-primary-tint flex justify-center items-center">
        <Outlet />
    </div>
  )
}