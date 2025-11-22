import React from 'react';
import './App.css';
import { 
  Smartphone, MessageSquare, BookOpen, Upload, 
  Eye, Flame, Users, Zap, FileJson, 
  Github, Twitter, Linkedin 
} from 'lucide-react';

// Helper for scrolling
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleLogin = () => {
  alert("Login Portal: Coming Soon for USF Students! 🤘");
};

// Reusable Dark Panel Card
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card fade-in">
    <div className="card-icon">
      <Icon size={28} strokeWidth={2} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Step Row for the Solution Section
const StepRow = ({ icon: Icon, title, description }) => (
  <div className="step-card fade-in">
    <div className="step-icon-box">
      <Icon size={28} />
    </div>
    <div className="step-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="app-container">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          <div className="logo-icon">C</div>
          <span>Cogno</span>
        </div>

        <div className="nav-links">
          <button onClick={() => scrollToSection('problem')}>Problem</button>
          <button onClick={() => scrollToSection('solution')}>Solution</button>
          <button onClick={() => scrollToSection('features')}>Features</button>
        </div>

        <button className="btn-nav" onClick={handleLogin}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero container fade-in">
        <h1>Cogno</h1>
        <h2>
          The study app that <span className="highlight">bullies</span> you into passing.
        </h2>
        <p>
          We use AI to detect when you pick up your phone and publicly shame you in front of your friends. Stop scrolling, start studying.
        </p>
        
        <button className="btn-primary" onClick={() => scrollToSection('solution')}>
          Start Now
        </button>

        {/* Laptop Mockup */}
        <div className="mockup-container fade-in">
          <div className="mockup-frame">
             <div className="mockup-screen">
                <div className="mockup-bg"></div>
                <div className="alert-box">
                  <div style={{ color: '#2FAF6A', marginBottom: '1rem' }}>
                    <Eye size={48} />
                  </div>
                  <h3 style={{ color: '#F0F5DF', marginBottom: '0.5rem', fontSize: '1.5rem' }}>TARGET ACQUIRED</h3>
                  <p style={{ color: '#9AFFC8', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    Phone usage detected. Roast initiating...
                  </p>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section id="problem" className="section container">
        <h2>The System is Broken</h2>
        <p className="section-subtitle">Why you're failing (hint: it's not just the material).</p>
        
        <div className="grid-3">
          <FeatureCard 
            icon={BookOpen}
            title="Canvas is Boring"
            description="Discussion posts nobody reads and a UI from 2010. It's physically painful to stay engaged."
          />
          <FeatureCard 
            icon={MessageSquare}
            title="Discord is Chaos"
            description="Too many channels, too many memes. It's overwhelming when you just need to focus."
          />
          <FeatureCard 
            icon={Smartphone}
            title="Digital Distraction"
            description="You pick up your phone for 'one second' and suddenly it's 3 AM. You need an intervention."
          />
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="section container">
        <h2>The Cogno Loop</h2>
        <p className="section-subtitle" style={{ color: 'var(--main-ui)', fontWeight: 'bold' }}>
          Automation. Surveillance. Shame.
        </p>

        <div className="loop-container">
           <div className="loop-line"></div>
           <StepRow icon={Upload} title="1. Import" description="Upload your syllabus CSV. We parse it instantly." />
           <StepRow icon={Users} title="2. Commitment" description="Enter the Study Lounge. You are now locked in." />
           <StepRow icon={Eye} title="3. Surveillance" description="AI monitors your webcam for unauthorized phone usage." />
           <StepRow icon={Flame} title="4. Roast" description="Get caught? A humiliating message is sent to the chat." />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section container">
        <h2>Built for <span className="highlight">Academic Survival</span></h2>
        <p className="section-subtitle">Everything you need to survive the semester.</p>
        
        <div className="grid-2">
          <FeatureCard icon={Flame} title="Roast Room" description="Real-time object detection triggers merciless insults when you slack off." />
          <FeatureCard icon={Zap} title="Ephemeral Lounges" description="What happens in the lounge, stays there. All chat logs auto-delete after 24 hours." />
          <FeatureCard icon={FileJson} title="Syllabus Sync" description="Drag & drop your syllabus CSV. We map your semester into actionable tasks instantly." />
          <FeatureCard icon={Users} title="Streaks & Leaderboard" description="Compete with friends. See who has the lowest 'Roast Count' this week." />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div>
            <div className="logo" style={{ marginBottom: '0.5rem' }}>
              <div className="logo-icon" style={{ width: 24, height: 24 }}>C</div>
              <span>Cogno</span>
            </div>
            <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Stop failing. Start studying.</p>
          </div>
          
          <div className="social-icons">
            <Github size={24} />
            <Twitter size={24} />
            <Linkedin size={24} />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', opacity: 0.5 }}>
          Made with 🤘 by <span style={{ color: 'var(--neon)' }}>Team Cogno</span> for the <span style={{ color: 'var(--gold)' }}>USF Bulls</span>
        </div>
      </footer>

    </div>
  );
}