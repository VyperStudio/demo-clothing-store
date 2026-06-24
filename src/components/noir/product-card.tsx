import { motion } from "framer-motion";
import { useCart } from "@/lib/noir/cart-context";
import type { Product } from "@/lib/noir/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, setOpen } = useCart();
  const handleAdd = () => {
    add({ id: product.id, name: product.name, price: Number(product.price), image_url: product.image_url ?? undefined });
    setOpen(true);
  };
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] border border-transparent group-hover:border-[rgba(200,168,130,0.3)] transition-all duration-500"
        style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      >
        <img
          src={product.image_url || `https://placehold.co/600x800/111111/333333.png`}
          alt={product.name}
          width={600}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <button
          onClick={handleAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className="absolute inset-x-3 bottom-3 min-h-[44px] bg-[#C8A882] text-black text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-mono flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#F5F5F0] md:translate-y-1 md:opacity-90 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <span className="text-base leading-none">+</span>
          Añadir
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-light text-[#F5F5F0] truncate" style={{ fontFamily: "Inter, sans-serif" }}>{product.name}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888] mt-1">{product.category}</p>
        </div>
        <p className="font-mono text-sm text-[#C8A882] shrink-0">${Number(product.price).toFixed(0)}</p>
      </div>
    </motion.article>
  );
}