import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Pencil, Trash } from "lucide-react";

export default function ManageInventoryPage() {
  const data = [
    { id: "BU001", type: "O+", donor: "John Smith", donorId: "D001", collected: "2024-03-01", expiry: "2024-09-27", location: "Refrigerator A1", status: "Expiring Soon" },
    { id: "BU002", type: "A+", donor: "Sarah Johnson", donorId: "D002", collected: "2024-03-05", expiry: "2024-10-01", location: "Refrigerator A2", status: "Reserved" },
    { id: "BU003", type: "B-", donor: "Michael Brown", donorId: "D003", collected: "2024-02-20", expiry: "2024-09-17", location: "Refrigerator B1", status: "Expiring Soon" },
    { id: "BU004", type: "AB+", donor: "Emily Davis", donorId: "D004", collected: "2024-01-15", expiry: "2024-08-12", location: "Refrigerator C1", status: "Expired" },
  ] as const;

  const statusBadge = (s: string) =>
    s === "Expiring Soon"
      ? <Badge variant="warning">Expiring Soon</Badge>
      : s === "Reserved"
      ? <Badge variant="info">Reserved</Badge>
      : <Badge variant="danger">Expired</Badge>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Blood Unit Inventory</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Track and manage all blood units in storage</p>
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <div className="flex-1 min-w-[240px]">
            <Input placeholder="Search by unit ID or donor name..." />
          </div>
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
            <option>All Blood Types</option>
            <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
          </select>
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
            <option>All Status</option>
            <option>Expiring Soon</option><option>Reserved</option><option>Expired</option>
          </select>
          <Button className="ml-auto">Add Unit</Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1.5fr_1fr_0.6fr] bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            <div>Unit ID</div>
            <div>Blood Type</div>
            <div>Donor</div>
            <div>Collection Date</div>
            <div>Expiry Date</div>
            <div>Location</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1.5fr_1fr_0.6fr] items-center px-3 py-3 text-sm">
                <div className="font-medium">{r.id}</div>
                <div><span className="rounded-full border px-2 py-0.5 text-xs">{r.type}</span></div>
                <div>
                  <div className="font-medium">{r.donor}</div>
                  <div className="text-xs text-zinc-500">{r.donorId}</div>
                </div>
                <div>{r.collected}</div>
                <div>{r.expiry}</div>
                <div>{r.location}</div>
                <div>{statusBadge(r.status)}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm"><Pencil /></Button>
                  <Button variant="outline" size="icon-sm"><Trash /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}