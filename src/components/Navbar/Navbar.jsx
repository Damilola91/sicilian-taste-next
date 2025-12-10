"use client";

import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Search } from "lucide-react";
import Link from "next/link";
import Login from "../Login/Login";
import SearchInput from "../SearchInput/SearchInput";
import "./Navbar.css";

const Navbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  const isAuthenticated = !!session;
  const role = session?.role;

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand logo" href="/">
            SicilianTaste
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/recipe">
                  Recipe Page
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/categories">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/buy">
                  Buy
                </Link>
              </li>
              {role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" href="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            <div className="nav-icons d-flex align-items-center">
              <button
                onClick={() => setShowSearchInput((prev) => !prev)}
                className="search-icon-button"
              >
                <Search size={24} />
              </button>

              <button onClick={toggleDrawer} className="nav-login-button ms-3">
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showSearchInput && <SearchInput />}

      <Drawer open={isOpen} onClose={toggleDrawer} direction="left" size={350}>
        <div className="drawer-content">
          <Login closeDrawer={closeDrawer} session={session} />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
