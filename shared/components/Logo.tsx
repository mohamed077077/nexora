import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-72 aspect-4/1">
      <Image
        src="https://res.cloudinary.com/dzgwzplze/image/upload/v1788664327/14edf6e4-09b4-42cf-b84c-b6b893226f87_muha4e.png"
        alt="Nexora"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
};

export default Logo;