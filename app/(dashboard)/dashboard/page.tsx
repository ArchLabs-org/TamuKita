import type { Metadata } from "next";
import { Heart, Users, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  noIndex: true,
});

const stats = [
  { title: "Total Undangan", value: "0", icon: Heart, change: null },
  { title: "Total Tamu", value: "0", icon: Users, change: null },
  { title: "Konfirmasi Hadir", value: "0", icon: TrendingUp, change: null },
  { title: "Total Tayangan", value: "0", icon: Eye, change: null },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Selamat datang di TamuKita</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <Card key={title} variant="default">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <Icon size={16} className="text-brand-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
          <Heart size={24} className="text-brand-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Mulai perjalanan Anda</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Buat undangan pernikahan pertama Anda dan mulai kelola daftar tamu.
        </p>
      </div>
    </div>
  );
}
