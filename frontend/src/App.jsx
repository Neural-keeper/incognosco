import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  MessageSquare, 
  BookOpen, 
  Upload, 
  Eye, 
  Flame, 
  Users, 
  Zap, 
  FileJson,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

// --- Configuration ---
const COLORS = {
  bg: "bg-[#F0F5DF]",       // Light Cream
  ui: "bg-[#2FAF6A]",       // Green Button/Highlight
  textMain: "text-[#0B3D2E]", // Dark Green Text
  panel: "bg-[#0B3D2E]",    // Dark Panels
  heading: "text-[#CFC493]",// Gold/Beige Headings
  neon: "#9AFFC8"           // Mint Glow
};

// --- Helper for Smooth Scrolling ---
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleLogin = () => {
  alert("Login Portal: Coming Soon for USF Students! 🤘");
};

const GradientBlob = ({ color, position }) => (
  <div className={`absolute ${position} w-[500px] h-[500px] ${color} rounded-full blur-[100px] -z-10 opacity-40 mix-blend-multiply`} />
);

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-12 relative w-full max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const NeonCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`group relative ${COLORS.panel} border border-[#CFC493]/30 p-8 rounded-2xl overflow-hidden hover:border-[#9AFFC8] hover:shadow-[0_0_30px_#9AFFC840] transition-all duration-300`}
  >
    <div className="relative z-10">
      <div className="w-12 h-12 bg-[#2FAF6A]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2FAF6A] transition-colors">
        <Icon className="text-[#2FAF6A] group-hover:text-[#F0F5DF] transition-colors" size={24} />
      </div>
      <h3 className={`text-xl font-bold text-[#CFC493] mb-3`}>{title}</h3>
      <p className="text-[#F0F5DF]/80 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className={`min-h-screen ${COLORS.bg} ${COLORS.textMain} font-sans overflow-x-hidden selection:bg-[#2FAF6A] selection:text-white`}>
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GradientBlob color="bg-[#2FAF6A]" position="-top-40 -left-40" />
        <GradientBlob color="bg-[#CFC493]" position="top-1/3 right-0" />
        <GradientBlob color="bg-[#9AFFC8]" position="bottom-0 left-1/3" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 ${COLORS.panel} shadow-lg border-b border-[#CFC493]/20`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo - Clicks to Top */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#2FAF6A] rounded flex items-center justify-center font-bold text-white">C</div>
            <span className="text-xl font-bold tracking-tight text-[#F0F5DF]">Cogno</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#CFC493]">
            <button onClick={() => scrollToSection('problem')} className="hover:text-[#9AFFC8] transition-colors">Problem</button>
            <button onClick={() => scrollToSection('solution')} className="hover:text-[#9AFFC8] transition-colors">Solution</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#9AFFC8] transition-colors">Features</button>
          </div>

          {/* CTA Button */}
          <button 
            onClick={handleLogin}
            className="bg-[#F0F5DF]/10 hover:bg-[#2FAF6A] text-[#F0F5DF] px-5 py-2 rounded-full text-sm font-medium transition-all border border-[#CFC493]/30 hover:shadow-[0_0_15px_#9AFFC8]"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-[#0B3D2E] mb-6 tracking-tight">
            Cogno
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0B3D2E] mb-6">
            The study app that <span className="text-[#2FAF6A] underline decoration-wavy underline-offset-4">bullies</span> you into passing.
          </h2>
          <p className="text-lg text-[#0B3D2E]/80 max-w-2xl mx-auto mb-10 font-medium">
            We use AI to detect when you pick up your phone and publicly shame you in front of your friends. Stop scrolling, start studying.
          </p>
          
          <motion.button
            onClick={() => scrollToSection('solution')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #9AFFC8" }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#2FAF6A] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#2FAF6A]/30 border border-[#9AFFC8]/50`}
          >
            Start Now
          </motion.button>
        </motion.div>

        {/* Laptop Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 relative w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl border-4 border-[#0B3D2E] bg-[#0B3D2E] p-2 shadow-2xl shadow-[#0B3D2E]/20">
             <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#1a1a1a] relative flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40" />
                <div className="z-10 bg-[#0B3D2E]/90 border border-[#2FAF6A] p-8 rounded-2xl text-center backdrop-blur-xl shadow-[0_0_50px_#2FAF6A40]">
                  <div className="w-16 h-16 bg-[#2FAF6A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-[#9AFFC8]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F0F5DF] mb-2">TARGET ACQUIRED</h3>
                  <p className="text-[#9AFFC8] font-mono">Phone usage detected. Roast initiating...</p>
                </div>
             </div>
          </div>
        </motion.div>
      </header>

      {/* Problem Section */}
      <Section id="problem">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D2E] mb-4">The System is Broken</h2>
          <p className="text-[#0B3D2E]/70 font-medium">Why you're failing (hint: it's not just the material).</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <NeonCard 
            icon={BookOpen}
            title="Canvas is Boring"
            description="Discussion posts nobody reads and a UI from 2010. It's physically painful to stay engaged."
            delay={0.1}
          />
          <NeonCard 
            icon={MessageSquare}
            title="Discord is Chaos"
            description="Too many channels, too many memes. It's overwhelming when you just need to focus."
            delay={0.2}
          />
          <NeonCard 
            icon={Smartphone}
            title="Digital Distraction"
            description="You pick up your phone for 'one second' and suddenly it's 3 AM. You need an intervention."
            delay={0.3}
          />
        </div>
      </Section>

      {/* Solution Loop Section */}
      <Section id="solution" className="bg-[#CFC493]/20 rounded-3xl border border-[#CFC493]/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D2E]">The Cogno Loop</h2>
          <p className="text-[#0B3D2E] mt-2 font-mono font-bold">Automation. Surveillance. Shame.</p>
        </div>

        <div className="grid md:grid-cols-1 gap-0 relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-[2.25rem] top-0 bottom-0 w-1 bg-[#CFC493] opacity-50" />

          {[
            { icon: Upload, title: "Import", desc: "Upload your syllabus CSV. We parse it instantly." },
            { icon: Users, title: "Commitment", desc: "Enter the Study Lounge. You are now locked in." },
            { icon: Eye, title: "Surveillance", desc: "AI monitors your webcam for unauthorized phone usage." },
            { icon: Flame, title: "Roast", desc: "Get caught? A humiliating message is sent to the chat." }
          ].map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex items-start gap-8 py-8 md:pl-0"
            >
              <div className="bg-[#0B3D2E] border-2 border-[#CFC493] w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <step.icon className="text-[#F0F5DF]" size={32} />
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-[#0B3D2E] mb-2">{step.title}</h3>
                <p className="text-[#0B3D2E]/80 text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0B3D2E] mb-16">
          Built for <span className="text-[#2FAF6A]">Academic Survival</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Flame, title: "Roast Room", desc: "Real-time object detection triggers merciless insults when you slack off.", color: "text-[#CFC493]" },
            { icon: Zap, title: "Ephemeral Lounges", desc: "What happens in the lounge, stays there. All chat logs auto-delete after 24 hours.", color: "text-[#9AFFC8]" },
            { icon: FileJson, title: "Syllabus Sync", desc: "Drag & drop your syllabus CSV. We map your semester into actionable tasks instantly.", color: "text-[#CFC493]" },
            { icon: Users, title: "Streaks & Leaderboard", desc: "Compete with friends. See who has the lowest 'Roast Count' this week.", color: "text-[#9AFFC8]" }
          ].map((feature, i) => (
            <div key={i} className="bg-[#0B3D2E] border border-[#CFC493]/30 p-8 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_30px_#9AFFC840] transition-all">
              <feature.icon className={`${feature.color} mb-4`} size={40} />
              <h3 className="text-2xl font-bold text-[#F0F5DF] mb-2">{feature.title}</h3>
              <p className="text-[#F0F5DF]/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Demo Preview Section */}
      <Section className="bg-[#0B3D2E] rounded-t-[3rem] mt-20 !max-w-full !px-6 md:!px-20 border-t border-[#CFC493]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 py-10">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-[#F0F5DF] mb-6">It works in your browser.</h2>
            <p className="text-[#F0F5DF]/80 mb-6 leading-relaxed">
              No downloads required. We process your webcam feed locally using TensorFlow.js. Your video never leaves your device—only the notification that you failed.
            </p>
            <ul className="space-y-4 text-[#CFC493]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#2FAF6A] rounded-full shadow-[0_0_8px_#2FAF6A]" />
                Local Processing (Privacy First)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#2FAF6A] rounded-full shadow-[0_0_8px_#2FAF6A]" />
                Instant Detection
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#2FAF6A] rounded-full shadow-[0_0_8px_#2FAF6A]" />
                Customizable Roast Intensity
              </li>
            </ul>
          </div>
          
          <div className="flex-1 relative order-1 md:order-2 flex justify-center">
             <div className="w-[300px] h-[600px] border-8 border-[#CFC493] rounded-[3rem] bg-[#0D0D0D] overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />
                <div className="w-full h-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    className="w-full h-full object-cover opacity-80"
                    alt="Mobile Interface"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="bg-[#0B3D2E]/90 backdrop-blur border border-[#CFC493] p-3 rounded-xl mb-4 self-center w-full text-center">
                      <p className="text-xs text-[#9AFFC8] font-bold uppercase mb-1">⚠️ Cogno Bot</p>
                      <p className="text-sm text-white font-bold">"Hey Bull, put the phone down or I leak your screen time."</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#051F17] border-t border-[#CFC493]/20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[#2FAF6A] rounded text-center text-white text-xs font-bold leading-6">C</div>
              <span className="text-[#F0F5DF] font-bold tracking-tight">Cogno</span>
            </div>
            <p className="text-[#F0F5DF]/60 text-sm">Stop failing. Start studying.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <Github className="text-[#F0F5DF]/60 hover:text-[#9AFFC8] cursor-pointer transition-colors" size={20} />
            <Twitter className="text-[#F0F5DF]/60 hover:text-[#9AFFC8] cursor-pointer transition-colors" size={20} />
            <Linkedin className="text-[#F0F5DF]/60 hover:text-[#9AFFC8] cursor-pointer transition-colors" size={20} />
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-[#F0F5DF]/10">
          <p className="text-[#F0F5DF]/40 text-sm">
            Made with 🤘 by <span className="text-[#9AFFC8]">Team Cogno</span> for the <span className="text-[#CFC493] font-bold">USF Bulls</span>
          </p>
        </div>
      </footer>
    </div>
  );
}