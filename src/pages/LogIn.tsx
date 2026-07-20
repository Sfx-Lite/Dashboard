import FormInput from "../components/Form/FormInput";
import logo from "../assets/images/sfx-logo-purple.png";
import { useState } from "react";

export default function LogIn() {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="h-fit w-[360px] p-[20px] space-y-6 bg-white rounded-card">
        <div className="space-y-[5px]">
            <div className="w-[90px]">
                <img
                  src={logo}
                  alt="Brand logo"
                  className="w-full object-cover"
                />
            </div>
            <h2 className="font-rh-b text-[25px] mt-2">
              Welcome back
            </h2>
            <span className="inline-block text-[14px] text-sfx-muted">
              Log in to your SFx Lite account.
            </span>
        </div>

        <form
          action=""
          className="space-y-5"
        >
          <FormInput
            label="Email or username"
            type="text"
            value={emailOrUsername}
            onChange={setEmailOrUsername}
            placeholder="you@example.com"
            name="username"
            autoComplete="username"
          />
 
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            name="password"
            autoComplete="current-password"
          />

          <div className="flex justify-end -mt-2">
            <a
              href="/forgot-password"
              className="text-sm font-rh-sb text-sfx-primary hover:text-sfx-primary/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>
 
        <button
          type="submit"
          className="w-full rounded-full bg-sfx-primary text-white font-semibold
                     py-3.5 hover:bg-sfx-primary/90 active:bg-sfx-primary/95
                     transition-colors focus:outline-none focus-visible:ring-2
                     focus-visible:ring-sfx-primary/60 focus-visible:ring-offset-2"
        >
          Log in
        </button>
        </form>
    </div>

  )
}