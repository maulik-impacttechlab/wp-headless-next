// components/Header.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "./NavMenu"; // your dynamic menu renderer

export default function Header({ menu }) {
  return (
    <header className="cms-header woo-theme header-style-1" id="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          {/* Logo */}
          <Link className="navbar-brand" href="/" title="DD Creation">
            {/* Replace src with your WP logo or query it via ACF if you want dynamic */}
             <Image
              src="https://deek57.sg-host.com/wp-content/uploads/2025/09/e9c8950b9e3e0d5a8b5b5f5a8a9c840e2ffb817c-1.webp"
              width={69}
              height={80}
              alt="DD Creation Logo"
              unoptimized
            />
          </Link>

          {/* Mobile / Off-canvas wrapper (kept static for now) */}
          <div className="off-canvas-wrapper">
            <div className="off-canvas-inner-content">
              <div className="off-canvas-inner">
                {/* mobile menu */}
                <div className="mobile-navigation">
                  {/* Use your dynamic NavMenu here */}
                  {menu && (
                    <NavMenu menu={menu} className="mobile-menu" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Header right icons */}
          <div className="header-right-block">
            <ul className="header-right-menu">
              <li>
                <div className="site-search-icon">
                  {/* search icon svg */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M22 22L20 20"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </li>
              <li>
                <Link href="/my-account" title="My Account">
                  {/* account svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/cart" title="Cart Page">
                  {/* cart svg */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 7.67V6.7C7.5 4.45 9.31 2.24 11.56 2.03C14.24 1.77 16.5 3.88 16.5 6.51V7.89"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.99995 22H14.9999C19.0199 22 19.7399 20.39 19.9499 18.43L20.6999 12.43C20.9699 9.99 20.2699 8 15.9999 8H7.99995C3.72995 8 3.02995 9.99 3.29995 12.43L4.04995 18.43C4.25995 20.39 4.97995 22 8.99995 22Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15.4955 12H15.5045"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.49451 12H8.50349"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span id="header-cart-badge" className="cart-badge">
                    0
                  </span>
                </Link>
              </li>
            </ul>
            <div className="mobile-menu-btn d-block d-lg-none">
              <div className="off-canvas-btn">
                <button
                    type="button"
                    onClick={() => {
                        // TODO: add your mobile menu open/close logic here
                        console.log("toggle mobile menu");
                    }}
                    className="menu-toggle-btn"
                    >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
