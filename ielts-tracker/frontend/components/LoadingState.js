export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-6 shadow-sm">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />
      <p className="text-sm font-medium text-slate-700">{label}</p>
    </div>
  );
}
