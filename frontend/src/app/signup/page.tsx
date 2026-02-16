"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        document.cookie = `token=${token}; Path=/; SameSite=Lax; Secure`;
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        let msg = "Signup failed. Please check your details and try again.";
        try {
          const data = await response.json();
          msg = data.message || msg;
        } catch (e) {
          if (response.status === 403) {
            msg = "Access forbidden. This might be a security restriction or a temporary issue with the server.";
          } else if (response.status === 404) {
            msg = "Authentication service not found. Please contact support.";
          }
        }
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = "An unexpected error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
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
            <h1 className="text-4xl font-bold tracking-tight mb-3">Create your account.</h1>
            <p className="text-neutral-500 mb-10">Join thousands of developers building the next generation of software.</p>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-neutral-100 transition-all text-neutral-900 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="Create a strong password"
                  className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-neutral-100 transition-all text-neutral-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <ShieldCheck className="text-blue-500 w-5 h-5 shrink-0" />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  By creating an account, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and secure.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-neutral-200"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create account"}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-2xl border border-red-100">
                {error}
              </div>
            )}

            <p className="mt-10 text-center text-sm font-medium text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-bold hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-xs text-neutral-300 font-medium mt-auto">© 2026 Vortex Inc. Built for the modern web.</p>
      </div>
      
      <div className="hidden md:block w-1/2 bg-neutral-100 m-4 rounded-[48px] relative overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="bg-white w-full aspect-video rounded-3xl shadow-2xl p-8 border border-neutral-200 group-hover:-translate-y-4 transition-transform duration-1000 ease-out">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-neutral-100 rounded-full" />
              <div className="h-4 w-1/2 bg-neutral-100 rounded-full" />
              <div className="h-20 w-full bg-neutral-50 rounded-2xl" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-12 bg-neutral-100 rounded-xl" />
                <div className="h-12 bg-neutral-100 rounded-xl" />
                <div className="h-12 bg-neutral-100 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
