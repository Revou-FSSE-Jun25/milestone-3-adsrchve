"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#001F3F] text-white text-xl">
      Logging out...
    </div>
  );
}
