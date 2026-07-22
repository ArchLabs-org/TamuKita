import { requireAuth } from "@/lib/auth/helpers";
import { getProfileById } from "@/lib/db/profiles";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // requireAuth redirects to /login if not authenticated
  const user = await requireAuth();

  // Fetch profile for display name — falls back to email if profile missing
  const profile = await getProfileById(user.id);
  const displayName = profile?.full_name ?? user.email ?? "Pengguna";
  const userEmail = user.email ?? "";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar userName={displayName} userEmail={userEmail} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader title="Dashboard" userName={displayName} userEmail={userEmail} />
        <main className="min-w-0 flex-1 overflow-y-auto" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
