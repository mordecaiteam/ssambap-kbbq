const tabs = [
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

export default function MenuTabs({
  activeTab,
  onChange,
}) {
  return (
    <div className="overflow-x-auto border-y border-white/10 bg-black">
      <div className="mx-auto flex min-w-max max-w-[1400px] px-6 md:px-10 lg:px-12">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative py-5 pr-8 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:pr-12 ${
                active
                  ? "text-white"
                  : "text-white/35 hover:text-white"
              }`}
            >
              {tab.label}

              <span
                className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                  active ? "w-[calc(100%-2rem)]" : "w-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}