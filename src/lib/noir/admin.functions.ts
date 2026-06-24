import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ProductSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(800).nullable().optional(),
  price: z.number().min(0).max(100000),
  category: z.string().min(1).max(40),
  image_url: z.string().max(1200).nullable().optional(),
  available: z.boolean(),
  featured: z.boolean(),
});

const ProductWithIdSchema = ProductSchema.extend({ id: z.string().uuid() });
const IdSchema = z.object({ id: z.string().uuid() });

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { requireNoirAdmin } = await import("./admin.server");
    await requireNoirAdmin(context.userId);
    return { isAdmin: true };
  });

export const listAdminProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { requireNoirAdmin } = await import("./admin.server");
    const supabaseAdmin = await requireNoirAdmin(context.userId);
    const { data, error } = await supabaseAdmin.from("products").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { products: data ?? [] };
  });

export const createAdminProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => ProductSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { requireNoirAdmin } = await import("./admin.server");
    const supabaseAdmin = await requireNoirAdmin(context.userId);
    const { error } = await supabaseAdmin.from("products").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateAdminProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => ProductWithIdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { requireNoirAdmin } = await import("./admin.server");
    const supabaseAdmin = await requireNoirAdmin(context.userId);
    const { id, ...payload } = data;
    const { error } = await supabaseAdmin.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteAdminProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => IdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { requireNoirAdmin } = await import("./admin.server");
    const supabaseAdmin = await requireNoirAdmin(context.userId);
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });