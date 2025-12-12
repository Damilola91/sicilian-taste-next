"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { Search, Menu } from "lucide-react";
import Link from "next/link";
import Login from "../Login/Login";
import SearchInput from "../SearchInput/SearchInput";

const Drawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});

import "react-modern-drawer/dist/index.css";

const Navbar = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const isAuthenticated = !!session;
  const role = session?.role;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 shadow-md bg-[#ff6347]">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          {/* LOGO */}
          <Link
            href="/"
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            SicilianTaste
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/recipe"
              className="text-white text-lg font-serif hover:text-gray-200 transition"
            >
              Recipe Page
            </Link>

            <Link
              href="/categories"
              className="text-white text-lg font-serif hover:text-gray-200 transition"
            >
              Category
            </Link>

            <Link
              href="/buy"
              className="text-white text-lg font-serif hover:text-gray-200 transition"
            >
              Buy
            </Link>

            {role === "admin" && (
              <Link
                href="/admin"
                className="text-white text-lg font-serif hover:text-gray-200 transition"
              >
                Admin
              </Link>
            )}

            {/* Search */}
            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="text-white hover:text-gray-200 transition"
            >
              <Search size={24} />
            </button>

            {/* Login / Logout button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-white text-[#ff6347] rounded-md font-medium hover:bg-gray-100 transition"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden text-white p-2"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#ff6347] text-center py-4 px-4 flex flex-col gap-4">
            <Link
              href="/recipe"
              className="text-white text-xl font-serif hover:text-gray-200 transition"
            >
              Recipe Page
            </Link>

            <Link
              href="/categories"
              className="text-white text-xl font-serif hover:text-gray-200 transition"
            >
              Category
            </Link>

            <Link
              href="/buy"
              className="text-white text-xl font-serif hover:text-gray-200 transition"
            >
              Buy
            </Link>

            {role === "admin" && (
              <Link
                href="/admin"
                className="text-white text-xl font-serif hover:text-gray-200 transition"
              >
                Admin
              </Link>
            )}

            {/* Search mobile */}
            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="flex justify-center items-center gap-2 text-white hover:text-gray-200 transition"
            >
              <Search size={22} /> Search
            </button>

            {/* Login mobile */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full px-4 py-2 bg-white text-[#ff6347] rounded-md font-medium hover:bg-gray-100 transition"
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
};

export default Navbar;
