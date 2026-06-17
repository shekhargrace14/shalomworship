"use client";

import { useSearchParams } from "next/navigation";
// import CreateSetlist from "@/components/setlist/CreateSetlist";
import ShowSetlist from "@/components/setlist/ShowSetlist";
import Menu from "@/components/layout/Menu";
import { CreateSetlist } from "@/components/setlist/CreateSetlist";

export default function SetlistPage() {
  const searchParams = useSearchParams();
  const setlistId = searchParams.get("id");

  // 🟢 If NO id → show home
  if (!setlistId) {
    return (
      <div>
        <CreateSetlist />
      </div>
    );
  }

  // 🟢 If id exists → show setlist
  return (
    <>
      <Menu />
      <ShowSetlist id={setlistId} />
    </>
  );
}