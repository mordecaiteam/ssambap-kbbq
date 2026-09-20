import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import MenuSection from "../components/menu/MenuSection";

import {
  dinnerSections,
  lunchSections,
  lunchComboSections,
  drinkSections,
} from "../data/menuData";

const menuTabs = [
  {
    id: "dinner",
    label: "Dinner",
  },
  {
    id: "lunch",
    label: "Lunch",
  },
  {
    id: "lunch-combos",
    label: "Lunch Combos",
  },
  {
    id: "drinks",
    label: "Drinks",
  },
];

const allMenus = [
  {
    id: "dinner",
    label: "Dinner",
    sections: dinnerSections,
  },
  {
    id: "lunch",
    label: "Lunch",
    sections: lunchSections,
  },
  {
    id: "lunch-combos",
    label: "Lunch Combos",
    sections: lunchComboSections,
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

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const isSearching = normalizedSearch.length > 0;

  const currentSections = useMemo(() => {
    switch (activeMenu) {
      case "lunch":
        return lunchSections;

      case "lunch-combos":
        return lunchComboSections;

      case "drinks":
        return drinkSections;

      case "dinner":
      default:
        return dinnerSections;
    }
  }, [activeMenu]);

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

  const handleTabChange = (tabId) => {
    setActiveMenu(tabId);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Main Menu Tabs */}
      <section className="sticky top-24 z-30 border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <div className="flex overflow-x-auto">
            {menuTabs.map((tab) => {
              const active = activeMenu === tab.id && !isSearching;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative shrink-0 px-6 py-6 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 first:pl-0 md:px-8 ${
                    active
                      ? "text-white"
                      : "text-white/30 hover:text-white"
                  }`}
                >
                  {tab.label}

                  <span
                    className={`absolute bottom-0 left-6 right-6 h-px bg-white transition-opacity duration-300 first:left-0 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search + Section Navigation */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          {/* Search */}
          <div className="flex items-center border-b border-white/10 py-5">
            <Search
              size={17}
              strokeWidth={1.5}
              className="mr-4 shrink-0 text-white/35"
              aria-hidden="true"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search the menu..."
              aria-label="Search the menu"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />

            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear menu search"
                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center text-white/35 transition-colors hover:text-white"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Section Links */}
          {!isSearching && (
            <div className="flex flex-wrap gap-x-7 gap-y-3 py-7">
              {currentSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
          )}

          {/* Search status */}
          {isSearching && (
            <div className="flex items-center justify-between gap-6 py-5">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                {searchResults.length}{" "}
                {searchResults.length === 1
                  ? "result"
                  : "results"}{" "}
                for
                <span className="ml-2 text-white/60">
                  “{searchQuery.trim()}”
                </span>
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="shrink-0 text-[9px] font-medium uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Normal Menu */}
      {!isSearching && (
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          {currentSections.map((section) => (
            <MenuSection
              key={section.id}
              section={section}
            />
          ))}
        </div>
      )}

      {/* Search Results */}
      {isSearching && (
        <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16 lg:px-12">
          {searchResults.length > 0 ? (
            <div className="grid gap-x-14 md:grid-cols-2">
              {searchResults.map((item, index) => (
                <SearchResult
                  key={`${item.menuLabel}-${item.sectionTitle}-${item.name}-${index}`}
                  item={item}
                />
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

      {/* Disclaimer */}
      <section className="border-t border-white/10 px-6 py-12 md:px-10 lg:px-12">
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
    </main>
  );
}

function SearchResult({ item }) {
  return (
    <article className="border-b border-white/10 py-6">
      <div className="flex items-start gap-5">
        {/* Thumbnail */}
        {item.image && (
          <div className="h-20 w-24 shrink-0 overflow-hidden bg-white/5 sm:h-24 sm:w-28">
            <img
              src={item.image}
              alt={item.imageAlt || item.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Location */}
          <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.18em] text-white/25">
            {item.menuLabel}
            <span className="mx-2 text-white/15">/</span>
            {item.sectionTitle}
          </p>

          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium text-white md:text-[15px]">
                  {item.name}
                </h3>

                {item.korean && (
                  <span className="text-xs text-white/30">
                    {item.korean}
                  </span>
                )}
              </div>

              {item.category && (
                <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                  {item.category}
                </p>
              )}
            </div>

            {item.price && (
              <span className="shrink-0 text-sm font-medium text-white/80">
                {item.price}
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-2 max-w-xl text-xs leading-5 text-white/40 md:text-[13px]">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}