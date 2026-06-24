import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "noir-cookies-v1";

export function CookiesBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);
  const dismiss = (val: "accept" | "decline") => {
    try { localStorage.setItem(KEY, val); } catch { /* ignore */ }
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[80]"
        >
          <div className="liquid-glass p-6 rounded-sm" style={{ background: "rgba(13,13,13,0.92)" }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-3">Cookies</p>
            <p className="text-sm font-light text-[#F5F5F0]/80 leading-relaxed">
              Usamos cookies para mejorar tu experiencia. Lee nuestra{" "}
              <Link to="/cookies" className="underline underline-offset-4 hover:text-[#C8A882]">política</Link>.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => dismiss("accept")} className="border border-[#C8A882] text-[#C8A882] px-5 py-2 text-[11px] uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors">
                Aceptar
              </button>
              <button onClick={() => dismiss("decline")} className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#888] hover:text-[#F5F5F0]">
                Rechazar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}