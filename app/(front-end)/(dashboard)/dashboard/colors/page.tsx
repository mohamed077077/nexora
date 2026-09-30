"use client";

import ColorContent from "@/features/colors/components/ColorContent/ColorContent";
import ColorHeader from "@/features/colors/components/ColorContent/ColorHeader";
import ColorDialog from "@/features/colors/components/ColorDialog/ColorDialog";

export default function ColorsPage() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ColorHeader />
      <ColorContent />
      <ColorDialog />
    </section>
  );
}
