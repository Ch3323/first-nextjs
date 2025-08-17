"use client";

import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="text-2xl text-primary font-extrabold tracking-normal select-none">
        MYANIME
      </h1>
    </Link>
  );
}

export default Logo;
