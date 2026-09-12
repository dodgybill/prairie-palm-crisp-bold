import { Link } from "@tanstack/react-router";
import { Lock, Shield, Scale } from "lucide-react";
import { Btn, Mark, Pulse } from "./ui";

const TRACK = [
  "Small boat crossings — Home Office / maritime data",
  "Accommodation use — FOI-verified hotel lists",
  "Crime and incident logs — Police.uk / ONS",
  "RAF base conversions — planning portal",
  "Statistics — ONS migration releases",
];

const PROTOCOLS = [
  {
    t: "End-to-end encrypted rooms",
    d: "Messages are encrypted on the device before they hit the desk. Room keys never leave the client cipher. Server stores ciphertext.",
    icon: Lock,
    code: "E2E-01",
  },
  {
    t: "Confidential handling",
    d: "Whistleblower intake is visible only to vetted intelligence handlers. Source protection is enforced. No disclosure without consent.",
    icon: Shield,
    code: "CONF-03",
  },
  {
    t: "Lawful and accountable",
    d: "UK law only. No incitement, no harassment. Public assembly is subject to S12/S14 conditions. Evidence-led reporting.",
    icon: Scale,
    code: "LAW-UK",
  },
];

export function Landing({
  onApply,
  onWhistle,
}: {
  onApply: () => void;
  onWhistle: () => void;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line bg-bg sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div className="font-black tracking-[0.18em] text-lg font-mono shrink-0">
              PATRIOTNET
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Pulse />
              <Mark className="text-micro text-muted">Secure network</Mark>
            </div>
            <div className="hidden md:block ml-2 px-2.5 py-1 bg-surface border border-line text-micro font-mono tracking-widest text-muted">
              Encrypted & confidential
            </div>
          </div>
          <Link
            to="/login"
            className="h-11 px-4 bg-elevated border border-strong mark text-2xs hover:bg-strong inline-flex items-center"
          >
            Operator login
          </Link>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="py-10 md:py-16 border-b border-line">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6">
              Restricted — vetted access only
            </div>
            <h1 className="text-hero font-bold tracking-tight text-paper">
              UK patriot
              <br />
              information
              <br />
              network
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted max-w-[58ch]">
              Lawful information sharing for concerned British citizens.
              Documenting crossings, accommodation use, public expenditure and
              community impacts through verified sources, FOIs and official data.
            </p>
            <p className="mt-4 text-2xs font-mono text-subtle border-l-2 border-line pl-3">
              All communications encrypted. Confidential sources protected.
              Lawful conduct required. No incitement, no harassment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn variant="paper" onClick={onApply}>
                Apply to join
              </Btn>
              <Btn variant="accent" onClick={onWhistle}>
                Secure whistleblow
              </Btn>
              <Link
                to="/login"
                className="h-11 px-5 bg-surface border border-line mark text-2xs font-semibold inline-flex items-center hover:bg-elevated md:hidden"
              >
                Operator login
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-line border border-line mt-8">
          {PROTOCOLS.map((p) => (
            <div key={p.code} className="bg-surface p-6">
              <p.icon className="size-4 text-fg mb-4" strokeWidth={1.5} />
              <div className="mark text-2xs text-paper mb-3">{p.t}</div>
              <div className="text-sm leading-relaxed text-muted">{p.d}</div>
              <div className="mt-4 text-micro font-mono text-faint">
                Protocol: {p.code}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-8 pb-16">
          <div className="bg-surface border border-line p-6">
            <div className="mark text-2xs text-subtle mb-4">
              What we track — 128h window
            </div>
            <div className="space-y-3">
              {TRACK.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-muted">
                  <span className="text-dim">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-bg border border-line p-6">
            <div className="mark text-2xs text-subtle mb-4">Vetting process</div>
            <p className="text-sm leading-relaxed text-muted">
              Applications require alias, contact, region and reason. Senior
              admin review within 24–48h. No automatic approval. Sources may be
              contacted for verification.
            </p>
            <div className="mt-6 h-px bg-line" />
            <div className="mt-4 text-micro font-mono text-faint leading-relaxed">
              Encryption: AES-256-GCM on device
              <br />
              Session: signed Better Auth
            </div>
          </div>
        </div>

        <footer className="border-t border-line py-6 mark text-micro text-faint">
          PatriotNet — encrypted — all communications confidential — UK law applies
        </footer>
      </main>
    </div>
  );
}
