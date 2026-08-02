import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router";
import { setTitle } from "../store/topBarSlice";
import type { AppDispatch } from "../store";
import UsersContent from "../components/users/UsersContent";
type OutletContext = {
  search: string;
};

const PAGE_SIZE = 20;

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useOutletContext<OutletContext>();
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(setTitle("Users"));
  }, [dispatch]);

  // Debounce search input so we're not firing a request per keystroke
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search);
      setOffset(0); // reset to first page whenever the search term changes
    }, 350);
    return () => clearTimeout(handle);
  }, [search]);

  return (
    <div className="space-y-[var(--spacing-gutter)]">
      <div className="py-[var(--spacing-screen-x)] px-[22px]">
        <UsersContent
          search={debouncedSearch}
          offset={offset}
          pageSize={PAGE_SIZE}
          onOffsetChange={setOffset}
        />
      </div>
    </div>
  );
}