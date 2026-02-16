"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Layout } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="font-bold text-xl tracking-tight">Vortex</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/login" className="text-sm font-medium hover:text-black transition-colors">Sign in</Link>
            <Link href="/signup" className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all active:scale-95">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now in Private Beta
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
          >
            The workspace for <br className="hidden md:block" />
            <span className="text-neutral-400">modern engineering.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Vortex brings your team together in a unified, high-performance environment. 
            Ship faster, stay aligned, and focus on what matters.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup" className="group w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 shadow-2xl shadow-neutral-200">
              Start Building Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-full font-semibold hover:bg-neutral-50 transition-all active:scale-95">
              Book a Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-12">
            Trusted by teams worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 grayscale opacity-50">
            {['Stripe', 'Vercel', 'Linear', 'GitHub', 'Replit', 'Notion'].map(name => (
              <div key={name} className="flex items-center justify-center font-bold text-xl tracking-tighter italic">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to ship.</h2>
            <p className="text-neutral-500 text-lg">Powerful tools for the modern developer workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Built for speed. Optimized for the best possible developer experience."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Secure by Default"
              description="Enterprise-grade security and compliance built into every layer."
            />
            <FeatureCard 
              icon={<Layout className="w-6 h-6" />}
              title="Beautiful UI"
              description="A minimalist design that stays out of your way and lets you focus."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <span className="font-bold text-lg tracking-tight">Vortex</span>
          </div>
          <div className="flex gap-8 text-sm text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
          </div>
          <p className="text-sm text-neutral-400">© 2026 Vortex Inc.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 text-black">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
