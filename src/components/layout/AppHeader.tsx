import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-black">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="text-sm font-semibold">HemaSphere</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Welcome back, Dr. Admin</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold dark:bg-zinc-900">DA</div>
      </div>
    </header>
  );
}
