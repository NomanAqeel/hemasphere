"use client";
type Tab = { key: string; label: string };

export default function Tabs({ tabs, active, onChange }: { tabs: Tab[]; active: string; onChange?: (key: string) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 text-sm dark:border-zinc-800 dark:bg-black">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange?.(t.key)}
            className={[
              "rounded-md px-3 py-1",
              isActive ? "bg-zinc-100 dark:bg-zinc-900" : "",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
