import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

import logo from "../assets/ssambapkbbq_logo_.png";
import mordecaiLogo from "../assets/MordecAI-logo.png";

const quickLinks = [
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
    label: "Contact Us",
    to: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 text-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Main Footer */}
        <div className="grid gap-14 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-20">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="Ssambap home"
              className="inline-block"
            >
              <img
                src={logo}
                alt="Ssambap Korean BBQ"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              Authentic Korean cuisine and tabletop barbecue
              made to grill, wrap, share, and enjoy together.
            </p>

            <p className="mt-5 text-xs leading-6 text-white/30">
              2350 Nesconset Highway
              <br />
              Stony Brook, NY 11790
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <FooterHeading>
              Quick Links
            </FooterHeading>

            <nav className="flex flex-col items-start gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://squareup.com/gift/8VD29SPFXNFX9/order"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                Gift Cards
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <FooterHeading>
              Connect With Us
            </FooterHeading>

            <div className="flex flex-col items-start gap-5">
              <a
                href="tel:+16316756402"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Phone
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/35 transition-colors group-hover:text-white"
                />

                (631) 675-6402
              </a>

              <a
                href="mailto:info@ssambapkbbq.com"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Mail
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/35 transition-colors group-hover:text-white"
                />

                info@ssambapkbbq.com
              </a>

              <a
                href="https://www.instagram.com/ssambapkbbq/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <FaInstagram
                  size={17}
                  className="text-white/35 transition-colors group-hover:text-white"
                />

                @ssambapkbbq
              </a>

              <a
                href="https://www.facebook.com/ssambapkbbq/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <FaFacebookF
                  size={15}
                  className="text-white/35 transition-colors group-hover:text-white"
                />

                @SsambapStonyBrook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
            © {new Date().getFullYear()} Ssambap Korean BBQ.
            All Rights Reserved.
          </p>

          {/* Developed By MordecAI */}
          <a
            href="https://getmordecai.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website developed by MordecAI"
            className="group flex w-fit items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
          >
            <span className="whitespace-nowrap text-[10px] tracking-[0.08em] text-white/35 transition-colors duration-300 group-hover:text-white/60">
              Developed by
            </span>

            <img
              src={mordecaiLogo}
              alt="MordecAI"
              className="h-6 w-auto object-contain opacity-70 transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <h2 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
      {children}
    </h2>
  );
}