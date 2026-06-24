import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/noir/cart-context";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/coleccion", label: "Colección" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-400 ${
          scrolled ? "liquid-glass border-b border-[rgba(255,255,255,0.06)]" : ""
        }`}
        style={{ transition: "all 0.4s ease" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-display italic font-light text-xl tracking-[0.3em] text-[#F5F5F0]">
            NOIR
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs uppercase tracking-[0.25em] text-[#F5F5F0]/80 hover:text-[#C8A882] transition-colors"
                activeProps={{ className: "text-xs uppercase tracking-[0.25em] text-[#C8A882]" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              aria-label="Carrito"
              onClick={() => setOpen(true)}
              className="relative text-[#F5F5F0] hover:text-[#C8A882] transition-colors p-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h12l-1.5 11a2 2 0 01-2 1.8h-5a2 2 0 01-2-1.8L6 7z" />
                <path d="M9 7V5a3 3 0 016 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C8A882] text-black text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label="Menú"
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-[#F5F5F0] p-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-50 md:hidden"
        style={{
          background: "#080808",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-[rgba(255,255,255,0.06)]">
          <span className="font-display italic font-light text-xl tracking-[0.3em] text-[#F5F5F0]">NOIR</span>
          <button aria-label="Cerrar" onClick={() => setMenuOpen(false)} className="text-[#F5F5F0] p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <nav className="flex flex-col px-8 pt-16 gap-7">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={l.to} className="font-display italic text-4xl font-light text-[#F5F5F0]">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}