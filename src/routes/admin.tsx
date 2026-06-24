import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageShell } from "@/components/noir/page-shell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminStatus,
  listAdminProducts,
  updateAdminProduct,
} from "@/lib/noir/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | NOIR" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  available: boolean;
  featured: boolean;
};

const empty: Omit<ProductRow, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "Mujer",
  image_url: "",
  available: true,
  featured: false,
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchAdminStatus = useServerFn(getAdminStatus);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(false); return; }
    (async () => {
      setCheckingAdmin(true);
      try {
        const result = await fetchAdminStatus();
        setIsAdmin(result.isAdmin);
      } catch (error) {
        setIsAdmin(false);
        toast.error(error instanceof Error ? error.message : "No autorizado");
      } finally {
        setCheckingAdmin(false);
      }
    })();
  }, [session?.user.id]);

  if (checking || checkingAdmin) {
    return <PageShell><div className="pt-40 text-center text-[#888] font-mono text-xs">Cargando…</div></PageShell>;
  }

  if (!session) return <PageShell><AuthCard /></PageShell>;
  if (!isAdmin) {
    return (
      <PageShell>
        <div className="pt-40 max-w-md mx-auto px-6 text-center">
          <h1 className="font-display italic text-4xl text-[#F5F5F0] mb-4">Sin acceso.</h1>
          <p className="text-sm text-[#888] font-light mb-8">Esta cuenta no tiene permisos de administrador.</p>
          <button onClick={() => supabase.auth.signOut()} className="font-mono text-xs uppercase tracking-[0.25em] text-[#C8A882] underline-offset-4 hover:underline">Cerrar sesión</button>
        </div>
      </PageShell>
    );
  }

  return <PageShell><AdminPanel /></PageShell>;
}

function AuthCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (!error && mode === "signup") {
      await supabase.auth.signInWithPassword({ email, password });
    }
    setLoading(false);
    if (error) toast.error(error.message);
    else if (mode === "signup") toast.success("Cuenta creada y sesión iniciada.");
  };

  return (
    <div className="pt-40 max-w-sm mx-auto px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-6 text-center">Admin</p>
      <h1 className="font-display italic font-light text-5xl text-[#F5F5F0] text-center mb-12">Acceso.</h1>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="noir-input" />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Contraseña</label>
          <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="noir-input" />
        </div>
        <button disabled={loading} type="submit" className="w-full border border-[#C8A882] text-[#C8A882] py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors disabled:opacity-50">
          {loading ? "…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
      <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 w-full text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[#888] hover:text-[#C8A882]">
        {mode === "signin" ? "Crear cuenta nueva" : "Ya tengo cuenta"}
      </button>
    </div>
  );
}

function AdminPanel() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [form, setForm] = useState<Omit<ProductRow, "id">>(empty);
  const [loading, setLoading] = useState(false);
  const fetchProducts = useServerFn(listAdminProducts);
  const createProduct = useServerFn(createAdminProduct);
  const updateProduct = useServerFn(updateAdminProduct);
  const deleteProduct = useServerFn(deleteAdminProduct);

  const load = async () => {
    try {
      const result = await fetchProducts();
      setProducts((result.products ?? []) as ProductRow[]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo cargar el catálogo");
    }
  };
  useEffect(() => { load(); }, []);

  const reset = () => { setEditing(null); setForm(empty); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, price: Number(form.price) };
    try {
      if (editing) await updateProduct({ data: { id: editing.id, ...payload } });
      else await createProduct({ data: payload });
      toast.success(editing ? "Producto actualizado" : "Producto creado");
      reset();
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo guardar");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct({ data: { id } });
      toast.success("Producto eliminado");
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo eliminar");
    }
  };

  const edit = (p: ProductRow) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description ?? "", price: p.price, category: p.category, image_url: p.image_url ?? "", available: p.available, featured: p.featured });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-6xl mx-auto px-6 md:px-10">
      <div className="flex items-center justify-between mb-12 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8A882] mb-3">Admin</p>
          <h1 className="font-display italic font-light text-4xl md:text-6xl text-[#F5F5F0]">Catálogo.</h1>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#888] hover:text-[#C8A882]">
          Salir
        </button>
      </div>

      <form onSubmit={save} className="liquid-glass p-6 md:p-8 mb-16 grid md:grid-cols-2 gap-6" style={{ background: "rgba(17,17,17,0.6)" }}>
        <div className="md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8A882] mb-4">
            {editing ? "Editar producto" : "Nuevo producto"}
          </p>
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Nombre</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="noir-input" />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Precio (€)</label>
          <input required type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="noir-input" />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Categoría</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="noir-input bg-transparent">
            <option className="bg-[#111]" value="Mujer">Mujer</option>
            <option className="bg-[#111]" value="Hombre">Hombre</option>
            <option className="bg-[#111]" value="Accesorios">Accesorios</option>
          </select>
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Imagen (URL)</label>
          <input value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="noir-input" placeholder="https://…" />
        </div>
        <div className="md:col-span-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-2">Descripción</label>
          <textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="noir-input resize-none" />
        </div>
        <div className="flex items-center gap-6 md:col-span-2">
          <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#F5F5F0]/70">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} /> Disponible
          </label>
          <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#F5F5F0]/70">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Destacado
          </label>
        </div>
        <div className="md:col-span-2 flex gap-4 pt-2">
          <button disabled={loading} type="submit" className="border border-[#C8A882] text-[#C8A882] px-8 py-3 text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#C8A882] hover:text-black transition-colors disabled:opacity-50">
            {editing ? "Actualizar" : "Crear"}
          </button>
          {editing && (
            <button type="button" onClick={reset} className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#888] hover:text-[#F5F5F0]">Cancelar</button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {products.length === 0 && (
          <p className="font-display italic text-xl text-[#666] text-center py-12">Sin productos aún.</p>
        )}
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(200,168,130,0.3)] transition-colors">
            <div className="w-16 h-20 bg-[#1A1A1A] overflow-hidden shrink-0">
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" loading="lazy" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-[#F5F5F0] truncate">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888] mt-1">{p.category} · €{Number(p.price).toFixed(2)}</p>
              <div className="flex gap-2 mt-1">
                {p.featured && <span className="font-mono text-[9px] text-[#C8A882]">★ DESTACADO</span>}
                {!p.available && <span className="font-mono text-[9px] text-[#888]">OCULTO</span>}
              </div>
            </div>
            <button onClick={() => edit(p)} className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C8A882] hover:text-[#F5F5F0]">Editar</button>
            <button onClick={() => remove(p.id)} className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#888] hover:text-red-400">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}