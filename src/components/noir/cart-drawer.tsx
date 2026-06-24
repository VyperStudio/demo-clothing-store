import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/noir/cart-context";
import { useDemoModal } from "@/lib/noir/demo-modal";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total } = useCart();
  const { show } = useDemoModal();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col"
            style={{ background: "#0D0D0D" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="font-display italic text-2xl font-light">Tu selección</h3>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="p-2 text-[#F5F5F0]/70 hover:text-[#C8A882]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="text-center mt-20">
                  <p className="font-display italic text-xl text-[#888] mb-4">Aún no hay nada aquí.</p>
                  <Link
                    to="/coleccion"
                    onClick={() => setOpen(false)}
                    className="font-mono text-xs uppercase tracking-[0.25em] text-[#C8A882] underline-offset-4 hover:underline"
                  >
                    Ver colección
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-4 pb-6 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="w-[60px] h-[80px] bg-[#1A1A1A] overflow-hidden shrink-0">
                        {it.image_url && <img src={it.image_url} alt={it.name} width={60} height={80} className="w-full h-full object-cover" loading="lazy" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light text-[#F5F5F0] truncate">{it.name}</p>
                        <p className="font-mono text-xs text-[#C8A882] mt-1">${it.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => setQty(it.id, it.quantity - 1)} className="w-6 h-6 border border-[rgba(255,255,255,0.15)] text-[#F5F5F0]/70 hover:border-[#C8A882] hover:text-[#C8A882]">−</button>
                          <span className="font-mono text-xs w-6 text-center">{it.quantity}</span>
                          <button onClick={() => setQty(it.id, it.quantity + 1)} className="w-6 h-6 border border-[rgba(255,255,255,0.15)] text-[#F5F5F0]/70 hover:border-[#C8A882] hover:text-[#C8A882]">+</button>
                        </div>
                      </div>
                      <button onClick={() => remove(it.id)} aria-label="Eliminar" className="text-[#666] hover:text-[#C8A882] text-lg leading-none self-start">×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex justify-between mb-5">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#888]">Subtotal</span>
                  <span className="font-mono text-sm text-[#C8A882]">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={show}
                  className="w-full border border-[#C8A882] text-[#C8A882] py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors duration-300"
                >
                  Finalizar pedido
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}