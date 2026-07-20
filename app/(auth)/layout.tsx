import { Logo } from "@/components/common/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(22, 60%, 40%) 0%, hsl(38, 72%, 42%) 100%)",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="relative text-center px-12">
          <Logo size="lg" variant="white" href="/" />
          <p className="mt-6 text-xl text-white/80 font-light leading-relaxed max-w-sm">
            Platform undangan digital premium untuk momen tak terlupakan.
          </p>
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-white/50 text-lg">✦</span>
            <div className="h-px w-12 bg-white/30" />
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col">
        {/* Mobile logo */}
        <div className="flex h-14 items-center px-6 lg:hidden">
          <Logo size="sm" href="/" />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TamuKita. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
