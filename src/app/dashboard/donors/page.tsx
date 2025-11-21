"use client";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Toolbar from "@/components/ui/Toolbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function DonorsPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    gender: "Male",
    age: "",
    contact: "",
    address: "",
    bloodType: "A+",
    history: "",
    screening: "",
    tests: "",
    eligibility: "Eligible",
  });
  const setField = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const handleOpen = () => {
    setForm((f) => ({ ...f, id: `DN-${Date.now()}` }));
    setOpen(true);
  };
  const donors = [
    { id: "DN-001", name: "Ali Khan", type: "A+", lastDonation: "2024-02-01", status: "Active" },
    { id: "DN-002", name: "Sara Ahmed", type: "O-", lastDonation: "2024-01-18", status: "Active" },
    { id: "DN-003", name: "Usman Tariq", type: "B-", lastDonation: "2023-12-30", status: "Inactive" },
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Donor Management</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage donors, eligibility and upcoming appointments</div>
        </div>
        <Button onClick={handleOpen}>Add Donor</Button>
      </div>

      <Toolbar>
        <div className="flex items-center gap-2">
          <input className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800" placeholder="Search donors" />
          <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800">Filter</button>
        </div>
        <Badge variant="info">Total: {donors.length}</Badge>
      </Toolbar>

      <Card>
        <div className="grid grid-cols-5 gap-4 px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <div>ID</div>
          <div>Name</div>
          <div>Blood Type</div>
          <div>Last Donation</div>
          <div>Status</div>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {donors.map((d) => (
            <div key={d.id} className="grid grid-cols-5 items-center px-3 py-3 text-sm">
              <div className="font-medium">{d.id}</div>
              <div>{d.name}</div>
              <div>{d.type}</div>
              <div>{d.lastDonation}</div>
              <div>
                <Badge variant={d.status === "Active" ? "success" : "neutral"}>{d.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Donor"
        containerClassName="h-[70vh]"
        bodyClassName="overflow-auto"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm">Donor ID</label>
            <Input value={form.id} readOnly />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Full Name</label>
            <Input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Donor name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Gender</label>
            <select value={form.gender} onChange={(e) => setField("gender", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Age</label>
            <Input type="number" value={form.age} onChange={(e) => setField("age", e.target.value)} placeholder="Age" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Contact Number</label>
            <Input value={form.contact} onChange={(e) => setField("contact", e.target.value)} placeholder="Phone" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Address</label>
            <Input value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="Address" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Blood Type</label>
            <select value={form.bloodType} onChange={(e) => setField("bloodType", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
            </select>
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm">Donation History</label>
            <textarea value={form.history} onChange={(e) => setField("history", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="e.g., 2023-12-01, 2024-02-05"></textarea>
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm">Health Screening Results</label>
            <textarea value={form.screening} onChange={(e) => setField("screening", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="BP, Hemoglobin"></textarea>
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm">Test Reports</label>
            <textarea value={form.tests} onChange={(e) => setField("tests", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="HIV, HBV, HCV"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Eligibility Status</label>
            <select value={form.eligibility} onChange={(e) => setField("eligibility", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
              <option>Eligible</option><option>Deferred</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
