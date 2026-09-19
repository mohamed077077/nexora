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
     className="flex h-16 w-full items-center gap-2.5 text-xl font-semibold text-destructive cursor-pointer"
    >
      <LogOut size={24} strokeWidth={1.8} />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
