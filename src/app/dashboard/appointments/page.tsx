"use client";
import { useState } from "react";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import { CheckCircle2, XCircle, Pencil, Trash } from "lucide-react";

export default function AppointmentsPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    donor: "",
    email: "",
    type: "A-",
    date: "",
    time: "",
    notes: "",
  });
  const setField = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const stats = { total: 4, today: 0, completedWeek: 1, noShows: 1 };
  const rows = [
    { id: "APT001", donor: "John Smith", email: "john.smith@email.com", type: "O+", date: "2024-04-15", time: "09:00", status: "Scheduled", notes: "First-time donor" },
    { id: "APT002", donor: "Sarah Johnson", email: "sarah.j@email.com", type: "A+", date: "2024-04-15", time: "10:30", status: "Scheduled", notes: "Regular donor" },
    { id: "APT003", donor: "Michael Brown", email: "michael.brown@email.com", type: "B-", date: "2024-04-16", time: "14:00", status: "Completed", notes: "Successful donation" },
    { id: "APT004", donor: "Emily Davis", email: "emily.davis@email.com", type: "AB+", date: "2024-04-14", time: "11:00", status: "No Show", notes: "Did not attend scheduled appointment" },
  ] as const;

  const statusBadge = (s: string) =>
    s === "Scheduled"
      ? <Badge variant="info">Scheduled</Badge>
      : s === "Completed"
      ? <Badge variant="success">Completed</Badge>
      : <Badge variant="danger">No Show</Badge>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Schedule and manage blood donation appointments</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Appointments" value={stats.total} accent="blue" />
        <StatCard label="Today's Appointments" value={stats.today} accent="purple" />
        <StatCard label="Completed This Week" value={stats.completedWeek} accent="green" />
        <StatCard label="No Shows" value={stats.noShows} accent="pink" />
      </div>

      <Card>
        <div className="p-3">
          <div className="text-sm font-semibold">Appointment Schedule</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">Manage donation appointments and track attendance</div>
        </div>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <div className="flex-1 min-w-[240px]"><Input placeholder="Search by donor name or email..." /></div>
          <Input placeholder="dd/mm/yyyy" />
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
            <option>All Status</option>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>No Show</option>
          </select>
          <Button className="ml-auto" onClick={() => setOpen(true)}>New Appointment</Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-[1fr_1.5fr_0.8fr_1fr_1fr_1.5fr_0.8fr] bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            <div>Appointment ID</div>
            <div>Donor</div>
            <div>Blood Type</div>
            <div>Date & Time</div>
            <div>Status</div>
            <div>Notes</div>
            <div>Actions</div>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_1.5fr_0.8fr_1fr_1fr_1.5fr_0.8fr] items-center px-3 py-3 text-sm">
                <div className="font-medium">{r.id}</div>
                <div>
                  <div className="font-medium">{r.donor}</div>
                  <div className="text-xs text-zinc-500">{r.email}</div>
                </div>
                <div><span className="rounded-full border px-2 py-0.5 text-xs">{r.type}</span></div>
                <div>
                  <div>{r.date}</div>
                  <div className="text-xs text-zinc-500">{r.time}</div>
                </div>
                <div>{statusBadge(r.status)}</div>
                <div className="text-xs">{r.notes}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm"><CheckCircle2 className="text-green-600" /></Button>
                  <Button variant="outline" size="icon-sm"><XCircle className="text-red-600" /></Button>
                  <Button variant="outline" size="icon-sm"><Pencil /></Button>
                  <Button variant="outline" size="icon-sm"><Trash /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Schedule Appointment"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Schedule</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <div className="text-sm">Donor Name</div>
            <Input placeholder="Enter donor name" value={form.donor} onChange={(e) => setField("donor", e.target.value)} />
          </div>
          <div>
            <div className="text-sm">Email</div>
            <Input placeholder="Enter email address" value={form.email} onChange={(e) => setField("email", e.target.value)} />
          </div>
          <div>
            <div className="text-sm">Blood Type</div>
            <select value={form.type} onChange={(e) => setField("type", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
              <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm">Date</div>
              <Input placeholder="dd/mm/yyyy" value={form.date} onChange={(e) => setField("date", e.target.value)} />
            </div>
            <div>
              <div className="text-sm">Time</div>
              <select value={form.time} onChange={(e) => setField("time", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black">
                <option value="">Select time</option>
                <option>09:00</option><option>10:30</option><option>11:00</option><option>14:00</option>
              </select>
            </div>
          </div>
          <div>
            <div className="text-sm">Notes (Optional)</div>
            <textarea value={form.notes} onChange={(e) => setField("notes", e.target.value)} className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black" placeholder="Any special notes or instructions"></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
