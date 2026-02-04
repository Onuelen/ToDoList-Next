"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200">
      <div
        className="
          mx-auto
          max-w-[1200px]
          px-4
          sm:px-6
          lg:px-0
          h-[60px]
          flex
          items-center
        "
      >
        <button onClick={() => router.push("/")}>
          <img
            src="/images/logo/logo-large.svg"
            alt="Do it"
            className="h-[40px]"
          />
        </button>
      </div>
    </header>
  );
}
