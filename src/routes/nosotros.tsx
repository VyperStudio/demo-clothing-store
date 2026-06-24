import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/noir/page-shell";
import { SplitText, Reveal } from "@/lib/noir/split-text";
import p2 from "@/assets/noir/p2.avif";
import p5 from "@/assets/noir/p5.avif";
import p6 from "@/assets/noir/p6.avif";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nuestra historia | NOIR" },
      { name: "description", content: "NOIR nace de una convicción: la ropa es identidad. Conoce nuestra filosofía y nuestro proceso." },
      { property: "og:title", content: "Nuestra historia | NOIR" },
      { property: "og:description", content: "La ropa es identidad. Conoce la filosofía NOIR." },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: Nosotros,
});

function Nosotros() {
  const pillars = [
    { n: "01", t: "Materiales nobles", d: "Lino, lana, algodón egipcio. Solo trabajamos con tejidos que envejecen con dignidad." },
    { n: "02", t: "Producción consciente", d: "Series cortas, sin saldos. Cada pieza se confecciona bajo demanda en talleres de Europa." },
    { n: "03", t: "Diseño sin tiempo", d: "Ignoramos las tendencias. Diseñamos prendas que seguirán vigentes en diez años." },
  ];
  return (
    <PageShell>
      <section className="pt-32 md:pt-44 pb-24 max-w-5xl mx-auto px-6 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-8">Sobre NOIR</p>
        <SplitText as="h1" className="font-display italic font-light text-5xl md:text-8xl leading-[0.95] text-[#F5F5F0]">
          {"Hecho para\ndurar."}
        </SplitText>
        <Reveal delay={0.2}>
          <p className="mt-10 text-lg md:text-xl font-light text-[#F5F5F0]/75 leading-relaxed max-w-2xl">
            En un mundo saturado de ropa desechable, NOIR es una pausa. Una invitación a poseer menos y elegir mejor. Cada prenda nace de una pregunta: ¿la usarás dentro de diez años?
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-6 md:gap-10">
        <Reveal><img src={p5} alt="Atelier NOIR" width={800} height={1000} loading="lazy" className="w-full aspect-[4/5] object-cover" /></Reveal>
        <Reveal delay={0.15}>
          <div className="md:pt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-5">Origen</p>
            <h2 className="font-display italic font-light text-4xl md:text-5xl text-[#F5F5F0] mb-6">2024 — Barcelona.</h2>
            <p className="text-base font-light leading-relaxed text-[#F5F5F0]/70">
              Fundamos NOIR con una idea simple: vestir con intención. Empezamos con cinco piezas y un atelier minúsculo. Hoy, nuestra colección sigue siendo deliberadamente pequeña.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SplitText as="h2" className="font-display italic font-light text-4xl md:text-6xl text-[#F5F5F0] mb-16">Tres principios.</SplitText>
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <p className="font-mono text-xs text-[#C8A882] mb-4">{p.n}</p>
              <h3 className="font-display italic text-2xl text-[#F5F5F0] mb-3">{p.t}</h3>
              <p className="text-sm font-light leading-relaxed text-[#F5F5F0]/65">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-32 grid md:grid-cols-2 gap-6 md:gap-10">
        <Reveal>
          <div className="md:pt-20 order-2 md:order-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-5">Proceso</p>
            <h2 className="font-display italic font-light text-4xl md:text-5xl text-[#F5F5F0] mb-6">Lento, con criterio.</h2>
            <p className="text-base font-light leading-relaxed text-[#F5F5F0]/70">
              Diseñamos dos colecciones al año. Cada prenda pasa por al menos seis pruebas antes de llegar a tus manos. La velocidad no es nuestro objetivo — la permanencia sí.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <img src={p6} alt="Proceso NOIR" width={800} height={1000} loading="lazy" className="w-full aspect-[4/5] object-cover order-1 md:order-2" />
        </Reveal>
      </section>

      <section className="bg-[#111] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SplitText as="h2" className="font-display italic font-light text-4xl md:text-6xl text-[#F5F5F0]">
            "Menos, pero mejor."
          </SplitText>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-[#C8A882]">— Dieter Rams</p>
        </div>
      </section>
    </PageShell>
  );
}