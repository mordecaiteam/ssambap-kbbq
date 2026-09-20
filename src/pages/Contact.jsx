import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const hours = [
  ["Thursday", "12–3 PM, 5–9 PM"],
  ["Friday", "12–3 PM, 5–9 PM"],
  ["Saturday", "12–9 PM"],
  ["Sunday", "12–9 PM"],
  ["Monday", "Closed"],
  ["Tuesday", "12–3 PM, 5–9 PM"],
  ["Wednesday", "12–3 PM, 5–9 PM"],
];

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormData(initialForm);
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-28">

          {/* ======================================================
              LEFT — CONTACT FORM
          ====================================================== */}
          <div>
            <div className="mb-14">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                Get In Touch
              </p>

              <h1 className="max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                Questions,
                <br />
                comments,
                <br />
                or just say hi.
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/40">
                Send us a message and we'll get back to you as soon
                as we can.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col justify-center border-y border-white/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  <Check size={20} strokeWidth={1.5} />
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.04em]">
                  Message received.
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                  Thanks for reaching out. We'll get back to you as
                  soon as we can.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 w-fit text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Netlify */}
                <input
                  type="hidden"
                  name="form-name"
                  value="contact"
                />

                {/* Honeypot */}
                <p className="hidden">
                  <label>
                    Don't fill this out:
                    <input
                      name="bot-field"
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </label>
                </p>

                {/* Name + Email */}
                <div className="grid gap-10 md:grid-cols-2">
                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mt-10">
                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                {/* Message */}
                <div className="mt-10">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-[9px] font-medium uppercase tracking-[0.25em] text-white/40"
                  >
                    Message
                    <span className="ml-1 text-white/30">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full resize-none border-0 border-b border-white/20 bg-transparent py-3 text-base text-white outline-none transition-colors duration-300 focus:border-white"
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-6 text-sm leading-6 text-white/60"
                  >
                    Something went wrong while sending your message.
                    Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-12 flex h-12 items-center gap-4 bg-white px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Send Message"}

                  {status !== "submitting" && (
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ======================================================
              RIGHT — RESTAURANT INFORMATION
          ====================================================== */}
          <aside className="lg:border-l lg:border-white/10 lg:pl-14">

            {/* Address */}
            <InfoSection
              icon={<MapPin size={18} strokeWidth={1.5} />}
              title="Address"
            >
              <p className="text-sm leading-7 text-white/70">
                2350 Nesconset Highway
                <br />
                Stony Brook, NY 11790
              </p>

              <a
                href="https://maps.app.goo.gl/WmDyp3qf2RutSQEDA"
                target="_blank"
                rel="noreferrer"
                className="group mt-5 flex w-fit items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                Get Directions

                <ArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </InfoSection>

            {/* Hours */}
            <InfoSection
              icon={<Clock3 size={18} strokeWidth={1.5} />}
              title="Hours"
            >
              <div className="max-w-sm space-y-2">
                {hours.map(([day, time]) => (
                  <div
                    key={day}
                    className="flex justify-between gap-8 text-sm"
                  >
                    <span className="text-white/40">
                      {day}
                    </span>

                    <span
                      className={
                        time === "Closed"
                          ? "text-white/30"
                          : "text-white/70"
                      }
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </InfoSection>

            {/* Phone + Email */}
            <InfoSection
              icon={<Phone size={18} strokeWidth={1.5} />}
              title="Contact"
            >
              <div className="flex flex-col items-start gap-4">
                <a
                  href="tel:+16316756402"
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone
                    size={14}
                    strokeWidth={1.5}
                    className="text-white/30"
                  />

                  (631) 675-6402
                </a>

                <a
                  href="mailto:info@ssambapkbbq.com"
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail
                    size={14}
                    strokeWidth={1.5}
                    className="text-white/30"
                  />

                  info@ssambapkbbq.com
                </a>
              </div>
            </InfoSection>

            {/* Social */}
            <InfoSection title="Follow">
              <div className="flex gap-3">
                <SocialLink
                  href="YOUR_INSTAGRAM_URL"
                  label="Instagram"
                >
                  <FaInstagram size={17} />
                </SocialLink>

                <SocialLink
                  href="YOUR_FACEBOOK_URL"
                  label="Facebook"
                >
                  <FaFacebookF size={15} />
                </SocialLink>
              </div>
            </InfoSection>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function InfoSection({ icon, title, children }) {
  return (
    <div className="border-b border-white/10 py-9 first:pt-0">
      <div className="mb-5 flex items-center gap-3">
        {icon && (
          <span className="text-white/40">
            {icon}
          </span>
        )}

        <h2 className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
    >
      {children}
    </a>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-[9px] font-medium uppercase tracking-[0.25em] text-white/40"
      >
        {label}

        {required && (
          <span className="ml-1 text-white/30">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-0 border-b border-white/20 bg-transparent py-3 text-base text-white outline-none transition-colors duration-300 focus:border-white"
      />
    </div>
  );
}