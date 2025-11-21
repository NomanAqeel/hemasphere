type Variant = "success" | "warning" | "danger" | "info";

export default function Alert({ title, description, variant = "info" }: { title: string; description?: string; variant?: Variant }) {
  const map: Record<Variant, string> = {
    success: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
    danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  };
  return (
    <div className={["flex items-center gap-3 rounded-lg border p-3", map[variant]].join(" ")}> 
      <div className="text-lg">{variant === "danger" ? "⛔" : variant === "warning" ? "⚠️" : variant === "success" ? "✅" : "ℹ️"}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        {description ? <div className="text-xs opacity-80">{description}</div> : null}
      </div>
    </div>
  );
}
