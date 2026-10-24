import { Link } from "react-router-dom";

const updated = "October 10, 2026";

function Section({ title, children }) {
  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="mb-4 text-xl font-medium tracking-tight text-white">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-white/60">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">Ssambap Korean BBQ · Legal</p>
        <h1 className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">Terms of Service</h1>
        <p className="mt-5 mb-12 text-xs text-white/40">Last updated: {updated}</p>
        <p className="mb-10 text-sm leading-7 text-white/60">These terms govern your use of the Ssambap Korean BBQ website. By using the website, you agree to these terms to the extent permitted by applicable law.</p>
        <Section title="Website information">
          <p>We aim to keep our menu, prices, availability, hours, promotions, and other website information accurate, but details may change or contain errors. Please confirm important information with the restaurant. Website content is informational and does not guarantee availability or a particular price.</p>
        </Section>
        <Section title="Food allergies and dietary information">
          <p>Menu descriptions and dietary labels are provided for convenience and may not identify every ingredient or cross-contact risk. Our kitchen handles common allergens. If you have an allergy or dietary restriction, contact our staff before ordering. Do not rely solely on website descriptions when making allergy-related decisions.</p>
        </Section>
        <Section title="Orders, reservations, and gift cards">
          <p>Orders, reservations, and gift card purchases may be handled by third-party platforms. Their terms, payment policies, cancellation rules, refund policies, and privacy practices may apply to transactions made through those platforms. Contact the relevant provider or the restaurant for transaction-specific questions.</p>
        </Section>
        <Section title="Acceptable use">
          <p>You agree not to misuse the website, attempt unauthorized access, interfere with its operation, or use it in violation of applicable law.</p>
        </Section>
        <Section title="Website content">
          <p>Unless otherwise stated, our website text, branding, photographs, and other original content are owned by Ssambap or used with permission. You may view the website for personal, noncommercial purposes; other reproduction or commercial use requires appropriate authorization.</p>
        </Section>
        <Section title="External links">
          <p>Links to third-party sites are provided for convenience. We do not control those sites and are not responsible for their content or practices.</p>
        </Section>
        <Section title="Availability and liability">
          <p>We may modify or suspend website features without notice. To the extent permitted by law, the website is provided without warranties of uninterrupted availability or error-free operation. Nothing in these terms excludes rights or liabilities that cannot legally be excluded.</p>
        </Section>
        <Section title="Changes and governing law">
          <p>We may update these terms by posting a revised version. These terms are governed by the laws of the State of New York, subject to any mandatory consumer protections that apply.</p>
        </Section>
        <Section title="Contact us">
          <p>Ssambap Korean BBQ, 2350 Nesconset Highway, Stony Brook, NY 11790.</p>
          <p>Email: <a className="underline underline-offset-4 hover:text-white" href="mailto:info@ssambapkbbq.com">info@ssambapkbbq.com</a> · Phone: <a className="underline underline-offset-4 hover:text-white" href="tel:+16316756402">(631) 675-6402</a></p>
        </Section>
        <p className="mt-10 text-xs text-white/35">See also our <Link to="/privacy" className="underline underline-offset-4 hover:text-white">Privacy Policy</Link>.</p>
      </div>
    </main>
  );
}
