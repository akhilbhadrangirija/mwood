"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Static-friendly redirect from '/' to the default locale route.
// Using client-side navigation ensures it works with `output: 'export'`.
export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en");
  }, [router]);
  return null;
}