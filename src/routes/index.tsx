import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PageShell } from "@/components/noir/page-shell";
import { ProductCard } from "@/components/noir/product-card";
import { SplitText, Reveal } from "@/lib/noir/split-text";
import { Magnetic } from "@/lib/noir/magnetic";
import { useDemoModal } from "@/lib/noir/demo-modal";
import { demoProducts } from "@/lib/noir/demo-products";
import heroImg from "@/assets/noir/hero.jpg";
import SideRays from "@/components/noir/side-rays";
import p1 from "@/assets/noir/p1.avif";
import p2 from "@/assets/noir/p2.avif";
import p3 from "@/assets/noir/p3.avif";
import p4 from "@/assets/noir/p4.avif";
import categoryShoes from "@/assets/noir/category-shoes.jpg";
import categoryWomen from "@/assets/noir/category-women.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOIR | Moda Minimalista Premium" },
      { name: "description", content: "Piezas selectas. Diseño sin tiempo. La ropa que usas dice lo que no dices." },
      { property: "og:title", content: "NOIR | Moda Minimalista Premium" },
      { property: "og:description", content: "Piezas selectas. Diseño sin tiempo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "NOIR | Moda Minimalista Premium" },
      { name: "twitter:description", content: "Piezas selectas. Diseño sin tiempo." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Suaviza el progreso del scroll para un parallax fluido (anti-jank)
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.35 });
  const yBg = useTransform(smooth, [0, 1], ["0%", "35%"]);
  const scaleBg = useTransform(smooth, [0, 1], [1.08, 1.18]);
  const opacityBg = useTransform(smooth, [0, 0.85, 1], [1, 0.85, 0.4]);
  const { show } = useDemoModal();
  const featured = demoProducts.filter((p) => p.featured).slice(0, 4);

  const cats = [
    { name: "Hombre", img: p1 },
    { name: "Zapatos", img: categoryShoes },
    { name: "Mujer", img: categoryWomen },
    { name: "Accesorios", img: p3 },
  ];

  return (
    <PageShell>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 -top-[10%] -bottom-[10%] will-change-transform"
          style={{ y: yBg, scale: scaleBg, opacity: opacityBg }}
        >
          <img
            src={heroImg}
            alt="NOIR Nueva Colección 2026"
            width={1280}
            height={1920}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.85) 100%)" }} />
        </motion.div>

        {/* Side rays ambient light */}
        <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen">
          <SideRays
            speed={1.2}
            rayColor1="#C8A882"
            rayColor2="#F5F5F0"
            intensity={1.4}
            spread={1.8}
            origin="top-right"
            tilt={-5}
            saturation={1.1}
            blend={0.65}
            falloff={1.8}
            opacity={0.55}
          />
        </div>

        {/* Floating decorations */}
        <svg className="noir-float absolute top-[18%] right-[10%] opacity-20" width="80" height="80" viewBox="0 0 80 80" aria-hidden>
          <circle cx="40" cy="40" r="39" stroke="#C8A882" strokeWidth="0.5" fill="none" />
        </svg>
        <svg className="noir-float absolute bottom-[22%] left-[8%] opacity-15" width="120" height="1" viewBox="0 0 120 1" aria-hidden style={{ animationDelay: "2s" }}>
          <line x1="0" y1="0.5" x2="120" y2="0.5" stroke="#F5F5F0" strokeWidth="1" />
        </svg>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C8A882] mb-6"
          >
            Nueva Colección 2026
          </motion.p>
          <SplitText
            as="h1"
            className="font-display font-light text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-[#F5F5F0]"
          >{"Viste lo que\neres."}</SplitText>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 text-sm tracking-[0.2em] text-[#888] font-light uppercase"
          >
            Piezas selectas. Diseño sin tiempo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-6"
          >
            <Magnetic as="a" href="/coleccion" className="inline-block border border-[#C8A882] text-[#C8A882] px-8 py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors duration-300">
              Ver colección
            </Magnetic>
            <Link to="/nosotros" className="text-[#F5F5F0]/60 text-xs uppercase tracking-[0.25em] font-mono underline underline-offset-4 hover:text-[#C8A882]">
              Nuestra historia
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C8A882] to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SplitText as="h2" className="font-display italic font-light text-5xl md:text-7xl mb-16 text-[#F5F5F0]">Explorar</SplitText>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <Link to="/coleccion" className="group block relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#111]">
                <img src={c.img} alt={c.name} width={600} height={800} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                <div className="liquid-glass absolute inset-x-3 bottom-3 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-display italic text-lg text-[#F5F5F0]">{c.name}</p>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <p className="absolute bottom-4 left-4 font-display italic text-2xl text-[#F5F5F0] group-hover:opacity-0 transition-opacity">{c.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-end justify-between mb-16 gap-6">
          <SplitText as="h2" className="font-display italic font-light text-4xl md:text-6xl text-[#F5F5F0]">Selección de la semana</SplitText>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-16 text-center">
          <Magnetic as="a" href="/coleccion" className="inline-block border border-[rgba(255,255,255,0.2)] text-[#F5F5F0] px-10 py-3 text-xs uppercase tracking-[0.25em] font-mono hover:border-[#C8A882] hover:text-[#C8A882] transition-colors duration-300">
            Ver toda la colección
          </Magnetic>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-6">Sobre NOIR</p>
          <SplitText as="h2" className="font-display italic font-light text-5xl md:text-7xl text-[#F5F5F0] mb-8">{"Diseño con\nintención."}</SplitText>
          <p className="text-base font-light leading-relaxed text-[#F5F5F0]/70 max-w-md">
            NOIR nació de la convicción de que la ropa no es solo tela — es identidad. Cada pieza es seleccionada con criterio, pensada para durar y diseñada para destacar.
          </p>
          <Link to="/nosotros" className="inline-block mt-8 font-mono text-xs uppercase tracking-[0.25em] text-[#C8A882] hover:text-[#F5F5F0]">
            Conoce nuestra historia →
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={p2} alt="Editorial NOIR" width={600} height={800} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#111] py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <SplitText as="h2" className="font-display italic font-light text-4xl md:text-6xl text-[#F5F5F0]">Sé el primero en saber.</SplitText>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-[#888] font-light tracking-wide">
              Nuevas llegadas, ediciones limitadas y acceso anticipado.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); show(); }}
              className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email" required placeholder="Tu correo"
                className="liquid-glass flex-1 px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#666] outline-none rounded-none border-0"
              />
              <button type="submit" className="border border-[#C8A882] text-[#C8A882] px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors duration-300">
                Suscribirme
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
