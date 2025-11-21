type Status = "Approved" | "Pending" | "Rejected";

export default function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Approved: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900",
    Rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  };
  return <span className={["inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", map[status]].join(" ")}>{status}</span>;
}
