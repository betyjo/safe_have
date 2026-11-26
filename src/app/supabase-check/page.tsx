
import { createClient } from "@/lib/supabase/server";

export default async function SupabaseCheckPage() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("service_providers")
    .select("id", { count: "exact", head: true });

  if (error) {
    return (
      <main className="p-8">
        <h1>Supabase connection failed</h1>
        <p>Check your environment variables and database configuration.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1>SAFEHAVEN Database Connection</h1>
      <p>Supabase connected successfully.</p>
      <p>PostgreSQL query executed successfully.</p>
    </main>
  );
}
