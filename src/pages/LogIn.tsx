import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import FormInput from "../components/Form/FormInput";
import logo from "../assets/images/sfx-logo-purple.png";
import {
  loginSchema,
  type LoginFormValues,
} from "../lib/schemas/authSchema";
import { useAppDispatch } from "../store/hooks";
import { useAdminLoginMutation } from "../api/auth";
import { setCredentials } from "../store/authSlice";
import { getAuthErrorMessage } from "../utils/errors";
import SvgSpinners3DotsFade from "../components/global/icons/SvgSpinners3DotsFade";

export default function LogIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/";

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await adminLogin(values).unwrap();

      dispatch(setCredentials(res.data));
      toast.success("Welcome back");

      navigate(from, { replace: true });
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    }
  };

  return (
    <div className="h-fit w-[360px] rounded-card bg-white p-[20px] space-y-6">
      <div className="space-y-[5px]">
        <div className="w-[90px]">
          <img
            src={logo}
            alt="Brand logo"
            className="w-full object-cover"
          />
        </div>

        <h2 className="mt-2 font-rh-b text-[25px]">
          Welcome back
        </h2>

        <span className="inline-block text-[14px] text-sfx-muted">
          Log in to your SFx Lite account.
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Controller
          name="emailOrUsername"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Email or username"
              type="text"
              value={field.value}
              onChange={field.onChange}
              placeholder="you@example.com"
              name="username"
              autoComplete="username"
              error={errors.emailOrUsername?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Password"
              type="password"
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter your password"
              name="password"
              autoComplete="current-password"
              error={errors.password?.message}
            />
          )}
        />

        <div className="flex justify-end -mt-2">
          <Link
            to="/forgot-password"
            className="text-sm font-rh-sb text-sfx-primary transition-colors hover:text-sfx-primary/80"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full flex items-center justify-center bg-sfx-primary py-3.5 font-semibold text-white transition-colors hover:bg-sfx-primary/90 active:bg-sfx-primary/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sfx-primary/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (<SvgSpinners3DotsFade className="text-[24px]" />) : "Log in"}
        </button>
      </form>
    </div>
  );
}