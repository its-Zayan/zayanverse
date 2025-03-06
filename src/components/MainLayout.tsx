"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <>
      {!isAuthPage && (
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] bg-white/10 backdrop-blur-md rounded-full py-4 px-8 flex items-center justify-between border border-white/20">
          <div className="flex-1" />
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white hover:text-gray-300">
                  Projects
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex-1 flex justify-end">
            <LogoutButton />
          </div>
        </header>
      )}
      {children}
    </>
  );
} 