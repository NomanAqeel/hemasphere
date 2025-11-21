"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import { Download, ChevronDown, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const donutData = [
    { label: "O+", value: 35, color: "#e11d48" },
    { label: "A+", value: 25, color: "#f59e0b" },
    { label: "B+", value: 15, color: "#f59e0b" },
    { label: "AB+", value: 8, color: "#f59e0b" },
    { label: "O-", value: 7, color: "#22c55e" },
    { label: "A-", value: 5, color: "#22c55e" },
    { label: "B-", value: 3, color: "#3b82f6" },
    { label: "AB-", value: 2, color: "#8b5cf6" },
  ];
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const [periodOpen, setPeriodOpen] = useState(false);
  const [period, setPeriod] = useState<string | null>(null);
  const periodRef = useRef<HTMLDivElement | null>(null);
  const periods = ["Last 7 days", "Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) setPeriodOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Insights into donation trends, usage patterns, and demand forecasting</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative" ref={periodRef}>
            <button onClick={() => setPeriodOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black">
              {period ?? "Select time period"}
              <ChevronDown className={["h-4 w-4 transition", periodOpen ? "rotate-180" : "rotate-0"].join(" ")} />
            </button>
            {periodOpen ? (
              <div className="absolute left-0 z-10 mt-2 w-44 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-black">
                {periods.map((p) => (
                  <button key={p} onClick={() => { setPeriod(p); setPeriodOpen(false); }} className={["block w-full text-left px-3 py-2 text-sm", period === p ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"].join(" ")}>
                    {p}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black"><Download className="h-4 w-4" />Export Report</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Donations" value={1847} delta="+12.5% vs last month" accent="pink" />
        <StatCard label="Active Donors" value={1247} delta="+8.3% vs last month" accent="blue" />
        <StatCard label="Blood Utilization" value="89.4%" delta="+2.1% efficiency rate" accent="green" />
        <StatCard label="Request Fulfillment" value="96.7%" delta="-1.2% success rate" accent="purple" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-2 text-sm font-semibold">Donation Trends</div>
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="h-64">
              <svg viewBox="0 0 500 260" className="h-full w-full">
                <g>
                  <line x1="40" y1="220" x2="480" y2="220" stroke="#c4c4c4" />
                  <line x1="40" y1="40" x2="40" y2="220" stroke="#c4c4c4" />
                  {[0,1,2,3,4].map(i => (
                    <line key={i} x1={40} y1={220 - 36*(i+1)} x2={480} y2={220 - 36*(i+1)} stroke="#e5e5e5" />
                  ))}
                  {["Jan","Feb","Mar","Apr","May","Jun"].map((m,i)=> (
                    <text key={m} x={40 + i*88} y={240} className="fill-zinc-500 text-[10px]">{m}</text>
                  ))}
                </g>
                <polyline fill="none" stroke="#ef4444" strokeWidth="3" points="40,180 128,150 216,120 304,140 392,100 480,70" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="40,200 128,185 216,165 304,180 392,155 480,135" />
                {[180,150,120,140,100,70].map((y,i)=> (
                  <circle key={i} cx={40 + i*88} cy={y} r={4} fill="#ef4444" />
                ))}
                {[200,185,165,180,155,135].map((y,i)=> (
                  <circle key={i} cx={40 + i*88} cy={y} r={4} fill="#3b82f6" />
                ))}
                <g>
                  <rect x="320" y="46" width="160" height="24" rx="6" className="fill-white dark:fill-black" />
                  <circle cx="336" cy="58" r="4" fill="#ef4444" />
                  <text x="348" y="62" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Donations</text>
                  <circle cx="408" cy="58" r="4" fill="#3b82f6" />
                  <text x="420" y="62" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Unique Donors</text>
                </g>
              </svg>
            </div>
          </div>
        </Card>
        <Card>
          <div className="mb-2 text-sm font-semibold">Blood Type Distribution</div>
          <div className="flex items-center gap-6">
            <div className="relative h-64 w-64">
              <svg viewBox="0 0 220 220" className="h-full w-full">
                <g transform="translate(110,110)">
                  {donutData.map((d, i) => {
                    const seg = (d.value / 100) * c;
                    const dash = `${seg} ${c - seg}`;
                    const el = (
                      <circle key={d.label} r={r} fill="none" stroke={d.color} strokeWidth={24} strokeDasharray={dash} strokeDashoffset={-offset} />
                    );
                    offset += seg;
                    return el;
                  })}
                  <circle r={r-28} fill="white" className="dark:fill-black" />
                </g>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Top Type</div>
                <div className="text-xl font-semibold">O+ 35%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#e11d48"}}></span>O+: 35%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#3b82f6"}}></span>B-: 3%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#f59e0b"}}></span>A+: 25%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#8b5cf6"}}></span>AB-: 2%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#f59e0b"}}></span>B+: 15%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#22c55e"}}></span>A-: 5%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#f59e0b"}}></span>AB+: 8%</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{backgroundColor:"#22c55e"}}></span>O-: 7%</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-2 text-sm font-semibold">Blood Usage by Category</div>
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="h-64">
              <svg viewBox="0 0 500 260" className="h-full w-full">
                <g>
                  <line x1="40" y1="220" x2="480" y2="220" stroke="#c4c4c4" />
                  <line x1="40" y1="40" x2="40" y2="220" stroke="#c4c4c4" />
                  {[0,1,2,3,4].map(i => (
                    <line key={i} x1={40} y1={220 - 36*(i+1)} x2={480} y2={220 - 36*(i+1)} stroke="#e5e5e5" />
                  ))}
                  {["Jan","Feb","Mar","Apr","May","Jun"].map((m,i)=> (
                    <text key={m} x={40 + i*74} y={240} className="fill-zinc-500 text-[10px]">{m}</text>
                  ))}
                </g>
                {(() => {
                  const months = [
                    { m: "Jan", emergency: 130, routine: 180, surgery: 70 },
                    { m: "Feb", emergency: 145, routine: 190, surgery: 85 },
                    { m: "Mar", emergency: 160, routine: 210, surgery: 95 },
                    { m: "Apr", emergency: 150, routine: 185, surgery: 80 },
                    { m: "May", emergency: 165, routine: 220, surgery: 105 },
                    { m: "Jun", emergency: 180, routine: 240, surgery: 115 },
                  ];
                  const scaleY = (v: number) => 220 - (v / 600) * 180;
                  return months.map((d, i) => {
                    const x = 52 + i * 74;
                    const w = 40;
                    const yE = scaleY(d.emergency);
                    const yR = scaleY(d.emergency + d.routine);
                    const yS = scaleY(d.emergency + d.routine + d.surgery);
                    const hE = 220 - yE;
                    const hR = yE - yR;
                    const hS = yR - yS;
                    return (
                      <g key={d.m}>
                        <rect x={x} y={yS} width={w} height={220 - yS} fill="#d97706" rx={4} />
                        <rect x={x} y={yR} width={w} height={hS} fill="#f97316" rx={4} />
                        <rect x={x} y={yE} width={w} height={hE} fill="#ef4444" rx={4} />
                      </g>
                    );
                  });
                })()}
                <g>
                  <rect x="280" y="46" width="200" height="60" rx="8" className="fill-white dark:fill-black" />
                  <circle cx="300" cy="66" r="5" fill="#ef4444" />
                  <text x="312" y="70" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Emergency</text>
                  <circle cx="300" cy="86" r="5" fill="#f97316" />
                  <text x="312" y="90" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Routine</text>
                  <circle cx="380" cy="66" r="5" fill="#d97706" />
                  <text x="392" y="70" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Surgery</text>
                </g>
              </svg>
            </div>
          </div>
        </Card>
        <Card>
          <div className="mb-2 text-sm font-semibold">Demand Forecasting</div>
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="h-64">
              <svg viewBox="0 0 500 260" className="h-full w-full">
                <g>
                  <line x1="40" y1="220" x2="480" y2="220" stroke="#c4c4c4" />
                  <line x1="40" y1="40" x2="40" y2="220" stroke="#c4c4c4" />
                  {[0,1,2,3,4].map(i => (
                    <line key={i} x1={40} y1={220 - 36*(i+1)} x2={480} y2={220 - 36*(i+1)} stroke="#e5e5e5" />
                  ))}
                  {["Week 1","Week 2","Week 3","Week 4"].map((m,i)=> (
                    <text key={m} x={40 + i*110} y={240} className="fill-zinc-500 text-[10px]">{m}</text>
                  ))}
                </g>
                <polyline fill="none" stroke="#22c55e" strokeWidth="3" points="40,200 150,190 260,170 370,150" />
                {[200,190,170,150].map((y,i)=> (
                  <circle key={i} cx={40 + i*110} cy={y} r={4} fill="#22c55e" />
                ))}
                <polyline fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6 6" points="40,195 150,180 260,160 370,145" />
                {[195,180,160,145].map((y,i)=> (
                  <circle key={i} cx={40 + i*110} cy={y} r={4} fill="#8b5cf6" />
                ))}
                <g>
                  <rect x="300" y="46" width="170" height="40" rx="8" className="fill-white dark:fill-black" />
                  <circle cx="320" cy="64" r="4" fill="#22c55e" />
                  <text x="330" y="68" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Actual Demand</text>
                  <circle cx="420" cy="64" r="4" fill="#8b5cf6" />
                  <text x="430" y="68" className="fill-zinc-600 dark:fill-zinc-300 text-[10px]">Predicted Demand</text>
                </g>
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4" />Top Requesting Hospitals (This Month)</div>
        {[
          { rank: 1, name: "City General Hospital", tag: "Major", total: 180, requests: 45 },
          { rank: 2, name: "St. Mary's Medical Center", tag: "Major", total: 152, requests: 38 },
          { rank: 3, name: "Regional Emergency Hospital", tag: "Emergency", total: 128, requests: 32 },
          { rank: 4, name: "Children's Hospital", tag: "Specialized", total: 75, requests: 25 },
          { rank: 5, name: "University Medical Center", tag: "Teaching", total: 88, requests: 22 },
        ].map((h) => (
          <div key={h.rank} className="mb-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">#{h.rank}</div>
                <div>
                  <div className="text-sm font-medium">{h.name}</div>
                  <span className="mt-1 inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">{h.tag}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-red-600">{h.total}</div>
                <div className="text-xs text-zinc-500">{h.requests} requests</div>
              </div>
            </div>
          </div>
        ))}
      </Card>

      
    </div>
  );
}
