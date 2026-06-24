import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/noir/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies | NOIR" },
      { name: "description", content: "Política de cookies de NOIR." },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalPage kicker="Legal" title="Cookies.">
      <p>Usamos cookies para que la navegación funcione y para entender cómo se usa el sitio.</p>
      <h2>Tipos</h2>
      <p><strong>Esenciales:</strong> necesarias para el funcionamiento básico (sesión, carrito).</p>
      <p><strong>Analíticas:</strong> nos ayudan a entender qué páginas son más visitadas. Anónimas.</p>
      <h2>Gestión</h2>
      <p>Puedes aceptar o rechazar las cookies desde el banner inferior. Las cookies esenciales no pueden desactivarse.</p>
      <h2>Terceros</h2>
      <p>No compartimos datos de navegación con terceros con fines publicitarios.</p>
    </LegalPage>
  ),
});