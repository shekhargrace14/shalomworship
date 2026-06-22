"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div>
      <h1>Form Submitted Successfully</h1>

      <button onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
}