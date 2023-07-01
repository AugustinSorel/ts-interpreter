"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-20 flex min-h-[6rem] p-5 backdrop-blur-md">
      <nav className="m-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 font-semibold capitalize sm:flex-row">
        <Link href="/">
          <h1 className=" text-xl">typescript interpreter</h1>
        </Link>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/playground"
            className="inline-block text-zinc-400 transition-colors hover:text-zinc-200 hover:underline aria-[current=true]:text-zinc-200 aria-[current=true]:underline "
            aria-current={path === "/playground"}
          >
            playground
          </Link>
          <Link
            href="/documentation"
            className="inline-block text-zinc-400 transition-colors hover:text-zinc-200 hover:underline aria-[current=true]:text-zinc-200 aria-[current=true]:underline "
            aria-current={path === "/documentation"}
          >
            documentation
          </Link>
          <Link
            href="https://github.com/augustinsorel/ts-interpreter"
            target="_blank"
            className="inline-block text-zinc-400 transition-colors hover:text-zinc-200 hover:underline"
          >
            github
          </Link>
        </div>
      </nav>
    </header>
  );
};
