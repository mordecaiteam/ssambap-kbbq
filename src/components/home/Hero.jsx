import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import hero1 from "../../assets/hero/hero-1.webp";
import hero2 from "../../assets/hero/hero-2.jpg";
import hero3 from "../../assets/hero/hero-3.webp";
import hero4 from "../../assets/hero/hero-4.webp";

const slides = [hero1, hero2, hero3, hero4];

const SLIDE_DURATION = 3000;

const RESY_VENUE_ID = 95670;
const RESY_API_KEY =
  "DE2RYLWYAtFzT7qTe35vhkovpRJ0zO5C";

const RESY_SCRIPT_URL =
  "https://widgets.resy.com/embed.js";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef(null);
  const resyContainerRef = useRef(null);

  // =========================================================
  // HERO SLIDESHOW
  // =========================================================

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide(
        (current) => (current + 1) % slides.length
      );
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // =========================================================
  // RESY WIDGET — ISOLATED DOM
  // =========================================================

  useEffect(() => {
    const container = resyContainerRef.current;

    if (!container) return;

    let cancelled = false;
    let initialized = false;

    /*
     * Resy is allowed to modify its own child element,
     * but not the container React manages.
     *
     * React renders:
     * <div ref={resyContainerRef} />
     *
     * We manually create the child used by Resy.
     */
    const widgetMount = document.createElement("div");

    container.appendChild(widgetMount);

    const initializeResy = () => {
      if (
        cancelled ||
        initialized ||
        !window.resyWidget
      ) {
        return;
      }

      initialized = true;

      try {
        window.resyWidget.addButton(widgetMount, {
          venueId: RESY_VENUE_ID,
          apiKey: RESY_API_KEY,
          replace: true,
        });
      } catch (error) {
        console.error(
          "Unable to initialize Resy widget:",
          error
        );
      }
    };

    let script = document.querySelector(
      `script[src="${RESY_SCRIPT_URL}"]`
    );

    if (window.resyWidget) {
      initializeResy();
    } else if (script) {
      script.addEventListener(
        "load",
        initializeResy
      );
    } else {
      script = document.createElement("script");
      script.src = RESY_SCRIPT_URL;
      script.async = true;

      script.addEventListener(
        "load",
        initializeResy
      );

      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;

      if (script) {
        script.removeEventListener(
          "load",
          initializeResy
        );
      }

      /*
       * Only clean up inside our own isolated container.
       * React itself never renders widgetMount.
       */
      if (container.isConnected) {
        container.replaceChildren();
      }
    };
  }, []);

  // =========================================================
  // SCROLL TO NEXT SECTION
  // =========================================================

  const scrollToNextSection = () => {
    const hero = heroRef.current;

    if (!hero) return;

    const nextSection = hero.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.scrollTo({
      top: hero.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-6rem)] overflow-hidden bg-black text-white"
    >
      {/* =====================================================
          BACKGROUND SLIDESHOW
      ===================================================== */}

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] ease-in-out ${
              index === currentSlide
                ? "scale-100 opacity-100"
                : "scale-[1.03] opacity-0"
            }`}
          />
        ))}
      </div>

      {/* BACKGROUND OVERLAYS */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-10 md:pb-28 lg:px-12 lg:pb-32">
        <div className="max-w-5xl">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.32em] text-white/70 md:text-[11px]">
            Authentic Korean Cuisine & BBQ
          </p>

          <h1 className="text-[clamp(3.8rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.065em]">
            KOREAN BBQ,
            <br />
            MADE TO SHARE.
          </h1>

          <div className="mt-8 flex max-w-3xl flex-col justify-between gap-8 md:mt-10 md:flex-row md:items-end">
            <p className="max-w-md text-sm leading-6 text-white/60 md:text-[15px] md:leading-7">
              Gather around the grill for Korean
              barbecue, traditional dishes,
              banchan, and good food made better
              together.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap items-center gap-3">
              {/* VIEW MENU */}

              <Link
                to="/menu"
                className="group flex h-12 items-center gap-3 border border-white/30 bg-black/10 px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                <span className="transition-colors duration-300 group-hover:text-black">
                  View Menu
                </span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-black"
                />
              </Link>

              {/* RESY WIDGET */}

              <div
                ref={resyContainerRef}
                className="relative flex min-h-12 items-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Scroll down to explore"
        className="group absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45 transition-colors duration-300 hover:text-white md:bottom-7"
      >
        <span className="text-[8px] font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>

        <span className="h-6 w-px overflow-hidden bg-white/20">
          <span className="block h-3 w-px animate-[scrollLine_1.6s_ease-in-out_infinite] bg-white/80" />
        </span>

        <ArrowDown
          size={14}
          strokeWidth={1.5}
          className="animate-bounce"
        />
      </button>

      {/* =====================================================
          SLIDE INDICATOR
      ===================================================== */}

      <div className="absolute bottom-7 right-6 hidden items-center gap-4 md:flex lg:right-12">
        <span className="text-[9px] tracking-[0.2em] text-white/40">
          {String(currentSlide + 1).padStart(
            2,
            "0"
          )}

          <span className="mx-2 text-white/20">
            /
          </span>

          {String(slides.length).padStart(
            2,
            "0"
          )}
        </span>

        <div className="h-px w-10 bg-white/20" />
      </div>

      {/* SCROLL ANIMATION */}

      <style>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}