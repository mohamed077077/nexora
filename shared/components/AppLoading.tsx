export default function AppLoading() {
  return (
    <div className="flex w-full items-center justify-center py-20">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <span className="absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />

        {/* Pulsing glow ring */}
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-primary/20" />

        {/* Favicon */}
        <img
          src="https://res.cloudinary.com/dsnbjtkts/image/upload/v1789643151/d1d3c978-8e27-40b2-b02f-f657756a3ddf_fbjcy8.png"
          alt="Loading..."
          className="relative h-8 w-8 animate-pulse rounded-full object-contain"
        />
      </div>
    </div>
  );
}
