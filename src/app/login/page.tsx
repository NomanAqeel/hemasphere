"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [show, setShow] = useState(false);
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
                <span className="text-lg font-semibold">HemaSphere</span>
              </div>
              <p className="mt-2 max-w-sm text-sm opacity-90">From Need to Deed – Smarter Blood Access</p>
            </div>
          </div>
          <div className="rounded-r-2xl bg-white/30 p-8 flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <Image src="/media/logo-full.png" alt="HemaSphere" width={260} height={64} className="h-16 w-auto" />
            </div>
            <div className="w-full max-w-md mx-auto flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Login</h2>
              </div>
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm">Email</label>
                  <Input type="email" placeholder="balamia@gmail.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Password</label>
                  <div className="relative">
                    <Input type={show ? "text" : "password"} placeholder="Enter your password" />
                    <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                      {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" className="size-4 rounded border border-black/10" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs text-blue-600">Forget your password</a>
                </div>
                <Button type="submit" className="w-full h-12 rounded-full bg-blue-600 text-white">Create account</Button>
                <div className="text-xs text-center">Already Have An Account ? <Link href="/signup" className="text-blue-600">Sign Up</Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
