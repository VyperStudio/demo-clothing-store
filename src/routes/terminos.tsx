import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/noir/legal-page";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos | NOIR" },
      { name: "description", content: "Términos y condiciones de uso de NOIR." },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: () => (
    <LegalPage kicker="Legal" title="Términos.">
      <p>Última actualización: junio 2026. Al acceder a NOIR aceptas estos términos. Si no estás de acuerdo, no uses el sitio.</p>
      <h2>1. Uso del sitio</h2>
      <p>NOIR es una tienda online de moda. El contenido es informativo y puede actualizarse sin previo aviso.</p>
      <h2>2. Compras</h2>
      <p>Los precios incluyen IVA. Los envíos se realizan en 3–5 días laborables en península. Cualquier devolución debe solicitarse en los 14 días posteriores a la recepción.</p>
      <h2>3. Propiedad intelectual</h2>
      <p>Todo el contenido — imágenes, textos, diseños — pertenece a NOIR.</p>
      <h2>4. Limitación de responsabilidad</h2>
      <p>NOIR no se hace responsable de usos indebidos del contenido por terceros.</p>
      <h2>5. Ley aplicable</h2>
      <p>Estos términos se rigen por la legislación española. Cualquier disputa se resolverá ante los tribunales de Barcelona.</p>
    </LegalPage>
  ),
});