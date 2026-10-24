
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ExternalLink,
  Menu as MenuIcon,
  ShoppingBag,
  X,
} from "lucide-react";

import logo from "../assets/ssambapkbbq_logo_.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Menu", to: "/menu" },
  {
    label: "Gift Cards",
    href: "https://squareup.com/gift/8VD29SPFXNFX9/order",
    external: true,
  },
  { label: "Contact Us", to: "/contact" },
];

const orderingOptions = [
  {
    label: "DoorDash",
    href: "https://www.doordash.com/store/ssambap-korean-bbq-stony-brook-27659793/106338349/",
  },
  {
    label: "Uber Eats",
    href: "https://www.ubereats.com/store/ssambap-korean-bbq/vb4-1hRITsSikhuHzZlOVA",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOrderOpen, setDesktopOrderOpen] = useState(false);
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const [mobileOrderExpanded, setMobileOrderExpanded] =
    useState(false);

  const desktopOrderRef = useRef(null);
  const location = useLocation();

  const closeAll = () => {
    setMenuOpen(false);
    setDesktopOrderOpen(false);
    setMobileOrderOpen(false);
    setMobileOrderExpanded(false);
  };

  // Close overlays whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setDesktopOrderOpen(false);
    setMobileOrderOpen(false);
    setMobileOrderExpanded(false);
  }, [location.pathname]);

  // Lock background scrolling while mobile overlays are open.
  useEffect(() => {
    if (!menuOpen && !mobileOrderOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, mobileOrderOpen]);

  // Close menus with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close desktop dropdown when clicking outside.
  useEffect(() => {
    if (!desktopOrderOpen) return;

    const handleClickOutside = (event) => {
      if (
        desktopOrderRef.current &&
        !desktopOrderRef.current.contains(event.target)
      ) {
        setDesktopOrderOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );
    };
  }, [desktopOrderOpen]);

  const openMobileNavigation = () => {
    setDesktopOrderOpen(false);
    setMobileOrderOpen(false);
    setMobileOrderExpanded(false);
    setMenuOpen(true);
  };

  const openMobileOrdering = () => {
    setMenuOpen(false);
    setDesktopOrderOpen(false);
    setMobileOrderExpanded(false);
    setMobileOrderOpen(true);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
        <div className="relative mx-auto flex h-24 max-w-[1600px] items-center justify-between px-5 md:px-8 lg:px-12">

          {/* LOGO */}
          <Link
            to="/"
            aria-label="Ssambap home"
            onClick={closeAll}
            className="relative z-10 flex items-center"
          >
            <img
              src={logo}
              alt="Ssambap Korean BBQ"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setDesktopOrderOpen(false)}
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

          {/* DESKTOP ORDER DROPDOWN */}
          <div
            ref={desktopOrderRef}
            className="relative hidden lg:block"
          >
            <button
              type="button"
              onClick={() =>
                setDesktopOrderOpen((current) => !current)
              }
              aria-label="Choose an ordering service"
              aria-expanded={desktopOrderOpen}
              aria-controls="desktop-order-options"
              className="group flex items-center gap-3"
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />

              <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                Order
              </span>

              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`text-white/60 transition-transform duration-300 ${
                  desktopOrderOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {desktopOrderOpen && (
              <div
                id="desktop-order-options"
                className="absolute right-0 top-full z-[70] w-[240px] pt-7"
              >
                <div className="border border-white/15 bg-[#0b0b0b] p-3 shadow-2xl shadow-black/70">
                  <p className="px-3 pb-3 pt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                    Order With
                  </p>

                  {orderingOptions.map((option) => (
                    <a
                      key={option.label}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDesktopOrderOpen(false)}
                      className="group flex items-center justify-between border-t border-white/10 px-3 py-4 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {option.label}

                      <ExternalLink
                        size={15}
                        strokeWidth={1.5}
                        className="text-white/40 group-hover:text-white"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={openMobileOrdering}
              aria-label="Choose an ordering service"
              className="flex h-11 w-11 items-center justify-center"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
              />
            </button>

            <button
              type="button"
              onClick={openMobileNavigation}
              aria-label="Open navigation"
              className="flex h-11 w-11 items-center justify-center"
            >
              <MenuIcon
                size={24}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        className={`fixed inset-0 z-[60] bg-black text-white transition-all duration-300 ease-out lg:hidden ${
          menuOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6">

          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between">
            <Link to="/" onClick={closeAll}>
              <img
                src={logo}
                alt="Ssambap Korean BBQ"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={closeAll}
              aria-label="Close navigation"
              className="flex h-11 w-11 items-center justify-center"
            >
              <X
                size={26}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* MOBILE LINKS */}
          <nav className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto">
            {navLinks.map((link, index) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
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
                  onClick={closeAll}
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

          {/* MOBILE ORDER — EXPANDS INSIDE NAVIGATION */}
          <div className="shrink-0 border-t border-white/10">
            <button
              type="button"
              onClick={() =>
                setMobileOrderExpanded((current) => !current)
              }
              aria-expanded={mobileOrderExpanded}
              aria-controls="mobile-nav-order-options"
              className="flex w-full items-center justify-between py-6"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag
                  size={19}
                  strokeWidth={1.5}
                />

                <span className="text-xs font-medium uppercase tracking-[0.18em]">
                  Order Online
                </span>
              </div>

              <ChevronDown
                size={17}
                strokeWidth={1.5}
                className={`text-white/50 transition-transform duration-300 ${
                  mobileOrderExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileOrderExpanded && (
              <div
                id="mobile-nav-order-options"
                className="grid grid-cols-2 gap-3 pb-6"
              >
                {orderingOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAll}
                    className="flex min-h-12 items-center justify-between gap-2 border border-white/25 px-3 py-3 text-xs font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    {option.label}

                    <ExternalLink
                      size={14}
                      strokeWidth={1.5}
                      className="shrink-0 text-white/50"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE ORDER PANEL — NAVBAR SHOPPING BAG */}
      {mobileOrderOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-5 text-white backdrop-blur-sm lg:hidden"
          role="presentation"
        >
          {/* BACKDROP */}
          <button
            type="button"
            onClick={() => setMobileOrderOpen(false)}
            aria-label="Close ordering options"
            className="absolute inset-0 cursor-default"
          />

          {/* PANEL */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-order-title"
            className="relative z-10 w-full max-w-sm border border-white/15 bg-[#101010] p-6 shadow-2xl shadow-black/70"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                  Ssambap Korean BBQ
                </p>

                <h2
                  id="mobile-order-title"
                  className="text-2xl font-medium tracking-[-0.04em]"
                >
                  Order Online
                </h2>

                <p className="mt-2 text-sm text-white/45">
                  Choose your preferred delivery service.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileOrderOpen(false)}
                aria-label="Close ordering options"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15"
              >
                <X
                  size={19}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {orderingOptions.map((option) => (
                <a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOrderOpen(false)}
                  className="group flex min-h-14 items-center justify-between border border-white/25 px-5 py-4 text-sm font-medium transition-all hover:border-white hover:bg-white hover:text-black"
                >
                  {option.label}

                  <ExternalLink
                    size={17}
                    strokeWidth={1.5}
                    className="text-white/50 transition-colors group-hover:text-black"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
