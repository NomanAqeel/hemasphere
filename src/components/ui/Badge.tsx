import { HTMLAttributes } from "react";

type Variant = "success" | "warning" | "danger" | "info" | "neutral";

export default function Badge({ children, className, variant = "neutral", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border";
  const map: Record<Variant, string> = {
    success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900",
    danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800",
  };
  return (
    <span className={[base, map[variant], className].filter(Boolean).join(" ")} {...props}>
      {children}
    </span>
  );
}
