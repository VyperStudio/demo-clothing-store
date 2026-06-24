import { type ReactNode } from "react";
import { PageShell } from "./page-shell";
import { SplitText, Reveal } from "@/lib/noir/split-text";

export function LegalPage({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <PageShell>
      <article className="pt-32 md:pt-40 pb-32 max-w-3xl mx-auto px-6 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-6">{kicker}</p>
        <SplitText as="h1" className="font-display italic font-light text-5xl md:text-7xl text-[#F5F5F0]">
          {title}
        </SplitText>
        <Reveal delay={0.15}>
          <div className="mt-12 space-y-6 text-[#F5F5F0]/75 font-light leading-relaxed [&_h2]:font-display [&_h2]:italic [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-[#F5F5F0] [&_h2]:mt-12 [&_h2]:mb-3 [&_p]:text-sm [&_p]:md:text-base">
            {children}
          </div>
        </Reveal>
      </article>
    </PageShell>
  );
}