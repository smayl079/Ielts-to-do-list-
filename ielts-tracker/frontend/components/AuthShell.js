export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-2xl" />
        <div className="absolute right-0 top-1/4 h-52 w-52 rounded-full bg-teal-300/30 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-orange-300/20 blur-2xl" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-7 shadow-xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">IELTS Tracker</p>
        <h1 className="mt-3 font-display text-3xl text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
