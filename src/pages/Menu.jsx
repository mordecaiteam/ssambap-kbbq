
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp } from "lucide-react";

import desktopMenuBackground from "../assets/home-page-bkgnd.png";
import mobileMenuBackground from "../assets/home-page-bkgnd(1).png";
import MenuSection from "../components/menu/MenuSection";

import {
  dinnerSections,
  dinnerComboSections,
  lunchComboSections,
  drinkSections,
} from "../data/menuData";

const dinnerComboLinks = [
  {
    id: "dinner-combo-1",
    title: "Korean Beef Set",
    color: "#C94B4B",
  },
  {
    id: "dinner-combo-2",
    title: "Korean Pork Set",
    color: "#D6AE48",
  },
  {
    id: "dinner-combo-3",
    title: "Korean BBQ Set",
    color: "#638CC7",
  },
];

const menus = [
  {
    id: "lunch-combos",
    label: "Lunch Combo",
    sections: lunchComboSections,
  },
  {
    id: "dinner-combos",
    label: "Dinner Combo",
    sections: dinnerComboSections,
  },
  {
    id: "dinner",
    label: "Dinner",
    sections: dinnerSections,
  },
  {
    id: "drinks",
    label: "Drinks",
    sections: drinkSections,
  },
];

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState("dinner");
  const [showUpButton, setShowUpButton] = useState(false);

  const navigationRef = useRef(null);
  const navigate = useNavigate();

  const currentMenu =
    menus.find((menu) => menu.id === activeMenu) ?? menus[2];

  const navigationSections =
    activeMenu === "dinner-combos"
      ? dinnerComboLinks
      : currentMenu.sections;

  useEffect(() => {
    const updateUpButton = () => {
      const navigationBottom =
        navigationRef.current?.getBoundingClientRect().bottom ?? 0;

      setShowUpButton(navigationBottom < 0);
    };

    updateUpButton();

    window.addEventListener("scroll", updateUpButton, {
      passive: true,
    });

    window.addEventListener("resize", updateUpButton);

    return () => {
      window.removeEventListener("scroll", updateUpButton);
      window.removeEventListener("resize", updateUpButton);
    };
  }, []);

  const scrollToMenuNavigation = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
};

  const changeMenu = (id) => {
    setActiveMenu(id);

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });
  };

  const jumpToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (!section) return;

  const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    112;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: "instant",
  });
};

  const goBack = () => {
    if (
      typeof window.history.state?.idx === "number" &&
      window.history.state.idx > 0
    ) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="relative isolate min-h-screen bg-black text-white">
      {/* Responsive background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{
            backgroundImage: `url("${mobileMenuBackground}")`,
          }}
        />

        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{
            backgroundImage: `url("${desktopMenuBackground}")`,
          }}
        />

        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10">
        {/* Main menu navigation */}
        <section
          ref={navigationRef}
          id="menu-navigation"
          aria-label="Menu navigation"
          className="border-b border-white/15 bg-black/85 backdrop-blur-md"
        >
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
            {/* Main categories */}
            <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
              {menus.map((menu) => {
                const selected = activeMenu === menu.id;

                return (
                  <button
                    key={menu.id}
                    type="button"
                    onClick={() => changeMenu(menu.id)}
                    aria-pressed={selected}
                    className={`flex min-h-[64px] items-center justify-center px-2 py-3 text-center text-[14px] font-bold uppercase leading-5 tracking-[0.07em] text-white transition-colors md:min-h-[64px] md:text-[15px] ${
                      selected
                        ? "ring-2 ring-inset ring-white"
                        : "hover:bg-white/[0.04]"
                    }`}
                  >
                    {menu.label}
                  </button>
                );
              })}
            </div>

            {/* Section navigation */}
            <div className="pb-5 pt-4 md:pb-5 md:pt-4">
              <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white md:text-[13px]">
                {activeMenu === "dinner-combos"
                  ? "Choose Your Dinner Set"
                  : `${currentMenu.label} Sections`}
              </h2>

              <div className="grid grid-cols-2 border-l border-t border-white/10 md:flex md:flex-wrap md:border-0 md:gap-x-7 md:gap-y-3">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => jumpToSection(section.id)}
                    className="flex min-h-[60px] items-center border-b border-r border-white/10 px-4 py-3 text-left text-[12px] font-semibold uppercase leading-5 tracking-[0.04em] text-white transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white md:min-h-0 md:border-0 md:px-0 md:py-2 md:text-[13px]"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Menu content */}
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
          {currentMenu.sections.map((section) => (
            <MenuSection
              key={`${activeMenu}-${section.id}`}
              section={section}
            />
          ))}
        </div>

        {/* Food safety notice */}
        <section className="border-t border-white/10 px-5 py-12 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            {activeMenu !== "drinks" && (
              <p className="max-w-4xl text-[11px] leading-6 text-white/55">
                Consuming raw or undercooked meats, poultry,
                seafood, shellfish, or eggs may increase your risk
                of foodborne illness, especially if you have
                certain medical conditions.
              </p>
            )}

            <p
              className={`text-[11px] leading-6 text-white/55 ${
                activeMenu !== "drinks" ? "mt-3" : ""
              }`}
            >
              Please inform your server of any allergies or
              dietary restrictions before ordering.
            </p>
          </div>
        </section>
      </div>

      {/* Back button */}
      <div className="fixed bottom-5 left-5 z-50 md:bottom-7 md:left-7">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back to previous page"
          title="Go back"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/95 text-white shadow-lg shadow-black/60 transition-transform active:scale-95"
        >
          <ArrowLeft size={25} strokeWidth={2.2} />
        </button>
      </div>

      {/* Back to menu navigation */}
      {showUpButton && (
        <div className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
          <button
            type="button"
            onClick={scrollToMenuNavigation}
            aria-label="Back to menu categories and sections"
            title="Back to menu sections"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/95 text-white shadow-lg shadow-black/60 transition-transform active:scale-95"
          >
            <ArrowUp size={25} strokeWidth={2.2} />
          </button>
        </div>
      )}
    </main>
  );
}
