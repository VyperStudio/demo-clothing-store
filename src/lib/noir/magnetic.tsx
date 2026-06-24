import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "div";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

export function Magnetic({ children, className, as = "button", onClick, href, type = "button" }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    if (typeof window === "undefined" || window.innerWidth <= 768) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
    const y = ((e.clientY - r.top - r.height / 2) / r.height) * 12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const props: any = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className,
    style: { transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" },
  };
  if (as === "button") return <button type={type} {...props}>{children}</button>;
  if (as === "a") return <a href={href} {...props}>{children}</a>;
  return <div {...props}>{children}</div>;
}