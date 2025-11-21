import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Toolbar from "@/components/ui/Toolbar";

export default function UsersPage() {
  const users = [
    { id: "U-001", name: "Dr. Admin", role: "Admin", status: "Active" },
    { id: "U-002", name: "Staff Member", role: "Staff", status: "Active" },
    { id: "U-003", name: "Viewer", role: "Viewer", status: "Inactive" },
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Access</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage roles, permissions and account status</div>
        </div>
        <button className="rounded-md bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">Invite User</button>
      </div>

      <Toolbar>
        <div className="flex items-center gap-2">
          <input className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800" placeholder="Search users" />
          <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800">Filter</button>
        </div>
        <Badge variant="info">Total: {users.length}</Badge>
      </Toolbar>

      <Card>
        <div className="grid grid-cols-4 gap-4 px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <div>ID</div>
          <div>Name</div>
          <div>Role</div>
          <div>Status</div>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((u) => (
            <div key={u.id} className="grid grid-cols-4 items-center px-3 py-3 text-sm">
              <div className="font-medium">{u.id}</div>
              <div>{u.name}</div>
              <div>{u.role}</div>
              <div>
                <Badge variant={u.status === "Active" ? "success" : "neutral"}>{u.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
