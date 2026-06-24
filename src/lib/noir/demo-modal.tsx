import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Ctx = createContext<{ show: () => void } | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              role="dialog" aria-modal="true"
              className="liquid-glass relative max-w-md w-full p-10 text-center rounded-sm"
              style={{ background: "#0d0d0d" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-6">Demo</p>
              <h3 className="font-display text-2xl md:text-3xl font-light text-[#F5F5F0] leading-tight">
                Esta es una página demo de <span className="italic">Vyper Studio</span>.
              </h3>
              <p className="mt-4 text-sm text-[#888] font-light leading-relaxed">
                En la versión real, este mensaje llegaría directamente al negocio.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-8 border border-[#C8A882] text-[#C8A882] px-8 py-3 text-xs tracking-[0.2em] uppercase font-mono hover:bg-[#C8A882] hover:text-black transition-colors duration-300"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function useDemoModal() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return v;
}