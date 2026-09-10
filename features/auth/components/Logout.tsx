"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { logoutUser } from "@/features/auth/http/Logout";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter()
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/login')
    },
    onError: (error: Error) => {
      toast.error(error.message );
    },
  });

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50"
    >
      <LogOut size={16} />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
