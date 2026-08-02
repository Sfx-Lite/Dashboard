import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/global/Sidebar";
import TopBar from "../../components/global/TopBar";

export default function DefaultLayout() {
  const [search, setSearch] = useState<string>('');
  const [types, setTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  return (
    <div className="flex relative min-h-dvh">
      <div className="sticky top-0 z-[15] w-full md:fixed md:left-0 md:top-0 md:h-dvh md:w-[15rem]">
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>
      </div>

      <div className="min-h-dvh w-full overflow-y-auto md:ml-[15rem] md:h-dvh md:w-[calc(100vw-15rem)]">
        <TopBar
          searchValue={search}
          onSearchChange={setSearch}
          typesValue={types}
          onTypesChange={setTypes}
          statusesValue={statuses}
          onStatusesChange={setStatuses}
        />
        <main className="bg-sfx-bg w-full min-h-dvh bg-col-gray ">
          <Outlet context={{ search, types, statuses }} />
        </main>
      </div>
    </div>
  );
}