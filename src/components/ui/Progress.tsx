export default function Progress({ label, value, units, color = "bg-red-600" }: { label: string; value: number; units?: string; color?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">{label}</div>
        {typeof units !== "undefined" ? <div className="text-xs text-zinc-500">{units}</div> : null}
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className={["h-2 rounded-full", color].join(" ")} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
