import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/Home/DefaultLayout";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import KycReview from "./pages/KycReview";
import Users from "./pages/Users";
import MasterWallet from "./pages/MasterWallet";


function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="kyc-review" element={<KycReview />} />
        <Route path="users" element={<Users />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="master-wallet" element={<MasterWallet />} />
      </Route>
    </Routes>
  );
}

export default App;
