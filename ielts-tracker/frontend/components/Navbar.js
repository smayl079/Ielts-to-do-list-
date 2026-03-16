import Link from "next/link";
import { useRouter } from "next/router";
import { clearSession } from "../utils/auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tracker", label: "Tracker" },
  { href: "/vocabulary", label: "Vocabulary" },
  { href: "/calculator", label: "Calculator" },
  { href: "/report", label: "Report" },
  { href: "/ai", label: "AI Assistant" },
];

export default function Navbar() {
  const router = useRouter();

  function logout() {
    clearSession();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/dashboard" className="font-display text-xl font-semibold text-slate-900">
          IELTS Tracker
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-200"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
