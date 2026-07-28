import {
  Bell,
  UserCircle,
} from "lucide-react";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="mb-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome back
        </h2>

        <p className="text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <UserCircle
            size={38}
            className="text-emerald-600"
          />

          <div>
            <p className="font-medium">
              Property Manager
            </p>

            <p className="text-sm text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}