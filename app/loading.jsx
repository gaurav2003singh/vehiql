// app/loading.jsx
"use client";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}
