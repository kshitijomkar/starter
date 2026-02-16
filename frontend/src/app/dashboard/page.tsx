"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Files, 
  Plus, 
  Bell, 
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  LogOut
} from "lucide-react";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setUsername("Alex Rivers");
  }, [router]);

  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex text-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-bold text-xl tracking-tight">Vortex</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<Files size={18} />} label="Projects" />
          <NavItem icon={<Users size={18} />} label="Team" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        {/* Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-neutral-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-neutral-100 px-4 py-2 rounded-full w-96">
            <Search size={16} className="text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-neutral-500 hover:bg-neutral-100 rounded-full transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-10 bg-gradient-to-tr from-neutral-900 to-neutral-700 rounded-full border-2 border-white shadow-sm" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-10 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-neutral-400 mb-1">Good morning, {username}</p>
              <h1 className="text-4xl font-bold tracking-tight">Project Overview</h1>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-neutral-200">
              <Plus size={20} />
              New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard label="Total Deployments" value="1,284" change="+12.5%" icon={<TrendingUp size={20} />} />
            <StatCard label="Active Projects" value="42" change="+3" icon={<LayoutDashboard size={20} />} />
            <StatCard label="Uptime Score" value="99.99%" change="Optimal" icon={<Clock size={20} />} />
          </div>

          {/* Recent Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Recent Projects</h3>
                <button className="text-sm font-semibold text-neutral-400 hover:text-black">View all</button>
              </div>
              <div className="space-y-4">
                <ProjectItem name="Vortex Website" status="Production" lastUpdate="2m ago" />
                <ProjectItem name="API Service" status="Development" lastUpdate="15m ago" />
                <ProjectItem name="Mobile App" status="Preview" lastUpdate="1h ago" />
                <ProjectItem name="Documentation" status="Production" lastUpdate="3h ago" />
              </div>
            </div>

            <div className="bg-neutral-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-neutral-400 mb-8 max-w-[200px]">Unlock advanced analytics and priority deployments.</p>
                <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-neutral-100 transition-all active:scale-95">
                  Learn more
                </button>
              </div>
              <div className="absolute top-10 right-10 w-48 h-48 bg-white/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      active 
        ? "bg-black text-white shadow-lg shadow-neutral-200" 
        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
    }`}>
      {icon}
      {label}
    </a>
  );
}

function StatCard({ label, value, change, icon }: { label: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-black transition-colors">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          change.startsWith('+') ? "bg-green-50 text-green-600" : "bg-neutral-50 text-neutral-400"
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-400 mb-1">{label}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function ProjectItem({ name, status, lastUpdate }: { name: string, status: string, lastUpdate: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center font-bold text-neutral-400 group-hover:bg-white group-hover:shadow-sm transition-all">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-xs text-neutral-400">{lastUpdate}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
          status === 'Production' ? 'bg-green-50 text-green-600' : 
          status === 'Development' ? 'bg-blue-50 text-blue-600' : 'bg-neutral-100 text-neutral-600'
        }`}>
          {status}
        </span>
        <ChevronRight size={14} className="text-neutral-300 group-hover:text-black transition-colors" />
      </div>
    </div>
  );
}
