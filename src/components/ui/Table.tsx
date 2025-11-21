export function Table({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">{children}</div>;
}

export function THead({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">{children}</div>;
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-zinc-200 dark:divide-zinc-800">{children}</div>;
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] items-center px-3 py-3 text-sm">{children}</div>;
}
