
import MenuItem from "./MenuItem";
import DinnerComboCard from "./DinnerComboCard";

// Accent colors for standard menu sections.
// Navigation buttons remain white.
const sectionColors = {
  salads: "#79B88A",
  appetizers: "#E5A06B",
  "korean-bbq": "#D66B70",
  traditional: "#D5A943",
  bibimbaps: "#B39ADC",
  ssambap: "#80B9BC",
  children: "#E5A5BD",
  extras: "#A9B1BE",
  "lunch-combo-20": "#79B88A",
  "lunch-combo-28-34": "#D5A943",
  wine: "#B39ADC",
  sake: "#80B9BC",
  beer: "#D5A943",
  soju: "#D66B70",
  "korean-fruit-drinks": "#79B88A",
  "soft-drinks": "#E5A06B",
};

// Convert section accent colors into transparent backgrounds.
function hexToRgba(hex, opacity = 0.12) {
  const value = hex.replace("#", "");

  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function LunchComboChoices({ section, accent }) {
  const groups = section.items || [];

  const soup = groups.find(
    (group) => group.name === "Select Your Soup"
  );

  const option28 = groups.find(
    (group) => group.name === "Option 1"
  );

  const option34 = groups.find(
    (group) => group.name === "Option 2"
  );

  const noodles = groups.find(
    (group) => group.name === "Neng Myun Alternative"
  );

  const renderChoices = (group) => (
    <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {(group?.choices || []).map((choice, index) => (
        <MenuItem
          key={`${group.name}-${choice.name}-${index}`}
          item={choice}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-10">
      {/* STEP 1: SOUP */}
      <div className="border-b border-white/15 pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Step 01
          </span>

          <span className="h-px w-8 bg-white/20" />

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
            Included with both combos
          </span>
        </div>

        <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
          Choose Your Soup
        </h3>

        <p className="mt-2 text-sm text-white/45">
          Start by choosing one soup for your combo.
        </p>

        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {renderChoices(soup)}
        </div>
      </div>

      {/* STEP 2: COMBO */}
      <div className="pt-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Step 02
          </span>

          <span className="h-px w-8 bg-white/20" />

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
            Choose one entrée
          </span>
        </div>

        <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
          Choose Your Combo
        </h3>

        <p className="mt-2 text-sm text-white/45">
          Pick one entrée from either Option 1 or Option 2.
          Each combo includes your soup choice.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* $28 OPTION */}
          <div
            className="min-w-0 border border-white/15 p-5 sm:p-7"
            style={{
              borderTopColor: accent,
              borderTopWidth: 3,
            }}
          >
            <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Option 01
                </p>

                <h4 className="mt-2 text-xl font-medium tracking-tight text-white">
                  Korean Favorites
                </h4>
              </div>

              <span className="text-3xl font-medium tracking-tight text-white">
                $28
              </span>
            </div>

            {renderChoices(option28)}
          </div>

          {/* $34 OPTION */}
          <div
            className="min-w-0 border border-white/15 p-5 sm:p-7"
            style={{
              borderTopColor: accent,
              borderTopWidth: 3,
            }}
          >
            <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Option 02
                </p>

                <h4 className="mt-2 text-xl font-medium tracking-tight text-white">
                  Korean BBQ
                </h4>
              </div>

              <span className="text-3xl font-medium tracking-tight text-white">
                $34
              </span>
            </div>

            {renderChoices(option34)}
          </div>
        </div>
      </div>

      {/* NOODLE ALTERNATIVE */}
      {noodles?.choices?.length > 0 && (
        <div
          className="mt-8 border border-white/15 p-5 sm:p-7"
          style={{
            borderTopColor: accent,
            borderTopWidth: 3,
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Option 02 Only
            </span>

            <span className="h-px w-8 bg-white/20" />

            <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
              Soup Alternative
            </span>
          </div>

          <h4 className="mt-3 text-xl font-medium tracking-tight text-white">
            Prefer Neng Myun?
          </h4>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
            With the $34 combo, you may choose Neng Myun instead
            of soup. Choose one of the following. Dine-in only.
          </p>

          <div className="mt-5 grid gap-x-10 md:grid-cols-2">
            {renderChoices(noodles)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuSection({ section }) {
  const isDinnerCombos =
    section.id === "dinner-combos" ||
    section.title?.toLowerCase() === "dinner combos";

  const isLunchComboChoices =
    section.id === "lunch-combo-28-34" &&
    section.items?.some((item) => item.choices?.length > 0);

  const accent = sectionColors[section.id] || "#D66B70";

  // Dinner Combo cards keep their existing red, yellow,
  // and blue fades, without a redundant section heading.
  if (isDinnerCombos) {
    return (
      <section
        id={section.id}
        aria-label="Dinner Combo Sets"
        className="border-t border-white/10 py-8 md:py-12"
      >
        <div className="grid gap-x-6 gap-y-12 lg:grid-cols-2 lg:gap-y-16">
          {(section.items || []).map((item, index) => {
            const comboNumber =
              Number(item.comboNumber) || index + 1;

            return (
              <div
                key={`${section.id}-${item.name}-${index}`}
                id={`dinner-combo-${comboNumber}`}
                className="min-w-0 scroll-mt-[125px]"
              >
                <DinnerComboCard item={item} />
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      id={section.id}
      className="scroll-mt-[130px] border-t border-white/10 py-14 md:py-20"
    >
      {/* SECTION HEADER WITH COLORED BACKGROUND FADE */}
      <div
        className="relative overflow-hidden border-b px-5 py-6 sm:px-6 md:py-8"
        style={{
          borderBottomColor: accent,
          background: `linear-gradient(
            90deg,
            ${hexToRgba(accent, 0.12)} 0%,
            ${hexToRgba(accent, 0.05)} 55%,
            transparent 85%
          )`,
        }}
      >
        {/* Left accent bar */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[4px]"
          style={{ backgroundColor: accent }}
        />

        <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div>
            {section.number && (
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: accent }}
              >
                {section.number}
              </span>
            )}

            <h2
              className="mt-3 text-2xl font-semibold tracking-[-0.035em] md:text-3xl"
              style={{ color: accent }}
            >
              {section.title}
            </h2>
          </div>

          {section.note && (
            <p className="max-w-2xl self-end text-xs leading-6 text-white/60 md:text-sm">
              {section.note}
            </p>
          )}
        </div>
      </div>

      {/* LUNCH COMBO CHOICES */}
      {isLunchComboChoices ? (
        <LunchComboChoices
          section={section}
          accent={accent}
        />
      ) : (
        <div className="mt-8 md:mt-10">
          {/* SOUPS INSIDE APPETIZERS */}
          {section.soupItems?.length > 0 && (
            <div className="mb-12">
              <h3
                className="mb-5 border-l-[3px] pl-3 text-lg font-semibold uppercase tracking-[0.08em]"
                style={{
                  color: accent,
                  borderLeftColor: accent,
                }}
              >
                Soups
              </h3>

              <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-16">
                {section.soupItems.map((item, index) => (
                  <MenuItem
                    key={`${section.id}-soup-${item.name}-${index}`}
                    item={item}
                  />
                ))}
              </div>

              <h3
                className="mt-10 border-l-[3px] pl-3 text-lg font-semibold uppercase tracking-[0.08em]"
                style={{
                  color: accent,
                  borderLeftColor: accent,
                }}
              >
                Appetizers
              </h3>
            </div>
          )}

          <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-16">
            {(section.items || []).map((item, index) => (
              <MenuItem
                key={`${section.id}-${item.name}-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
