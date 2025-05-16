"use client";

import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavigateButton({ href, children, className }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => setLoading(false), 1000); // Fallback reset after 1 sec
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleClick = () => {
    if(!href) return
    setLoading(true);
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary text-white disabled:opacity-50 ${className}`}
    >
      {loading && <Loader className="w-4 h-4 animate-spin" />}
      {!loading && children}
    </button>
  );
}
