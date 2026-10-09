import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Automatically load images from the menu folders
const menuImages = import.meta.glob(
  "../../assets/menu/**/*.webp",
  {
    eager: true,
    import: "default",
  }
);

const menuImage = (filename) => {
  const target = `/${filename}.webp`;

  const match = Object.entries(menuImages).find(
    ([path]) => path.endsWith(target)
  );

  return match?.[1] ?? null;
};

const dishes = [
  {
    number: "01",
    name: "Soon Doo Boo",
    korean: "순두부",
    description:
      "A comforting Korean soft tofu stew simmered with egg and your choice of seafood, beef, or kimchi. Served bubbling hot with a spicy kick.",
    image: menuImage("traditional-soon-doo-boo"),
    alt: "Soon Doo Boo Korean soft tofu stew at Ssambap Korean BBQ",
  },
  {
    number: "02",
    name: "Wang Kalbi Gui",
    korean: "왕갈비구이",
    description:
      "Our signature beef short ribs marinated in soy sauce, grilled to perfection and served with assorted banchan, fresh lettuce, and rice.",
    image:
      menuImage("kitchen-wang-kalbi-gui") ||
      menuImage("table-bbq-wang-kalbi-gui"),
    alt: "Wang Kalbi Gui marinated beef short ribs at Ssambap Korean BBQ",
  },
  {
    number: "03",
    name: "Jjam Pong",
    korean: "짬뽕",
    description:
      "A bold, spicy Korean noodle soup filled with seafood and vegetables in a rich, flavorful broth.",
    image: menuImage("traditional-jjam-pong"),
    alt: "Jjam Pong spicy seafood noodle soup at Ssambap Korean BBQ",
  },
];

export default function FeaturedDishes() {
  return (
    <section className="border-t border-white/10 px-6 py-20 text-white md:px-10 md:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="mb-10 md:mb-12">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
            Our Favorites
          </p>

          <h2 className="max-w-2xl text-4xl font-bold leading-[0.95] tracking-[-0.055em] md:text-6xl lg:text-7xl">
            A few things
            <br />
            to start with.
          </h2>
        </div>

        {/* =====================================================
            FEATURED DISHES
        ===================================================== */}

        <div className="space-y-10 md:space-y-12 lg:space-y-14">
          {dishes.map((dish, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <article
                key={dish.name}
                className="grid items-center gap-5 md:grid-cols-2 md:gap-6 lg:gap-7"
              >
                {/* IMAGE */}

                <div
                  className={`group overflow-hidden bg-white/5 ${
                    imageFirst
                      ? "md:order-1"
                      : "md:order-2"
                  }`}
                >
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.alt}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] md:aspect-[5/4]"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-white/5 md:aspect-[5/4]" />
                  )}
                </div>

                {/* TEXT */}

                <div
                  className={
                    imageFirst
                      ? "md:order-2 md:pl-1 lg:pl-2"
                      : "md:order-1 md:pr-1 lg:pr-2"
                  }
                >
                  <div
                    className={`max-w-lg ${
                      imageFirst ? "" : "md:ml-auto"
                    }`}
                  >
                    {/* DISH NUMBER */}

                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                      {dish.number}
                    </span>

                    {/* DISH NAME */}

                    <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="text-3xl font-bold tracking-[-0.045em] md:text-4xl lg:text-5xl">
                        {dish.name}
                      </h3>

                      <span className="text-base font-medium text-white/60">
                        {dish.korean}
                      </span>
                    </div>

                    {/* DIVIDER */}

                    <div className="mt-5 h-px w-12 bg-white/40" />

                    {/* DESCRIPTION */}

                    <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/75 md:text-base md:leading-8">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            VIEW MENU CTA
        ===================================================== */}

        <div className="mt-14 flex justify-center border-t border-white/15 pt-10 md:mt-16 md:pt-12">
          <Link
            to="/menu"
            className="group flex h-13 items-center gap-4 border border-white/40 bg-black/30 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            View Our Menu

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}