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

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">Ssambap Korean BBQ · Legal</p>
        <h1 className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">Privacy Policy</h1>
        <p className="mt-5 mb-12 text-xs text-white/40">Last updated: {updated}</p>
        <p className="mb-10 text-sm leading-7 text-white/60">
          Ssambap Korean BBQ ("Ssambap," "we," "us," or "our") respects your privacy.
          This policy explains how information may be collected, used, and shared when you visit our website or contact us.
        </p>

        <Section title="Information you provide">
          <p>If you submit our contact form or communicate with us, we may receive your name, email address, phone number, message, and any information you choose to include.</p>
        </Section>
        <Section title="Information collected automatically">
          <p>Our website and hosting providers may process technical information such as IP address, browser and device information, requested pages, and diagnostic or security logs. Whether analytics or optional cookies are used depends on the services actually enabled on our website.</p>
        </Section>
        <Section title="How we use information">
          <p>We use information to respond to inquiries, provide customer service, operate and secure our website, troubleshoot technical issues, and comply with applicable legal obligations. We do not use contact-form submissions for marketing emails without an appropriate basis or permission.</p>
        </Section>
        <Section title="Service providers and external websites">
          <p>Our hosting and form-processing providers may handle information on our behalf. When you follow links to third-party ordering, gift card, reservation, map, or social media services, those services may collect information under their own privacy policies. We do not control their practices.</p>
        </Section>
        <Section title="Data retention and security">
          <p>We retain information for as long as reasonably necessary for the purposes described here, including responding to requests and meeting legal obligations. We take reasonable steps to protect information, but no website or electronic transmission is completely secure.</p>
        </Section>
        <Section title="Your choices and requests">
          <p>You may contact us to ask about, correct, or request deletion of personal information you have submitted, subject to applicable law and legitimate retention needs. Your privacy rights may vary depending on where you live.</p>
        </Section>
        <Section title="Children's privacy">
          <p>Our website is intended for a general audience and is not directed to children under 13. We do not knowingly solicit personal information from children under 13.</p>
        </Section>
        <Section title="Updates to this policy">
          <p>We may update this policy as our website or practices change. The updated version will appear here with a revised date.</p>
        </Section>
        <Section title="Contact us">
          <p>Ssambap Korean BBQ, 2350 Nesconset Highway, Stony Brook, NY 11790.</p>
          <p>Email: <a className="underline underline-offset-4 hover:text-white" href="mailto:info@ssambapkbbq.com">info@ssambapkbbq.com</a> · Phone: <a className="underline underline-offset-4 hover:text-white" href="tel:+16316756402">(631) 675-6402</a></p>
        </Section>
        <p className="mt-10 text-xs text-white/35">See also our <Link to="/terms" className="underline underline-offset-4 hover:text-white">Terms of Service</Link>.</p>
      </div>
    </main>
  );
}
