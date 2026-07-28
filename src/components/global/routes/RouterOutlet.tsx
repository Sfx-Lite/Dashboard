import { Route, Routes } from "react-router";
import AuthLayout from "../../../layouts/Auth/AuthLayout";
import DefaultLayout from "../../../layouts/Home/DefaultLayout";

import LogIn from "../../../pages/LogIn";
import MasterWallet from "../../../pages/MasterWallet";
import Overview from "../../../pages/Overview";
import Transactions from "../../../pages/Transactions";
import Users from "../../../pages/Users";
import KycReview from "../../../pages/KycReview";
import PermissionlessRoute from "./PermissionlessRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import KycDetail from "../../kyc/KycDetail";

export default function RouterOutlet() {
  return (
    <Routes>
      <Route element={<PermissionlessRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LogIn />} />
          </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/kyc-review" element={<KycReview />} />
            <Route path="kyc-review/:id" element={<KycDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/master-wallet" element={<MasterWallet />} />
          </Route>
      </Route>
    </Routes>
  );
}
