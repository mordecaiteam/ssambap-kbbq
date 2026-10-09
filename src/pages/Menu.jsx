import { useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Menu as MenuIcon,
  Search,
  X,
} from "lucide-react";
import desktopMenuBackground from "../assets/home-page-bkgnd.png";
import mobileMenuBackground from "../assets/home-page-bkgnd(1).png";
import MenuSection from "../components/menu/MenuSection";
import MenuItem from "../components/menu/MenuItem";
import {
  dinnerSections,
  dinnerComboSections,
  lunchComboSections,
  drinkSections,
} from "../data/menuData";
const menuTabs = [
  {
    id: "lunch-combos",
    label: "Lunch Combo",
  },
  {
    id: "dinner-combos",
    label: "Dinner Combo",
  },
  {
    id: "dinner",
    label: "Dinner",
  },
  {
    id: "drinks",
    label: "Drinks",
  },
];
const allMenus = [
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
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSectionsOpen, setMobileSectionsOpen] =
    useState(false);
  const menuContentRef = useRef(null);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const isSearching = normalizedSearch.length > 0;
  const currentMenu = useMemo(
    () =>
      allMenus.find((menu) => menu.id === activeMenu) ||
      allMenus[2],
    [activeMenu]
  );
  const currentSections = currentMenu.sections;
  const searchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }
    return allMenus.flatMap((menu) =>
      menu.sections.flatMap((section) =>
        section.items
          .filter((item) => {
            const searchableText = [
              item.name,
              item.korean,
              item.description,
              item.note,
              item.category,
              section.title,
              section.note,
              menu.label,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return searchableText.includes(normalizedSearch);
          })
          .map((item) => ({
            ...item,
            menuLabel: menu.label,
            sectionTitle: section.title,
          }))
      )
    );
  }, [normalizedSearch]);
  /*
   * Main menu category changes should always return the
   * entire page to its true top.
   *
   * We wait for React to process the state update first,
   * then reset both the window and document scroll positions.
   */
  const scrollPageToTop = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });
  };
  const handleTabChange = (tabId) => {
    setActiveMenu(tabId);
    setSearchQuery("");
    setMobileSearchOpen(false);
    setDesktopSearchOpen(false);
    setMobileSectionsOpen(false);
    scrollPageToTop();
  };
  const handleSectionJump = (sectionId) => {
    /*
     * Selecting a secondary section closes the mobile
     * picker, but normal scrolling never closes it.
     */
    setMobileSectionsOpen(false);
    /*
     * Wait for the collapsed mobile selector to finish
     * changing layout before calculating the destination.
     */
    window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) {
        return;
      }
      const mobileOffset = mobileSearchOpen ? 290 : 245;
      const desktopOffset = desktopSearchOpen ? 250 : 190;
      const offset =
        window.innerWidth < 768
          ? mobileOffset
          : desktopOffset;
      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({
        top: Math.max(0, top),
        left: 0,
        behavior: "smooth",
      });
    }, 320);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setMobileSearchOpen(false);
    setDesktopSearchOpen(false);
    setMobileSectionsOpen(false);
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      setMobileSectionsOpen(false);
    }
  };
  return (
    <main className="relative isolate min-h-screen bg-black text-white">
      {/* Fixed, responsive menu-page background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: `url("${mobileMenuBackground}")` }}
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url("${desktopMenuBackground}")` }}
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      <div className="relative z-10">
      {/* =====================================================
          STICKY MENU NAVIGATION
      ===================================================== */}
      <section
        id="menu-navigation"
        className="sticky top-20 z-30 border-b border-white/10 bg-black/85 backdrop-blur-md md:top-24"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
          {/* PRIMARY MENU CATEGORIES */}
          <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
            {menuTabs.map((tab) => {
              const active =
                activeMenu === tab.id && !isSearching;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex min-h-[56px] items-center justify-center px-2 text-center text-[9px] font-semibold uppercase tracking-[0.17em] transition-colors duration-300 md:min-h-[64px] md:text-[10px] ${
                    active
                      ? "text-white"
                      : "text-white/30 hover:text-white"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-px bg-white transition-opacity duration-300 md:left-8 md:right-8 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          {/* MOBILE: COMPACT SECTION PICKER + SEARCH ICON */}
          <div className="md:hidden">
            <div className="flex h-[48px] items-center border-b border-white/10">
              {!isSearching ? (
                <button
                  type="button"
                  onClick={() => setMobileSectionsOpen((open) => !open)}
                  aria-expanded={mobileSectionsOpen}
                  aria-controls="mobile-section-navigation"
                  className="flex h-full min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <MenuIcon size={15} strokeWidth={1.5} className="shrink-0 text-white/40" />
                  <span className="truncate text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {currentMenu.label} Sections
                  </span>
                  {mobileSectionsOpen ? (
                    <ChevronUp size={15} className="shrink-0 text-white/40" />
                  ) : (
                    <ChevronDown size={15} className="shrink-0 text-white/40" />
                  )}
                </button>
              ) : (
                <span className="flex-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Menu Search
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen((open) => {
                    if (open) setSearchQuery("");
                    return !open;
                  });
                  setMobileSectionsOpen(false);
                }}
                aria-label={mobileSearchOpen ? "Close menu search" : "Open menu search"}
                aria-expanded={mobileSearchOpen}
                aria-controls="mobile-menu-search"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white"
              >
                {mobileSearchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
              </button>
            </div>
            {mobileSearchOpen && (
              <div id="mobile-menu-search" className="flex h-[52px] items-center gap-3 border-b border-white/10">
                <Search size={16} strokeWidth={1.5} className="shrink-0 text-white/40" />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search the menu..."
                  aria-label="Search the menu"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search" className="p-2 text-white/50">
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
            {!isSearching && (
              <div
                id="mobile-section-navigation"
                className={`grid transition-all duration-300 ease-out ${
                  mobileSectionsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-5 pt-3">
                    <div className="grid grid-cols-2 border-l border-t border-white/10">
                      {currentSections.map((section) => (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => handleSectionJump(section.id)}
                          className="flex min-h-[48px] items-center border-b border-r border-white/10 px-4 text-left text-[8px] font-semibold uppercase leading-4 tracking-[0.14em] text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* DESKTOP: SECTION LINKS + COLLAPSIBLE SEARCH */}
          <div className="hidden md:block">
            <div className="flex min-h-[66px] items-center gap-5 border-b border-white/10">
              {!isSearching ? (
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-7 gap-y-3 py-4">
                  {currentSections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionJump(section.id)}
                      className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="flex-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Menu Search
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  if (desktopSearchOpen) setSearchQuery("");
                  setDesktopSearchOpen((open) => !open);
                }}
                aria-label={desktopSearchOpen ? "Close menu search" : "Open menu search"}
                aria-expanded={desktopSearchOpen}
                aria-controls="desktop-menu-search"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white"
              >
                {desktopSearchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
              </button>
            </div>
            {desktopSearchOpen && (
              <div id="desktop-menu-search" className="flex h-[58px] items-center gap-4 border-b border-white/10">
                <Search size={18} strokeWidth={1.5} className="shrink-0 text-white/40" />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search the menu..."
                  aria-label="Search the menu"
                  className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/30"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search" className="p-2 text-white/50 hover:text-white">
                    <X size={17} />
                  </button>
                )}
              </div>
            )}
          </div>
          {/* SEARCH STATUS */}
          {isSearching && (
            <div className="flex min-h-[52px] items-center justify-between gap-6">
              <p className="min-w-0 truncate text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
                {searchResults.length}{" "}
                {searchResults.length === 1
                  ? "result"
                  : "results"}{" "}
                for{" "}
                <span className="text-white/60">
                  “{searchQuery.trim()}”
                </span>
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className="shrink-0 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>
      {/* =====================================================
          NORMAL MENU
      ===================================================== */}
      {!isSearching && (
        <div
          ref={menuContentRef}
          className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12"
        >
          {currentSections.map((section) => (
            <MenuSection
              key={`${activeMenu}-${section.id}`}
              section={section}
            />
          ))}
        </div>
      )}
      {/* =====================================================
          SEARCH RESULTS
      ===================================================== */}
      {isSearching && (
        <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-16 lg:px-12">
          {searchResults.length > 0 ? (
            <div className="grid gap-x-14 md:grid-cols-2">
              {searchResults.map((item, index) => (
                <div
                  key={`${item.menuLabel}-${item.sectionTitle}-${item.name}-${index}`}
                  className="border-b border-white/10"
                >
                  <div className="pt-5">
                    <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/25">
                      {item.menuLabel}
                      <span className="mx-2 text-white/15">
                        /
                      </span>
                      {item.sectionTitle}
                    </p>
                  </div>
                  <MenuItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <Search
                size={24}
                strokeWidth={1.25}
                className="mb-6 text-white/20"
              />
              <h2 className="text-2xl font-medium tracking-[-0.03em]">
                No menu items found.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
                Try searching for something else, like
                "kalbi", "chicken", "bibimbap", or "soju".
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className="mt-7 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      )}
      {/* =====================================================
          DISCLAIMER
      ===================================================== */}
      <section className="border-t border-white/10 px-5 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {activeMenu !== "drinks" && (
            <p className="max-w-4xl text-[10px] leading-5 text-white/25">
              Consuming raw or undercooked meats, poultry,
              seafood, shellfish, or eggs may increase your risk
              of foodborne illness, especially if you have
              certain medical conditions.
            </p>
          )}
          <p
            className={`text-[10px] leading-5 text-white/25 ${
              activeMenu !== "drinks" ? "mt-3" : ""
            }`}
          >
            Please inform your server of any allergies or
            dietary restrictions before ordering.
          </p>
        </div>
      </section>
      </div>
    </main>
  );
}
