import p1 from "@/assets/noir/p1.avif";
import p2 from "@/assets/noir/p2.avif";
import p3 from "@/assets/noir/p3.avif";
import p4 from "@/assets/noir/p4.avif";
import p5 from "@/assets/noir/p5.avif";
import p6 from "@/assets/noir/p6.avif";
import type { Product } from "./types";

const imgs = [p1, p2, p3, p4, p5, p6];
const pick = (i: number) => imgs[i % imgs.length];

export const demoProducts: Product[] = [
  { id: "d-1", name: "Vestido Midi Noir", category: "Mujer", price: 85, image_url: pick(0), available: true, featured: true },
  { id: "d-2", name: "Blazer Oversize", category: "Mujer", price: 120, image_url: pick(1), available: true, featured: true },
  { id: "d-3", name: "Camisa Lino", category: "Mujer", price: 65, image_url: pick(3), available: true, featured: false },
  { id: "d-4", name: "Top Minimalista", category: "Mujer", price: 45, image_url: pick(0), available: true, featured: false },
  { id: "d-5", name: "Pantalón Cargo", category: "Hombre", price: 90, image_url: pick(4), available: true, featured: true },
  { id: "d-6", name: "Camisa Oxford", category: "Hombre", price: 75, image_url: pick(1), available: true, featured: false },
  { id: "d-7", name: "Chaqueta Técnica", category: "Hombre", price: 150, image_url: pick(4), available: true, featured: true },
  { id: "d-8", name: "Camiseta Essential", category: "Hombre", price: 35, image_url: pick(3), available: true, featured: false },
  { id: "d-9", name: "Bolso Tote", category: "Accesorios", price: 110, image_url: pick(2), available: true, featured: true },
  { id: "d-10", name: "Cinturón Cuero", category: "Accesorios", price: 55, image_url: pick(5), available: true, featured: false },
  { id: "d-11", name: "Gorra Estructurada", category: "Accesorios", price: 40, image_url: pick(2), available: true, featured: false },
  { id: "d-12", name: "Calcetines Pack", category: "Accesorios", price: 25, image_url: pick(5), available: true, featured: false },
];