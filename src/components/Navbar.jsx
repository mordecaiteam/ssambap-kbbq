import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ExternalLink,
  Menu as MenuIcon,
  ShoppingBag,
  X,
} from "lucide-react";

import logo from "../assets/ssambapkbbq_logo_.png";

const navLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Gallery",
    to: "/gallery",
  },
  {
    label: "Menu",
    to: "/menu",
  },
  {
    label: "Gift Cards",
    href: "https://squareup.com/gift/8VD29SPFXNFX9/order",
    external: true,
  },
  {
    label: "Contact Us",
    to: "/contact",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
        <div className="relative mx-auto flex h-24 max-w-[1600px] items-center justify-between px-5 md:px-8 lg:px-12">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Ssambap home"
            className="relative z-10 flex items-center"
          >
            <img
              src={logo}
              alt="Ssambap Korean BBQ"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}

                      <span
                        className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop Order */}
          <a
            href="https://www.ubereats.com/store/ssambap-korean-bbq/vb4-1hRITsSikhuHzZlOVA?srsltid=AU7gw4Xx4sdJg5fYC5ebEBfSZ_iaXqzDLAwMm3GIxqUr8dwGmKEWFYLs"
            target="_blank"
            rel="noreferrer"
            aria-label="Order online"
            className="group hidden items-center gap-3 lg:flex"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
              Order
            </span>
          </a>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="https://www.ubereats.com/store/ssambap-korean-bbq/vb4-1hRITsSikhuHzZlOVA?srsltid=AU7gw4Xx4sdJg5fYC5ebEBfSZ_iaXqzDLAwMm3GIxqUr8dwGmKEWFYLs"
              target="_blank"
              rel="noreferrer"
              aria-label="Order online"
              className="flex h-11 w-11 items-center justify-center"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center"
              aria-label="Open navigation"
            >
              <MenuIcon size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-[60] bg-black text-white transition-all duration-500 ease-out lg:hidden ${
          menuOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="Ssambap Korean BBQ"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center"
              aria-label="Close navigation"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-1 flex-col justify-center">
            {navLinks.map((link, index) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="group flex items-center border-b border-white/10 py-5"
                >
                  <span className="mr-5 text-[10px] tracking-[0.2em] text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-3xl font-light tracking-[-0.03em] sm:text-4xl">
                    {link.label}
                  </span>

                  <ExternalLink
                    size={17}
                    strokeWidth={1.5}
                    className="ml-auto text-white/40"
                  />
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={closeMenu}
                  className="flex items-center border-b border-white/10 py-5"
                >
                  <span className="mr-5 text-[10px] tracking-[0.2em] text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-3xl font-light tracking-[-0.03em] sm:text-4xl">
                    {link.label}
                  </span>
                </NavLink>
              )
            )}
          </nav>

          {/* Mobile Order */}
          <a
            href="https://www.ubereats.com/store/ssambap-korean-bbq/vb4-1hRITsSikhuHzZlOVA?srsltid=AU7gw4Xx4sdJg5fYC5ebEBfSZ_iaXqzDLAwMm3GIxqUr8dwGmKEWFYLs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-t border-white/10 py-6"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={19} strokeWidth={1.5} />

              <span className="text-xs font-medium uppercase tracking-[0.18em]">
                Order Online
              </span>
            </div>

            <ExternalLink
              size={16}
              strokeWidth={1.5}
              className="text-white/50"
            />
          </a>
        </div>
      </div>
    </>
  );
}