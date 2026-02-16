"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        document.cookie = `token=${token}; Path=/; SameSite=Lax; Secure`;
        toast.success("Successfully logged in!");
        router.push("/dashboard");
      } else {
        let msg = "The credentials you entered are incorrect.";
        try {
          const data = await response.json();
          msg = data.message || msg;
        } catch (e) {
          if (response.status === 403) {
            msg = "Access forbidden. Please ensure you are using a supported browser or check your connection.";
          } else if (response.status === 404) {
            msg = "Login service not found. Please contact support.";
          }
        }
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-black transition-colors mb-20 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
          
          <div className="max-w-sm">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome back.</h1>
            <p className="text-neutral-500 mb-10">Sign in to your Vortex account to continue building your future.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-neutral-400">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-neutral-100 transition-all text-neutral-900 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-neutral-400">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-neutral-100 transition-all text-neutral-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-neutral-200"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-2xl border border-red-100">
                {error}
              </div>
            )}

            <p className="mt-10 text-center text-sm font-medium text-neutral-500">
              New here?{" "}
              <Link href="/signup" className="text-black font-bold hover:underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-xs text-neutral-300 font-medium mt-auto">© 2026 Vortex Inc. Platform for modern engineering.</p>
      </div>
      
      <div className="hidden md:block w-1/2 bg-neutral-900 m-4 rounded-[48px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-3xl font-bold text-white mb-6 leading-tight">"Vortex has completely transformed how our team collaborates on complex systems."</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full" />
            <div>
              <p className="text-white font-bold">Sarah Chen</p>
              <p className="text-white/40 text-sm font-medium">Head of Engineering, Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
