import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/noir/page-shell";
import { SplitText, Reveal } from "@/lib/noir/split-text";
import { useDemoModal } from "@/lib/noir/demo-modal";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | NOIR" },
      { name: "description", content: "Escríbenos. Atelier en Barcelona, atención personalizada." },
      { property: "og:title", content: "Contacto | NOIR" },
      { property: "og:description", content: "Atelier en Barcelona — escríbenos." },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  const { show } = useDemoModal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-12 max-w-5xl mx-auto px-6 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-6">Contacto</p>
        <SplitText as="h1" className="font-display italic font-light text-5xl md:text-8xl text-[#F5F5F0]">
          Hablemos.
        </SplitText>
        <p className="mt-6 text-sm text-[#888] font-light max-w-xl leading-relaxed">
          Atención personalizada, lunes a viernes. Respondemos en menos de 24 horas.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-32 grid md:grid-cols-2 gap-16 md:gap-24">
        <Reveal>
          <form onSubmit={(e) => { e.preventDefault(); show(); }} className="space-y-8">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Nombre</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="noir-input" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="noir-input" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Mensaje</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="noir-input resize-none" />
            </div>
            <button type="submit" className="border border-[#C8A882] text-[#C8A882] px-10 py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors duration-300">
              Enviar
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-3">Atelier</p>
              <p className="font-display italic text-2xl text-[#F5F5F0] leading-tight">Carrer de la Princesa, 14<br/>Barcelona — España</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-3">Email</p>
              <button onClick={show} className="font-display italic text-2xl text-[#F5F5F0] hover:text-[#C8A882] transition-colors">hola@noir.com</button>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-3">Horario</p>
              <p className="font-light text-[#F5F5F0]/70">Lunes — Viernes<br/>10:00 — 19:00</p>
            </div>
            <div className="flex gap-6 pt-4">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <button key={s} onClick={show} className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#888] hover:text-[#C8A882]">{s}</button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}