import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";
import { CookiesBanner } from "./cookies-banner";
import { useLenis } from "@/lib/noir/use-lenis";
import { NoirCursor } from "@/lib/noir/cursor";

export function PageShell({ children, hideFooter }: { children: ReactNode; hideFooter?: boolean }) {
  useLenis();
  const { location } = useRouterState();
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <NoirCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!hideFooter && <Footer />}
      <CartDrawer />
      <CookiesBanner />
    </div>
  );
}