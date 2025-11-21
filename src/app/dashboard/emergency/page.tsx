import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Send, Bell, MapPin, CalendarDays } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card>
        <div className="p-4">
          <div className="text-lg font-semibold">Emergency Response Actions</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Quick actions for emergency situations</div>
        </div>
        <div className="space-y-3 p-4">
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <Send />
            <span>Send Emergency SMS to All Eligible Donors</span>
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <Bell />
            <span>Notify Nearby Blood Banks</span>
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <MapPin />
            <span>Locate Nearest Donors by GPS</span>
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <CalendarDays />
            <span>Schedule Emergency Drive</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}