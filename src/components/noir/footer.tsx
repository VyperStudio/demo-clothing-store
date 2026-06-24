import { Link } from "@tanstack/react-router";
import { useDemoModal } from "@/lib/noir/demo-modal";

export function Footer() {
  const { show } = useDemoModal();
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808] mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <p className="font-display italic font-light text-2xl tracking-[0.3em] text-[#F5F5F0]">NOIR</p>
            <p className="mt-4 text-sm text-[#888] font-light max-w-xs leading-relaxed">
              La ropa que usas dice lo que no dices.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8A882] mb-5">Navegación</p>
            <ul className="space-y-3 text-sm font-light text-[#F5F5F0]/70">
              <li><Link to="/coleccion" className="hover:text-[#C8A882]">Colección</Link></li>
              <li><Link to="/nosotros" className="hover:text-[#C8A882]">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-[#C8A882]">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8A882] mb-5">Legal</p>
            <ul className="space-y-3 text-sm font-light text-[#F5F5F0]/70">
              <li><Link to="/terminos" className="hover:text-[#C8A882]">Términos</Link></li>
              <li><Link to="/privacidad" className="hover:text-[#C8A882]">Privacidad</Link></li>
              <li><Link to="/cookies" className="hover:text-[#C8A882]">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8A882] mb-5">Contacto</p>
            <ul className="space-y-3 text-sm font-light text-[#F5F5F0]/70">
              <li><button onClick={show} className="hover:text-[#C8A882]">hola@noir.com</button></li>
              <li><button onClick={show} className="hover:text-[#C8A882]">@noir.studio</button></li>
              <li><button onClick={show} className="hover:text-[#C8A882]">WhatsApp</button></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-[#666] font-mono">© 2026 NOIR. Todos los derechos reservados.</p>
          <p className="text-xs text-[#666] font-mono">Powered by Vyper Studio</p>
        </div>
      </div>
    </footer>
  );
}