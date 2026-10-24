
import {
  ArrowUpRight,
  Clock3,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const hours = [
  ["Monday", "Closed"],
  ["Tuesday", "12–3 PM, 5–9 PM"],
  ["Wednesday", "12–3 PM, 5–9 PM"],
  ["Thursday", "12–3 PM, 5–9 PM"],
  ["Friday", "12–3 PM, 5–9 PM"],
  ["Saturday", "12–9 PM"],
  ["Sunday", "12–9 PM"],
];

const address =
  "2350 Nesconset Hwy Ste 700B, Stony Brook, NY 11790";

const googleMapsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

const appleMapsUrl =
  `https://maps.apple.com/?daddr=${encodeURIComponent(address)}&dirflg=d`;

const mapsEmbedUrl =
  `https://www.google.com/maps?q=${encodeURIComponent(
    `Ssambap Korean BBQ, ${address}`
  )}&output=embed`;

export default function VisitUs() {
  return (
    <section
      id="visit-us"
      aria-label="Visit Ssambap Korean BBQ"
      className="border-t border-white/10 px-5 py-16 text-white md:px-10 md:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* SECTION TITLE */}
        <div className="mb-10 md:mb-12">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            Visit Us
          </p>

          <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">
            Find Us & Opening Hours
          </h2>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* LEFT — GOOGLE MAPS */}
          <div className="min-w-0">
            <div className="overflow-hidden border border-white/15 bg-black/50">
              <iframe
                title="Ssambap Korean BBQ location on Google Maps"
                src={mapsEmbedUrl}
                className="h-[320px] w-full md:h-[420px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* ADDRESS */}
            <div className="mt-5 flex items-start gap-3">
              <MapPin
                size={16}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-white/40"
              />

              <p className="text-sm leading-6 text-white/60">
                2350 Nesconset Highway
                <br />
                Stony Brook, NY 11790
              </p>
            </div>

            {/* DIRECTIONS OPTIONS */}
            <div className="mt-6 flex flex-wrap gap-3">
              {/* GOOGLE MAPS */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-3 border border-white/40 bg-black px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-white/85"
              >
                Google Maps

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {/* APPLE MAPS */}
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-3 border border-white/40 bg-black/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Apple Maps

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          {/* RIGHT — HOURS & CONTACT */}
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-12">
            {/* HOURS */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Clock3
                  size={18}
                  strokeWidth={1.5}
                  className="text-white/50"
                />

                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Store Hours
                </h3>
              </div>

              <div className="space-y-3">
                {hours.map(([day, time]) => (
                  <div
                    key={day}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-white/45">
                      {day}
                    </span>

                    <span
                      className={`text-right ${
                        time === "Closed"
                          ? "text-white/30"
                          : "text-white/80"
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="mt-10 border-t border-white/15 pt-8">
              <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Contact Information
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+16316756402"
                  className="flex w-fit items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone
                    size={17}
                    strokeWidth={1.5}
                    className="text-white/40"
                  />

                  (631) 675-6402
                </a>

                <a
                  href="mailto:info@ssambapkbbq.com"
                  className="flex w-fit items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail
                    size={17}
                    strokeWidth={1.5}
                    className="text-white/40"
                  />

                  info@ssambapkbbq.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
