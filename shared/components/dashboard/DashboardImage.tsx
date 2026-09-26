import Image from "next/image";

type DashboardImageProps = {
  src: string;
  alt: string;
}

export default function DashboardImage({ src, alt }: DashboardImageProps) {
  return (
    <div className="relative size-20 overflow-hidden rounded-xl bg-card">
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
