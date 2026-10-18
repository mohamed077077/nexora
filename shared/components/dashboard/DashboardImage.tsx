import Image from "next/image";
import { cn } from "cn";
type DashboardImageProps = {
  src: string;
  alt: string;
  className?: string;
}

export default function DashboardImage({ src, alt, className }: DashboardImageProps) {
  return (
    <div className={cn(`relative size-20 overflow-hidden rounded-xl bg-card`, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="80px"
        className="cursor-pointer object-contain transition-transform hover:scale-110"
      />
    </div>
  );
}
