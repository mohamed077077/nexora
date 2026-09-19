import Image from "next/image";

const Logo = () => {
  return (
    <div >
      <Image
        src="https://res.cloudinary.com/dsnbjtkts/image/upload/v1789642736/WhatsApp_Image_2026-09-03_at_6.30.18_PM_2_kzz88z.png"
        alt="Nexora"
        fill
        priority
      />
    </div>
  );
};

export default Logo;