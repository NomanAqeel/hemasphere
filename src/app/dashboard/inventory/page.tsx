"use client";
import { useState, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

export default function InventoryPage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    id: "",
    bloodType: "A+",
    component: "Whole Blood",
    quantity: "450",
    collectionDate: "",
    expiryDate: "",
    status: "Normal",
    location: "",
    temperature: "",
    screening: "",
    state: "Available",
  });
  const [donor, setDonor] = useState({
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

  const computeExpiry = useMemo(() => {
    const map: Record<string, number> = { "Whole Blood": 35, RBC: 42, Plasma: 365, Platelets: 5 };
    const days = map[form.component] ?? 35;
    if (!form.collectionDate) return "";
    const d = new Date(form.collectionDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }, [form.collectionDate, form.component]);

  const setField = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setDonorField = (k: keyof typeof donor, v: string) => setDonor((d) => ({ ...d, [k]: v }));
  const handleOpen = () => {
    setStep(0);
    setDonor((d) => ({
      ...d,
      id: `DN-${Date.now()}`,
    }));
    setForm((f) => ({
      ...f,
      id: `BU-${Date.now()}`,
    }));
    setOpen(true);
  };
  const rows = [
    { type: "A+", stock: 45, capacity: 60, status: "Normal", statusVariant: "success", expiring1: "1 in 3 days", expiring2: "3 in 7 days", location: "Main Storage" },
    { type: "A-", stock: 12, capacity: 25, status: "Normal", statusVariant: "success", expiring1: "2 in 7 days", expiring2: "", location: "Main Storage" },
    { type: "B+", stock: 38, capacity: 50, status: "Normal", statusVariant: "success", expiring1: "2 in 3 days", expiring2: "", location: "Main Storage" },
    { type: "B-", stock: 8, capacity: 20, status: "Critical", statusVariant: "danger", expiring1: "1 in 3 days", expiring2: "", location: "Main Storage" },
    { type: "AB+", stock: 15, capacity: 20, status: "Normal", statusVariant: "success", expiring1: "1 in 7 days", expiring2: "", location: "Main Storage" },
    { type: "AB-", stock: 3, capacity: 10, status: "Critical", statusVariant: "danger", expiring1: "1 in 3 days", expiring2: "", location: "Main Storage" },
    { type: "O+", stock: 62, capacity: 100, status: "Normal", statusVariant: "success", expiring1: "2 in 3 days", expiring2: "", location: "Main Storage" },
    { type: "O-", stock: 18, capacity: 30, status: "Normal", statusVariant: "success", expiring1: "1 in 3 days", expiring2: "", location: "Main Storage" },
  ] as const;

  const expiring = [
    { id: "BU-001", type: "O-", daysLeft: 2, expires: "2024-02-22", location: "Main Storage A1", priority: true },
    { id: "BU-002", type: "AB-", daysLeft: 3, expires: "2024-02-23", location: "Main Storage B2", priority: true },
    { id: "BU-003", type: "B-", daysLeft: 4, expires: "2024-02-24", location: "Main Storage A3", priority: false },
    { id: "BU-004", type: "A+", daysLeft: 5, expires: "2024-02-25", location: "Main Storage C1", priority: false },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blood Inventory</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monitor blood stock levels, expiry dates, and storage conditions</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Refresh Data</Button>
          <Link href="/dashboard/inventory/manage"><Button className="bg-red-600">Update Inventory</Button></Link>
          <Button onClick={handleOpen}>Add Blood</Button>
        </div>
      </div>

      <Alert variant="danger" title="2 blood type(s) are at or below minimum threshold. Immediate restocking required." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Blood Units" value={201} delta="Across all blood types" accent="blue" />
        <StatCard label="Expiring Soon" value={19} delta="Within 7 days" accent="yellow" />
        <StatCard label="Critical Levels" value={2} delta="Blood types at min threshold" accent="pink" />
        <StatCard label="Storage Temperature" value={"4°C"} delta="Optimal range maintained" accent="purple" />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={step === 0 ? "Donor Information" : "Add Blood Unit"}
        footer={
          step === 0 ? (
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setStep(1)}>Next</Button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          )
        }
      >
        {step === 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Donor ID</label>
              <Input value={donor.id} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Full Name</label>
              <Input value={donor.name} onChange={(e) => setDonorField("name", e.target.value)} placeholder="Donor name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Gender</label>
              <select value={donor.gender} onChange={(e) => setDonorField("gender", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Age</label>
              <Input type="number" value={donor.age} onChange={(e) => setDonorField("age", e.target.value)} placeholder="Age" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Contact Number</label>
              <Input value={donor.contact} onChange={(e) => setDonorField("contact", e.target.value)} placeholder="Phone" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Address</label>
              <Input value={donor.address} onChange={(e) => setDonorField("address", e.target.value)} placeholder="Address" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Blood Type</label>
              <select value={donor.bloodType} onChange={(e) => setDonorField("bloodType", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm">Donation History</label>
              <textarea value={donor.history} onChange={(e) => setDonorField("history", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="e.g., 2023-12-01, 2024-02-05"></textarea>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm">Health Screening Results</label>
              <textarea value={donor.screening} onChange={(e) => setDonorField("screening", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="BP, Hemoglobin"></textarea>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm">Test Reports</label>
              <textarea value={donor.tests} onChange={(e) => setDonorField("tests", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="HIV, HBV, HCV"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Eligibility Status</label>
              <select value={donor.eligibility} onChange={(e) => setDonorField("eligibility", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>Eligible</option><option>Deferred</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Blood Unit ID</label>
              <Input value={form.id} onChange={(e) => setField("id", e.target.value)} placeholder="BU-001" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Blood Type</label>
              <select value={form.bloodType} onChange={(e) => setField("bloodType", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Component type</label>
              <select value={form.component} onChange={(e) => setField("component", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>Whole Blood</option><option>RBC</option><option>Plasma</option><option>Platelets</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Quantity (mL)</label>
              <Input type="number" value={form.quantity} onChange={(e) => setField("quantity", e.target.value)} placeholder="450" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Collection Date</label>
              <Input type="date" value={form.collectionDate} onChange={(e) => setField("collectionDate", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Expiry Date</label>
              <Input type="date" value={computeExpiry || form.expiryDate} onChange={(e) => setField("expiryDate", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <select value={form.status} onChange={(e) => setField("status", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>Normal</option><option>Low</option><option>Critical</option><option>Expiring Soon</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Storage Location</label>
              <Input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder="Rack A1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Storage Temperature</label>
              <Input value={form.temperature} onChange={(e) => setField("temperature", e.target.value)} placeholder="4°C" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm">Screening Results</label>
              <textarea value={form.screening} onChange={(e) => setField("screening", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="HIV: Negative, HBV: Negative, HCV: Negative, Malaria: Negative, Syphilis: Negative"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Current State</label>
              <select value={form.state} onChange={(e) => setField("state", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option>Available</option><option>Reserved</option><option>Issued</option><option>Quarantined</option><option>Discarded</option>
              </select>
            </div>
          </div>
        )}
      </Modal>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Blood Type Inventory</div>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-5 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
              <div>Blood Type</div>
              <div>Stock Level</div>
              <div>Status</div>
              <div>Expiring</div>
              <div>Location</div>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {rows.map((r) => (
                <div key={r.type} className="grid grid-cols-5 items-center px-3 py-3 text-sm">
                  <div className="font-medium">{r.type}</div>
                  <div className="flex items-center gap-3">
                    <div className="w-40">
                      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div className="h-2 rounded-full bg-red-600" style={{ width: `${Math.round((r.stock / r.capacity) * 100)}%` }}></div>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">{r.stock} units of {r.capacity}</div>
                  </div>
                  <div>
                    <Badge variant={r.statusVariant as any}>{r.status}</Badge>
                  </div>
                  <div className="text-xs">
                    <div className="text-red-600">{r.expiring1}</div>
                    {r.expiring2 ? <div className="text-zinc-500">{r.expiring2}</div> : null}
                  </div>
                  <div className="text-xs">{r.location}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Expiring Units</div>
          </div>
          <div className="space-y-3">
            {expiring.map((e) => (
              <div key={e.id} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Unit {e.id}</div>
                    <div className="text-xs text-zinc-500">{e.type} • Expires: {e.expires} • {e.location}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-900">{e.daysLeft} days left</span>
                    {e.priority ? <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-yellow-700">Priority Use</span> : null}
                  </div>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className="h-2 w-1/2 rounded-full bg-yellow-400"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
