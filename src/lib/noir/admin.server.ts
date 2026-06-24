export async function requireNoirAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: adminRoles, error: rolesError } = await supabaseAdmin
    .from("user_roles")
    .select("user_id")
    .eq("role", "admin");

  if (rolesError) throw new Error(rolesError.message);

  const currentUserIsAdmin = (adminRoles ?? []).some((role) => role.user_id === userId);
  if (currentUserIsAdmin) return supabaseAdmin;

  let hasConfirmedAdmin = false;
  for (const role of adminRoles ?? []) {
    const { data } = await supabaseAdmin.auth.admin.getUserById(role.user_id);
    if (data.user?.email_confirmed_at) {
      hasConfirmedAdmin = true;
      break;
    }
  }

  if ((adminRoles ?? []).length === 0 || !hasConfirmedAdmin) {
    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (insertError && insertError.code !== "23505") throw new Error(insertError.message);
    return supabaseAdmin;
  }

  throw new Error("No autorizado");
}