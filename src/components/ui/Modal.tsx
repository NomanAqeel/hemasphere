"use client";
export default function Modal({ open, onClose, title, children, footer, containerClassName, bodyClassName }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; footer?: React.ReactNode; containerClassName?: string; bodyClassName?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={["w-full max-w-2xl rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-black max-h-[90vh] overflow-hidden flex flex-col", containerClassName].filter(Boolean).join(" ")}> 
          <div className="flex items-center justify-between border-b border-zinc-200 p-4 text-sm font-semibold dark:border-zinc-800">
            <div>{title}</div>
            <button onClick={onClose} className="rounded-md border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-800">Close</button>
          </div>
          <div className={["p-4 flex-1 overflow-y-auto", bodyClassName].filter(Boolean).join(" ")}>{children}</div>
          {footer ? <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
