import Image from "next/image";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl h-[70vh] rounded-2xl border border-black/10 bg-white/20 shadow-xl backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="relative h-full overflow-hidden rounded-l-2xl">
            <Image src="/media/login-side.jpg" alt="Blood sample" width={1024} height={680} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-white" />
                <span className="text-lg font-semibold">Hemasphere</span>
              </div>
              <p className="mt-2 max-w-sm text-sm opacity-90">From Need to Deed – Smarter Blood Access</p>
            </div>
          </div>
          <div className="rounded-r-2xl bg-white/30 p-8 flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <Image src="/media/logo-full.png" alt="HemaSphere" width={260} height={64} className="h-16 w-auto" />
            </div>
            <div className="w-full max-w-sm mx-auto flex-1 flex items-center">
              <Card>
                <div className="p-6 text-center">
                  <div className="text-lg font-semibold">Contact</div>
                  <div className="mt-1 text-sm text-zinc-600">contact the support team of hemasphere to register your blood bank</div>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button className="rounded-full" variant="outline">call now</Button>
                    <Button className="rounded-full" variant="outline">email now</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
