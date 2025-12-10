"use client";

import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import Login from "../Login/Login";
import SearchInput from "../SearchInput/SearchInput";

export default function Navbar({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const isAuthenticated = !!session;
  const role = session?.role;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold text-orange-600">
            SicilianTaste
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/recipe" className="hover:text-orange-500">
              Recipe Page
            </Link>
            <Link href="/categories" className="hover:text-orange-500">
              Category
            </Link>
            <Link href="/buy" className="hover:text-orange-500">
              Buy
            </Link>

            {role === "admin" && (
              <Link href="/admin" className="hover:text-orange-500">
                Admin
              </Link>
            )}

            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="p-2 hover:text-orange-500"
            >
              <Search size={22} />
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md py-3 px-4 flex flex-col gap-4">
            <Link href="/recipe" className="hover:text-orange-500">
              Recipe Page
            </Link>
            <Link href="/categories" className="hover:text-orange-500">
              Category
            </Link>
            <Link href="/buy" className="hover:text-orange-500">
              Buy
            </Link>

            {role === "admin" && (
              <Link href="/admin" className="hover:text-orange-500">
                Admin
              </Link>
            )}

            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <Search size={22} /> Search
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-center"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </nav>

      {/* SEARCH INPUT */}
      {showSearchInput && <SearchInput />}

      {/* SIDE DRAWER LOGIN */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="left"
        size={350}
        className="p-4"
      >
        <Login closeDrawer={() => setIsDrawerOpen(false)} session={session} />
      </Drawer>
    </>
  );
}
