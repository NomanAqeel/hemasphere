export default function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-black">{children}</div>;
}
