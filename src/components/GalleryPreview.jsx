import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GalleryPreview() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
            A Look Inside
          </p>

          <h2 className="text-5xl font-medium tracking-[-0.05em] md:text-7xl">
            Ssambap.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="group col-span-8 overflow-hidden md:col-span-5">
            <img
              src="/images/gallery-1.jpg"
              alt="Ssambap Korean BBQ"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>

          <div className="group col-span-4 mt-20 overflow-hidden md:col-span-3 md:col-start-8">
            <img
              src="/images/gallery-2.jpg"
              alt="Korean food at Ssambap"
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>

          <div className="group col-span-8 col-start-3 mt-8 overflow-hidden md:col-span-5 md:col-start-6">
            <img
              src="/images/gallery-3.jpg"
              alt="Ssambap dining experience"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>
        </div>

        <div className="mt-14 flex justify-end">
          <Link
            to="/gallery"
            className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            View Gallery

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