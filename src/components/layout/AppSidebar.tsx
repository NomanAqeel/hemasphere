import Link from "next/link";

export default function AppSidebar() {
  return (
    <aside className="hidden border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black sm:block">
      <nav className="flex w-64 flex-col gap-4 p-3">
        <div>
          <div className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">Overview</div>
          <Link href="/dashboard" className="mt-2 block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">Dashboard</Link>
        </div>
        <div>
          <div className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">Blood Management</div>
          <Link href="/dashboard/inventory" className="mt-2 block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">Blood Inventory</Link>
          <Link href="/dashboard/requests" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">Requests & Allocation</Link>
        </div>
        <div>
          <div className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">User Management</div>
          <Link href="/dashboard/donors" className="mt-2 block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">Donor Management</Link>
          <Link href="/dashboard/users" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">User Access</Link>
        </div>
        <div>
          <div className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">Analytics</div>
          <Link href="/dashboard/analytics" className="mt-2 block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">Analytics & Reports</Link>
        </div>
      </nav>
    </aside>
  );
}
