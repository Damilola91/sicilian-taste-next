"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, Menu, ShoppingCart } from "lucide-react";
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
  const canAccessCompany = role === "company" || role === "admin";

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

            {/* ✅ LINK AZIENDE (solo company/admin) */}
            {canAccessCompany && (
              <Link
                href="/company"
                className="text-white text-lg font-serif hover:text-gray-200 transition"
              >
                Aziende
              </Link>
            )}

            <Link
              href="/buy"
              className="text-white text-lg font-serif hover:text-gray-200 transition"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
            </Link>

            {role === "admin" && (
              <Link
                href="/admin"
                className="text-white text-lg font-serif hover:text-gray-200 transition"
              >
                Admin
              </Link>
            )}

            {/* SEARCH DESKTOP */}
            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="text-white hover:text-gray-200 transition"
              aria-label="Search"
            >
              <Search size={24} />
            </button>

            {/* LOGIN / LOGOUT */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-white text-[#ff6347] rounded-md font-medium hover:bg-gray-100 transition"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>

          {/* MOBILE ICONS (SEARCH + CART + MENU) */}
          <div className="md:hidden flex items-center gap-3">
            {/* SEARCH MOBILE */}
            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="text-white p-2 hover:text-gray-200 transition"
              aria-label="Search"
            >
              <Search size={24} />
            </button>

            {/* CART MOBILE */}
            <Link
              href="/buy"
              className="text-white p-2 hover:text-gray-200 transition"
              aria-label="Cart"
            >
              <ShoppingCart size={26} />
            </Link>

            {/* MENU MOBILE */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-white p-2"
              aria-label="Menu"
            >
              <Menu size={28} />
            </button>
          </div>
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

            {/* ✅ LINK AZIENDE (solo company/admin) */}
            {canAccessCompany && (
              <Link
                href="/company"
                className="text-white text-xl font-serif hover:text-gray-200 transition"
              >
                Aziende
              </Link>
            )}

            {role === "admin" && (
              <Link
                href="/admin"
                className="text-white text-xl font-serif hover:text-gray-200 transition"
              >
                Admin
              </Link>
            )}

            {/* SEARCH MOBILE (MENU) */}
            <button
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="flex justify-center items-center gap-2 text-white hover:text-gray-200 transition"
            >
              <Search size={22} /> Search
            </button>

            {/* LOGIN MOBILE */}
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

      {/* LOGIN DRAWER */}
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
