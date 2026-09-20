import {
  ArrowRight,
  MapPin,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";

const RESY_VENUE_ID = 95670;
const RESY_API_KEY = "DE2RYLWYAtFzT7qTe35vhkovpRJ0zO5C";

export default function VisitCTA() {
  const resyButtonRef = useRef(null);

  // =========================================================
  // RESY WIDGET
  // =========================================================
  useEffect(() => {
    const initializeResy = () => {
      if (
        !resyButtonRef.current ||
        !window.resyWidget
      ) {
        return;
      }

      window.resyWidget.addButton(
        resyButtonRef.current,
        {
          venueId: RESY_VENUE_ID,
          apiKey: RESY_API_KEY,
          replace: true,
        }
      );
    };

    // Resy already loaded
    if (window.resyWidget) {
      initializeResy();
      return;
    }

    // Check if another component already loaded it
    const existingScript = document.querySelector(
      'script[src="https://widgets.resy.com/embed.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        initializeResy
      );

      return () => {
        existingScript.removeEventListener(
          "load",
          initializeResy
        );
      };
    }

    // Load Resy script
    const script = document.createElement("script");

    script.src = "https://widgets.resy.com/embed.js";
    script.async = true;

    script.addEventListener(
      "load",
      initializeResy
    );

    document.body.appendChild(script);

    return () => {
      script.removeEventListener(
        "load",
        initializeResy
      );
    };
  }, []);

  return (
    <section className="border-t border-white/10 bg-black px-6 text-white">
      <div className="mx-auto max-w-[1400px] py-28 md:py-40">

        <div className="flex flex-col items-center text-center">

          {/* Location */}
          <div className="mb-7 flex items-center gap-2 text-white/40">
            <MapPin
              size={14}
              strokeWidth={1.5}
            />

            <p className="text-[10px] uppercase tracking-[0.3em]">
              Stony Brook, New York
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl lg:text-8xl">
            Come eat
            <br />
            with us.
          </h2>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

            {/* Visit Us */}
            <Link
              to="/contact"
              className="group flex h-12 items-center gap-3 border border-white/30 bg-black/10 px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <span className="transition-colors duration-300 group-hover:text-black">
                Visit Us
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-black"
              />
            </Link>

            {/* Resy Book Now */}
            <div ref={resyButtonRef} />
          </div>
        </div>
      </div>
    </section>
  );
}