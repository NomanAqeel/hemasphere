import Card from "@/components/ui/Card";

export default function StatCard({ label, value, delta, accent = "blue" }: { label: string; value: string | number; delta?: string; accent?: "blue" | "green" | "purple" | "pink" | "yellow" }) {
  const ring = {
    blue: "ring-1 ring-blue-200 dark:ring-blue-900",
    green: "ring-1 ring-green-200 dark:ring-green-900",
    purple: "ring-1 ring-purple-200 dark:ring-purple-900",
    pink: "ring-1 ring-pink-200 dark:ring-pink-900",
    yellow: "ring-1 ring-yellow-200 dark:ring-yellow-900",
  }[accent];
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          {delta ? <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{delta}</div> : null}
        </div>
        <div className={["h-8 w-8 rounded-full", ring].join(" ")}></div>
      </div>
    </Card>
  );
}
