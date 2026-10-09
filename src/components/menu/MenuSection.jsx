
import MenuItem from "./MenuItem";
import DinnerComboCard from "./DinnerComboCard";

function LunchComboChoices({ section }) {
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
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
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

      {/* STEP 2: ENTREE */}
      <div className="pt-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
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
          <div className="min-w-0 border border-white/15 p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
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
          <div className="min-w-0 border border-white/15 p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
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

      {/* $34 NOODLE ALTERNATIVE */}
      {noodles?.choices?.length > 0 && (
        <div className="mt-8 border border-white/15 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
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
            With the $34 combo, you may choose Neng Myun
            instead of soup. Choose one of the following.
            Dine-in only.
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
    section.title?.toLowerCase() === "dinner combos";

  const isLunchComboChoices =
    section.id === "lunch-combo-28-34" &&
    section.items?.some(
      (item) => item.choices?.length > 0
    );

  return (
    <section
      id={section.id}
      className="scroll-mt-[330px] border-t border-white/10 py-14 md:scroll-mt-64 md:py-20"
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          {section.number && (
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
              {section.number}
            </span>
          )}

          <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">
            {section.title}
          </h2>
        </div>

        {section.note && (
          <p className="max-w-2xl self-end text-xs leading-6 text-white/40 md:text-sm">
            {section.note}
          </p>
        )}
      </div>

      {isDinnerCombos ? (
        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {section.items.map((item, index) => (
            <DinnerComboCard
              key={`${section.id}-${item.name}-${index}`}
              item={item}
            />
          ))}
        </div>
      ) : isLunchComboChoices ? (
        <LunchComboChoices section={section} />
      ) : (
        <div className="mt-8 grid gap-x-12 md:mt-10 md:grid-cols-2 lg:gap-x-16">
          {section.items.map((item, index) => (
            <MenuItem
              key={`${section.id}-${item.name}-${index}`}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}
