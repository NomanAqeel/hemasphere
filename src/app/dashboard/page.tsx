import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Progress from "@/components/ui/Progress";
import StatusPill from "@/components/ui/StatusPill";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blood Bank Dashboard</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monitor blood inventory and donor activities</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">System Active</Badge>
          <Badge variant="info">Last Updated: 5 min ago</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Alert variant="warning" title="B- blood type running low (8 units remaining)" />
        <Alert variant="danger" title="AB- critically low (3 units remaining)" />
        <Alert variant="info" title="15 donors scheduled for tomorrow" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Blood Units" value={201} delta={"+12 from last week"} accent="blue" />
        <StatCard label="Active Donors" value={1247} delta={"+23 new this month"} accent="green" />
        <StatCard label="Requests Today" value={8} delta={"6 approved, 2 pending"} accent="purple" />
        <StatCard label="Scheduled Donations" value={15} delta={"Tomorrow's appointments"} accent="pink" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Blood Type Inventory</div>
          </div>
          <div className="space-y-4">
            <Progress label="A+" value={90} units={"45 units"} color="bg-red-600" />
            <Progress label="A-" value={24} units={"12 units"} color="bg-red-500" />
            <Progress label="B+" value={16} units={"8 units"} color="bg-red-600" />
            <Progress label="B-" value={16} units={"8 units"} color="bg-red-500" />
            <Progress label="O+" value={70} units={"35 units"} color="bg-red-600" />
            <Progress label="O-" value={30} units={"15 units"} color="bg-red-500" />
            <Progress label="AB+" value={10} units={"5 units"} color="bg-red-600" />
            <Progress label="AB-" value={6} units={"3 units"} color="bg-red-500" />
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Recent Blood Requests</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <div>
                <div className="text-sm font-medium">City General Hospital</div>
                <div className="text-xs text-zinc-500">O- • 4 units • 2 hours ago</div>
              </div>
              <StatusPill status="Approved" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <div>
                <div className="text-sm font-medium">Sunrise Clinic</div>
                <div className="text-xs text-zinc-500">AB- • 2 units • 1 hour ago</div>
              </div>
              <StatusPill status="Pending" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <div>
                <div className="text-sm font-medium">Metro Health</div>
                <div className="text-xs text-zinc-500">A+ • 6 units • 30 min ago</div>
              </div>
              <StatusPill status="Approved" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
