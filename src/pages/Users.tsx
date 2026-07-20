import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useOutletContext } from "react-router";
// import axios from "axios";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";
// import type { KycUser } from "../lib/types/kyc";
import UsersContent from "../components/users/UsersContent";

// type OutletContext = {
//   search: string
// }

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  // const { search } = useOutletContext<OutletContext>();
  // const [users, setUsers] = useState<KycUser[]>([]);

  useEffect(() => {
    dispatch(setTitle('Users'))
    // axios.get<KycUser[]>('/api/users')
    //   .then((res) => setUsers(res.data))
  }, [dispatch])

  // const filtered = users.filter((u) => (u.username + u.email).toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-[var(--spacing-gutter)]">
      <div className="py-[var(--spacing-screen-x)] px-[22px]">
        <UsersContent />
      </div>
    </div>
  );
}
