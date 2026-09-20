import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import wangKalbiImage from "../assets/menu/menu-wang-kalbi.jpg";
import bulgogiImage from "../assets/menu/menu-bulgogi.jpg";

const dishes = [
  {
    number: "01",
    name: "Wang Kalbi Gui",
    description: "Marinated beef short ribs",
    image: wangKalbiImage,
    alt: "Wang Kalbi Gui at Ssambap Korean BBQ",
  },
  {
    number: "02",
    name: "Bulgogi",
    description: "Thinly sliced marinated beef",
    image: bulgogiImage,
    alt: "Bulgogi at Ssambap Korean BBQ",
  },
];

export default function FeaturedDishes() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Our Favorites
            </p>

            <h2 className="max-w-xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
              A few things
              <br />
              to start with.
            </h2>
          </div>

          <Link
            to="/menu"
            className="group hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white md:flex"
          >
            Full Menu

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-6">
          {dishes.map((dish) => (
            <article key={dish.name} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-white/5">
                <img
                  src={dish.image}
                  alt={dish.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <div className="mt-5 flex gap-5">
                <span className="pt-1 text-[10px] tracking-wider text-white/30">
                  {dish.number}
                </span>

                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {dish.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/45">
                    {dish.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/menu"
          className="mt-12 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white md:hidden"
        >
          Full Menu

          <ArrowRight
            size={15}
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </section>
  );
}