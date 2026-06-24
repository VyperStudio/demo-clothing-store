import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/noir/page-shell";
import { ProductCard } from "@/components/noir/product-card";
import { SplitText } from "@/lib/noir/split-text";
import { demoProducts } from "@/lib/noir/demo-products";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category } from "@/lib/noir/types";

export const Route = createFileRoute("/coleccion")({
  head: () => ({
    meta: [
      { title: "Colección | NOIR" },
      { name: "description", content: "Descubre la colección completa NOIR: piezas selectas para Mujer, Hombre y Accesorios." },
      { property: "og:title", content: "Colección | NOIR" },
      { property: "og:description", content: "Descubre la colección completa NOIR." },
    ],
    links: [{ rel: "canonical", href: "/coleccion" }],
  }),
  component: Coleccion,
});

const cats: ("Todo" | Category)[] = ["Todo", "Mujer", "Hombre", "Accesorios"];

function Coleccion() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [filter, setFilter] = useState<(typeof cats)[number]>("Todo");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (data && data.length > 0) {
        setProducts(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: Number(p.price),
            category: p.category as Category,
            image_url: p.image_url,
            available: p.available,
            featured: p.featured,
          })),
        );
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const visible = useMemo(
    () => (filter === "Todo" ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  );

  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-16 max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-6">Colección 2026</p>
        <SplitText as="h1" className="font-display italic font-light text-5xl md:text-8xl text-[#F5F5F0]">
          Toda la colección
        </SplitText>
        <p className="mt-6 text-sm text-[#888] max-w-xl font-light leading-relaxed">
          Piezas atemporales, materiales nobles. Selecciona por categoría.
        </p>

        <div className="mt-12 flex flex-wrap gap-2 md:gap-3">
          {cats.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 text-[11px] font-mono uppercase tracking-[0.25em] border transition-all duration-300 ${
                  active
                    ? "border-[#C8A882] text-black bg-[#C8A882]"
                    : "border-[rgba(255,255,255,0.15)] text-[#F5F5F0]/70 hover:border-[#C8A882] hover:text-[#C8A882]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="text-center py-32 font-display italic text-2xl text-[#666]">Nada por aquí.</p>
        )}
      </section>
    </PageShell>
  );
}