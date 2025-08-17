import Image from "next/image";

function CrunchyrollLogo() {
  return (
    <div className="w-40 h-40">
      <Image
        src="/Crunchyroll_Logo.svg"
        alt="Crunchyroll Logo"
        width={160}
        height={160}
      />
    </div>
  );
}

export default CrunchyrollLogo;
