"use client";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function GlobalSpinner() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // This spinner stays for minimum 300ms to prevent flicker
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white/70 z-50 flex justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
