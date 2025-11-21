"use client";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Toolbar from "@/components/ui/Toolbar";
import Tabs from "@/components/ui/Tabs";
import Alert from "@/components/ui/Alert";
import StatCard from "@/components/ui/StatCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function RequestsPage() {
  const [active, setActive] = useState("requests");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    request_title: "",
    request_description: "Emergency",
    hospital_location: "",
    hospital_name: "",
    doctor_name: "",
    doctor_contact: "",
    blood_group: "O+",
    blood_units: "1",
    priority: "Normal",
    requested_at: "",
    required_by: "",
  });
  const summary = {
    pending: 1,
    urgent: 1,
    inTransit: 1,
    deliveredToday: 12,
  } as const;

  const tabs = [
    { key: "requests", label: "Blood Requests" },
    { key: "delivery", label: "Delivery Tracking" },
  ];

  const [rows, setRows] = useState([
    {
      id: "REQ-001",
      title: "Emergency Surgery",
      location: "Downtown • 2.3 km",
      hospital: "City General Hospital",
      contact: "Dr. Sarah Wilson • +1 (555) 123-4567",
      bloodType: "O-",
      units: 4,
      priority: "Urgent",
      status: "Approved",
      requestedAt: "2024-02-20 08:30 AM",
      requiredBy: "2024-02-20 12:00 PM",
      actions: ["Allocate", "View"],
    },
    {
      id: "REQ-002",
      title: "Planned Surgery",
      location: "Midtown • 5.7 km",
      hospital: "St. Mary’s Medical Center",
      contact: "Dr. Michael Chen • +1 (555) 234-5678",
      bloodType: "A-",
      units: 2,
      priority: "High",
      status: "Pending",
      requestedAt: "2024-02-20 08:15 AM",
      requiredBy: "2024-02-20 02:00 PM",
      actions: ["Approve", "Reject", "View"],
    },
    {
      id: "REQ-003",
      title: "Trauma Case",
      location: "Suburbs • 6.2 km",
      hospital: "Regional Emergency Hospital",
      contact: "Dr. Emily Davis • +1 (555) 345-6789",
      bloodType: "B+",
      units: 6,
      priority: "Medium",
      status: "In Transit",
      requestedAt: "2024-02-20 07:45 AM",
      requiredBy: "2024-02-20 09:00 AM",
      actions: ["View"],
    },
    {
      id: "REQ-004",
      title: "Routine Procedure",
      location: "Downtown • 3.1 km",
      hospital: "Children’s Hospital",
      contact: "Dr. James Rodriguez • +1 (555) 456-7890",
      bloodType: "AB-",
      units: 1,
      priority: "Low",
      status: "Under Review",
      requestedAt: "2024-02-20 10:00 AM",
      requiredBy: "2024-02-21 10:00 AM",
      actions: ["View"],
    },
  ]);

  const priorityBadge = (p: string) =>
    p === "Urgent"
      ? <Badge variant="danger">Urgent</Badge>
      : p === "High"
      ? <Badge variant="warning">High</Badge>
      : p === "Medium"
      ? <Badge variant="info">Medium</Badge>
      : <Badge variant="success">Low</Badge>;

  const statusBadge = (s: string) =>
    s === "Approved"
      ? <Badge variant="success">Approved</Badge>
      : s === "Pending"
      ? <Badge variant="warning">Pending</Badge>
      : s === "Rejected"
      ? <Badge variant="danger">Rejected</Badge>
      : s === "In Transit"
      ? <Badge variant="info">In Transit</Badge>
      : <Badge variant="neutral">Under Review</Badge>;

  const addRequest = () => {
    const nextId = `REQ-${String(rows.length + 1).padStart(3, "0")}`;
    const priority = form.priority === "Normal" ? "Medium" : form.priority; // normalize
    const newRow = {
      id: nextId,
      title: form.request_title,
      location: form.hospital_location,
      hospital: form.hospital_name,
      contact: `${form.doctor_name} • ${form.doctor_contact}`,
      bloodType: form.blood_group,
      units: Number(form.blood_units) || 0,
      priority,
      status: "Pending",
      requestedAt: form.requested_at || "",
      requiredBy: form.required_by || "",
      actions: ["View"],
    };
    setRows([newRow, ...rows]);
    setOpen(false);
    setForm({
      request_title: "",
      request_description: "Emergency",
      hospital_location: "",
      hospital_name: "",
      doctor_name: "",
      doctor_contact: "",
      blood_group: "O+",
      blood_units: "1",
      priority: "Normal",
      requested_at: "",
      required_by: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Request & Allocation</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage blood requests from hospitals and track deliveries</div>
        </div>
        <button onClick={() => setOpen(true)} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white">New Request</button>
      </div>

      <Alert variant="danger" title="1 urgent request(s) require immediate attention." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending Requests" value={summary.pending} delta="Awaiting approval" accent="yellow" />
        <StatCard label="Urgent Requests" value={summary.urgent} delta="High priority" accent="pink" />
        <StatCard label="In Transit" value={summary.inTransit} delta="Being delivered" accent="blue" />
        <StatCard label="Today's Deliveries" value={summary.deliveredToday} delta="Successfully completed" accent="green" />
      </div>

      <Toolbar>
        <Tabs tabs={tabs} active={active} onChange={setActive} />
        <div className="flex items-center gap-2">
          <div className="w-72"><Input placeholder="Search by hospital, request ID, or blood type..." /></div>
          <Button variant="outline">Filter by status</Button>
          <Button variant="outline">Filter by priority</Button>
        </div>
      </Toolbar>

      {active === "requests" ? (
        <Card>
          <div className="grid grid-cols-[1.2fr_1.4fr_1fr_1fr_1.2fr_1fr] gap-4 px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            <div>Request Details</div>
            <div>Hospital & Contact</div>
            <div>Blood Requirements</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1.2fr_1.4fr_1fr_1fr_1.2fr_1fr] items-center gap-4 px-3 py-3 text-sm">
                <div>
                  <div className="font-medium">{r.id}</div>
                  <div className="text-xs text-zinc-500">{r.title}</div>
                  <div className="text-xs text-zinc-500">{r.location}</div>
                </div>
                <div>
                  <div className="font-medium">{r.hospital}</div>
                  <div className="text-xs text-zinc-500">{r.contact}</div>
                </div>
                <div>
                  <div className="font-medium">{r.bloodType}</div>
                  <div className="text-xs text-zinc-500">{r.units} units</div>
                </div>
                <div>{priorityBadge(r.priority)}</div>
                <div>
                  <div className="flex items-center gap-2">{statusBadge(r.status)}</div>
                  <div className="mt-1 text-xs text-zinc-500">Requested: {r.requestedAt}</div>
                  <div className="text-xs text-zinc-500">Required by: {r.requiredBy}</div>
                </div>
                <div className="flex items-center gap-2">
                  {r.actions.includes("Approve") ? <Button className="px-3 py-1 text-xs bg-green-600">Approve</Button> : null}
                  {r.actions.includes("Reject") ? <Button className="px-3 py-1 text-xs bg-red-600">Reject</Button> : null}
                  {r.actions.includes("Allocate") ? <Button className="px-3 py-1 text-xs">Allocate</Button> : null}
                  {r.actions.includes("View") ? <Button variant="outline" className="px-3 py-1 text-xs">View</Button> : null}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <span>Delivery Tracking</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">City General Hospital</div>
                  <div className="text-xs text-zinc-500">Request: REQ-001 • Tracking: TRK-001-2024</div>
                </div>
                <Badge variant="info">En Route</Badge>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-zinc-500">Blood Type & Units</div>
                  <div className="font-medium">O- • 4 units</div>
                </div>
                <div>
                  <div className="text-zinc-500">Driver & Vehicle</div>
                  <div className="font-medium">John Smith • VH-001</div>
                </div>
                <div>
                  <div className="text-zinc-500">Departure Time</div>
                  <div className="font-medium">10:30 AM</div>
                </div>
                <div>
                  <div className="text-zinc-500">ETA</div>
                  <div className="font-medium">11:00 AM</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline">Track Live</Button>
                <Button variant="outline">Contact Driver</Button>
                <Button variant="outline">Update ETA</Button>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">Regional Emergency Hospital</div>
                  <div className="text-xs text-zinc-500">Request: REQ-003 • Tracking: TRK-002-2024</div>
                </div>
                <Badge variant="success">Delivered</Badge>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-zinc-500">Blood Type & Units</div>
                  <div className="font-medium">B+ • 6 units</div>
                </div>
                <div>
                  <div className="text-zinc-500">Driver & Vehicle</div>
                  <div className="font-medium">Sarah Johnson • VH-002</div>
                </div>
                <div>
                  <div className="text-zinc-500">Departure Time</div>
                  <div className="font-medium">09:15 AM</div>
                </div>
                <div>
                  <div className="text-zinc-500">ETA</div>
                  <div className="font-medium">10:00 AM</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline">Track Live</Button>
                <Button variant="outline">Contact Driver</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Request Details"
        containerClassName="max-w-5xl"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={addRequest}>Create Request</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <div className="text-sm font-semibold">Request Details</div>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold">Title</div>
                <Input placeholder="request_title" value={form.request_title} onChange={(e)=>setForm({...form, request_title:e.target.value})} className="mt-1 h-10" />
              </div>
              <div>
                <div className="text-xs font-semibold">Description</div>
                <select className="mt-1 h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm dark:border-zinc-800" value={form.request_description} onChange={(e)=>setForm({...form, request_description:e.target.value})}>
                  <option>Emergency</option>
                  <option>Surgery</option>
                  <option>Routine</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Hospital & Contact</div>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold">Hospital Location</div>
                <Input placeholder="hospital_location" value={form.hospital_location} onChange={(e)=>setForm({...form, hospital_location:e.target.value})} className="mt-1 h-10" />
              </div>
              <div>
                <div className="text-xs font-semibold">Hospital Name</div>
                <Input placeholder="hospital_name" value={form.hospital_name} onChange={(e)=>setForm({...form, hospital_name:e.target.value})} className="mt-1 h-10" />
              </div>
              <div>
                <div className="text-xs font-semibold">Doctor Name</div>
                <Input placeholder="doctor_name" value={form.doctor_name} onChange={(e)=>setForm({...form, doctor_name:e.target.value})} className="mt-1 h-10" />
              </div>
              <div>
                <div className="text-xs font-semibold">Doctor Contact</div>
                <Input placeholder="doctor_contact" value={form.doctor_contact} onChange={(e)=>setForm({...form, doctor_contact:e.target.value})} className="mt-1 h-10" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Blood Requirements</div>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold">Blood Group</div>
                <select className="mt-1 h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm dark:border-zinc-800" value={form.blood_group} onChange={(e)=>setForm({...form, blood_group:e.target.value})}>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-semibold">Units</div>
                <Input type="number" min={1} placeholder="blood_units" value={form.blood_units} onChange={(e)=>setForm({...form, blood_units:e.target.value})} className="mt-1 h-10" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Priority</div>
            <div className="mt-3 grid grid-cols-1 gap-4">
              <div>
                <div className="text-xs font-semibold">Priority</div>
                <select className="mt-1 h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm dark:border-zinc-800" value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})}>
                  <option>Urgent</option>
                  <option>High</option>
                  <option>Normal</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Dates</div>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold">Requested At</div>
                <Input type="datetime-local" value={form.requested_at} onChange={(e)=>setForm({...form, requested_at:e.target.value})} className="mt-1 h-10" />
              </div>
              <div>
                <div className="text-xs font-semibold">Required By</div>
                <Input type="datetime-local" value={form.required_by} onChange={(e)=>setForm({...form, required_by:e.target.value})} className="mt-1 h-10" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
