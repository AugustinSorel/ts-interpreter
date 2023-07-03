"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Header = () => {
  const path = usePathname();
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false);
  const openMobileNav = () => setisMobileNavOpen(true);
  const closeMobileNav = () => setisMobileNavOpen(false);

  useEffect(closeMobileNav, [path]);

  return (
    <header className="sticky top-0 z-20 flex min-h-[6rem] p-5 backdrop-blur-md">
      <nav className="m-auto flex w-full max-w-7xl items-center justify-between gap-5 font-semibold capitalize">
        <Link href="/">
          <h1 className=" text-xl">typescript interpreter</h1>
        </Link>

        <div className=" hidden flex-wrap items-center gap-5 lg:flex">
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

        <button
          className="lg:hidden"
          onClick={openMobileNav}
          aria-label="open-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </nav>

      {isMobileNavOpen && <MobileNav closeHandler={closeMobileNav} />}
    </header>
  );
};

const MobileNav = ({ closeHandler }: { closeHandler: () => void }) => {
  const path = usePathname();

  return createPortal(
    <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-black/20 text-3xl capitalize backdrop-blur-md">
      <button onClick={closeHandler} aria-label="close-menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <Link
        href="/"
        className="inline-block text-zinc-400 transition-colors hover:text-zinc-200 hover:underline aria-[current=true]:text-zinc-200 aria-[current=true]:underline "
        aria-current={path === "/"}
      >
        home
      </Link>
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
    </nav>,
    document.body
  );
};
