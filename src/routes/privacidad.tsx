import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/noir/legal-page";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad | NOIR" },
      { name: "description", content: "Política de privacidad de NOIR." },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: () => (
    <LegalPage kicker="Legal" title="Privacidad.">
      <p>Tu privacidad importa. Esta política explica qué datos recogemos y cómo los usamos.</p>
      <h2>Datos que recogemos</h2>
      <p>Nombre, email y dirección postal cuando realizas una compra o te suscribes a nuestra newsletter.</p>
      <h2>Uso de los datos</h2>
      <p>Solo usamos tus datos para procesar pedidos, enviar comunicaciones que aceptes y mejorar nuestro servicio. No vendemos ni cedemos tus datos a terceros.</p>
      <h2>Tus derechos</h2>
      <p>Puedes acceder, rectificar o eliminar tus datos en cualquier momento escribiendo a hola@noir.com.</p>
      <h2>Seguridad</h2>
      <p>Aplicamos medidas técnicas para proteger tus datos. La información se cifra en tránsito y en reposo.</p>
    </LegalPage>
  ),
});