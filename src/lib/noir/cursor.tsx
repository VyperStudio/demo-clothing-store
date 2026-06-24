import { useEffect, useRef } from "react";

export function NoirCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.innerWidth <= 768) return;
    document.body.classList.add("noir-cursor-ready");
    const target = { x: -50, y: -50 };
    const pos = { x: -50, y: -50 };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement;
      const interactive = el?.closest("a,button,input,textarea,[role=button],label");
      targetScale = interactive ? 3 : 1;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      scale += (targetScale - scale) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("noir-cursor-ready");
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9998] w-3 h-3 rounded-full"
      style={{ background: "#C8A882", mixBlendMode: "difference", willChange: "transform" }}
    />
  );
}