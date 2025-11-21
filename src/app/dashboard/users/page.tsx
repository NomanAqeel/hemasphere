"use client";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Toolbar from "@/components/ui/Toolbar";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Pencil, Trash } from "lucide-react";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    phone: "",
    email: "",
    certifications: "",
    status: "Active",
  });
  const [users, setUsers] = useState([
    { id: "S001", name: "Dr. Admin", role: "Admin", department: "Administration", status: "Active", certifications: "Healthcare Administration", email: "admin@example.com", phone: "+000-XX-XXXXXXX" },
    { id: "S002", name: "Staff Member", role: "Staff", department: "Blood Bank", status: "Active", certifications: "Blood Transfusion Safety", email: "staff@example.com", phone: "+000-XX-XXXXXXX" },
    { id: "S003", name: "Viewer", role: "Viewer", department: "Laboratory", status: "Inactive", certifications: "Clinical Laboratory", email: "viewer@example.com", phone: "+000-XX-XXXXXXX" },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const total = useMemo(() => users.length, [users]);
  const openCreate = () => {
    setEditingIndex(null);
    setForm({ name: "", role: "", department: "", phone: "", email: "", certifications: "", status: "Active" });
    setOpen(true);
  };
  const openEdit = (i: number) => {
    const u = users[i];
    setEditingIndex(i);
    setForm({ name: u.name, role: u.role, department: u.department, phone: u.phone, email: u.email, certifications: u.certifications, status: u.status });
    setOpen(true);
  };
  const registerOrUpdate = () => {
    if (editingIndex === null) {
      const nextNum = users.length + 1;
      const id = `S${String(nextNum).padStart(3, "0")}`;
      setUsers([...users, { id, name: form.name, role: form.role || "Staff", department: form.department, status: form.status || "Active", certifications: form.certifications, email: form.email, phone: form.phone }]);
    } else {
      const copy = [...users];
      copy[editingIndex] = { ...copy[editingIndex], name: form.name, role: form.role || copy[editingIndex].role, department: form.department, certifications: form.certifications, email: form.email, phone: form.phone, status: form.status || copy[editingIndex].status };
      setUsers(copy);
    }
    setOpen(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Access</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage roles, permissions and account status</div>
        </div>
        <button onClick={openCreate} className="rounded-md bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">Invite User</button>
      </div>

      <Toolbar>
        <div className="flex items-center gap-2">
          <input className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800" placeholder="Search users" />
          <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800">Filter</button>
        </div>
        <Badge variant="info">Total: {total}</Badge>
      </Toolbar>

      <Card>
        <div className="grid grid-cols-7 gap-4 px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <div>Staff ID</div>
          <div>Name</div>
          <div>Role</div>
          <div>Department</div>
          <div>Status</div>
          <div>Certifications</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((u) => (
            <div key={u.id} className="grid grid-cols-7 items-center px-3 py-3 text-sm">
              <div className="font-medium">{u.id}</div>
              <div>{u.name}</div>
              <div>
                <Badge variant="neutral">{u.role}</Badge>
              </div>
              <div>{u.department}</div>
              <div>
                <Badge variant={u.status === "Active" ? "success" : "neutral"}>{u.status.toLowerCase()}</Badge>
              </div>
              <div className="truncate">{u.certifications}</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(users.indexOf(u))}><Pencil /></Button>
                <Button variant="outline" size="sm" onClick={() => {
                  const idx = users.indexOf(u);
                  const copy = [...users];
                  copy.splice(idx, 1);
                  setUsers(copy);
                }}><Trash /></Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingIndex === null ? "Register New Staff Member" : "Edit Staff Member"}
        containerClassName="max-w-4xl"
        bodyClassName="bg-white dark:bg-black"
        footer={
          <div className="flex justify-end">
            <Button onClick={registerOrUpdate} className="rounded-md">{editingIndex === null ? "Register Staff Member" : "Save Changes"}</Button>
          </div>
        }
      >
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Add new staff member to the blood bank system</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold">Full Name</div>
            <Input placeholder="Enter full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 h-10" />
          </div>
          <div>
            <div className="text-xs font-semibold">Role</div>
            <div className="mt-1">
              <select
                className="h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm dark:border-zinc-800"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="" disabled>Select role</option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold">Department</div>
            <Input placeholder="Department name" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mt-1 h-10" />
          </div>
          <div>
            <div className="text-xs font-semibold">Phone Number</div>
            <Input placeholder="+218-XX-XXXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 h-10" />
          </div>
          <div>
            <div className="text-xs font-semibold">Email Address</div>
            <Input type="email" placeholder="staff@hospital.ly" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 h-10" />
          </div>
          <div>
            <div className="text-xs font-semibold">Status</div>
            <div className="mt-1">
              <select
                className="h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm dark:border-zinc-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold">Certifications</div>
            <textarea
              className="mt-1 h-24 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-800"
              placeholder="List staff certifications and qualifications..."
              value={form.certifications}
              onChange={(e) => setForm({ ...form, certifications: e.target.value })}
            />
          </div>
        </div>
      </Modal>

    </div>
  );
}
