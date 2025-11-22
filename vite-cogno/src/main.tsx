import './App.css'
// import './style.css'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FilesetResolver, FaceLandmarker, type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

// @ts-ignore: runtime JSX modules (declaration provided in src/types)
import ChatRoom from './components/ChatRoom';
// @ts-ignore: runtime JSX modules (declaration provided in src/types)
import SyllabusImport from './components/SyllabusImport';

// Removed icon dependency (lucide-react) to keep this demo self-contained.

// Helper for scrolling
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleLogin = () => {
  alert("Login Portal: Coming Soon for USF Students! 🤘");
};

// Reusable Dark Panel Card (icon removed to avoid external dependency)
const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="card fade-in">
    <div className="card-icon">🔹</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Step Row for the Solution Section (icon removed)
const StepRow = ({ title, description }: { title: string; description: string }) => (
  <div className="step-card fade-in">
    <div className="step-icon-box">🔸</div>
    <div className="step-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

function FocusApp() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [status, setStatus] = useState('Loading FaceLandmarker...')

  const landmarkerRef = useRef<FaceLandmarker | null>(null)
  const detectingRef = useRef(false)
  const stoppedRef = useRef(false)
  const lastDistractedRef = useRef(false)
  const lastAlertTimeRef = useRef(0)
  const alertSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    alertSoundRef.current = new Audio('/alert.mp3')
    alertSoundRef.current.volume = 1.0

    async function init() {
      try {
        setStatus('Loading vision files...')

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )

        setStatus('Loading FaceLandmarker...')

        landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: '/face_landmarker.task'
          },
          runningMode: 'VIDEO',
          numFaces: 1
        })

        setStatus('Starting camera...')
        await startCamera()

      } catch (err: any) {
        console.error(err)
        setStatus('Init failed: ' + (err?.message ?? String(err)))
      }
    }

    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      })

      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      await videoRef.current.play()

      setStatus('Detecting...')
      requestAnimationFrame(loop)
    }

    function loop() {
      if (stoppedRef.current) return
      if (!landmarkerRef.current) return requestAnimationFrame(loop)

      if (!detectingRef.current) {
        detectingRef.current = true
        try {
          const result = landmarkerRef.current.detectForVideo(videoRef.current!, performance.now())
          handleResult(result)
        } catch (e) {
          // ignore
        }
        detectingRef.current = false
      }

      requestAnimationFrame(loop)
    }

    function handleResult(result: FaceLandmarkerResult | undefined) {
      const hasFace = !!result?.faceLandmarks?.length

      if (!hasFace) {
        setDistracted(true, 'No face detected')
        return
      }

      const landmarks = result!.faceLandmarks[0]

      const leftEye = landmarks[159]
      const rightEye = landmarks[386]
      const nose = landmarks[1]

      if (!leftEye || !rightEye || !nose) {
        setDistracted(true, 'Missing eye landmarks')
        return
      }

      const lookingDown = leftEye.y > nose.y + 0.03 && rightEye.y > nose.y + 0.03

      const leftSide = landmarks[33]
      const rightSide = landmarks[263]
      const faceWidth = Math.abs(rightSide.x - leftSide.x)
      const faceCenter = (rightSide.x + leftSide.x) / 2

      const headTurned = Math.abs(faceCenter - nose.x) > faceWidth * 0.12

      const distracted = lookingDown || headTurned

      if (distracted) {
        if (lookingDown) setDistracted(true, 'Looking down')
        else setDistracted(true, 'Head turned')
      } else {
        setDistracted(false, 'Focused')
      }
    }

    function setDistracted(isDistracted: boolean, message: string) {
      setStatus(message)

      if (isDistracted) {
        document.documentElement.style.background = 'rgba(255, 0, 0, 0.15)'

        const now = performance.now()
        if (!lastDistractedRef.current || now - lastAlertTimeRef.current > 3000) {
          alertSoundRef.current?.play().catch(() => {})
          lastAlertTimeRef.current = now
        }
      } else {
        document.documentElement.style.background = ''
      }

      lastDistractedRef.current = isDistracted
    }

    init()

    return () => {
      stoppedRef.current = true
      landmarkerRef.current?.close()
      const stream = videoRef.current?.srcObject as MediaStream | undefined
      stream?.getTracks?.().forEach(t => t.stop())
    }
  }, [])

  return (
    <div className="focus-card focus-root" style={{ height: '100%' }}>
      <h2 style={{ marginTop: 0 }}>Focus Detector</h2>
      <div id="camera-wrap" className="camera-wrap">
        <div className="content-placeholder">
          <video
            ref={videoRef}
            id="mp-video"
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </div>
        <div id="mp-status" className="mp-status">{status}</div>
      </div>
    </div>
  )
}

function ChatPage() {
  // PASTE YOUR REAL SUPABASE USER ID HERE
  const MY_ID = "krshnverma@usf.edu";

  return (
    <div className="min-h-screen p-8 space-y-8 container">
      <div style = {{height: '80px'}}>

      </div>
      <h1 style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--main-ui)' }}>COGNO</span>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>v1.0 // SURVEILLANCE ACTIVE</div>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <SyllabusImport userId={MY_ID} />
        </div>
        <div>
          <ChatRoom userId={MY_ID} courseId="COP2510" />
        </div>
      </div>
    </div>
  )
}

function ChatboxPlaceholder() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, text])
    setInput('')
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Chat</h2>

      <div style={{ flex: 1, marginTop: 12, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>No messages yet — be the first to say hi.</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} style={{ alignSelf: 'flex-start', background: '#f3f4f6', padding: '8px 12px', borderRadius: 8 }}>{m}</div>
          ))
        )}
      </div>

      <div className="chat-input-container" style={{ marginTop: 12 }}>
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
          placeholder="Type a message..."
        />
        <button className="chat-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

function HomePage(){
  return (
    <div className="app-container">
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
                  <div style={{ color: '#2FAF6A', marginBottom: '1rem', fontSize: 48 }}>
                    🔍
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
            title="Canvas is Boring"
            description="Discussion posts nobody reads and a UI from 2010. It's physically painful to stay engaged."
          />
          <FeatureCard 
            title="Discord is Chaos"
            description="Too many channels, too many memes. It's overwhelming when you just need to focus."
          />
          <FeatureCard 
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
           <StepRow title="1. Import" description="Upload your syllabus CSV. We parse it instantly." />
           <StepRow title="2. Commitment" description="Enter the Study Lounge. You are now locked in." />
           <StepRow title="3. Surveillance" description="AI monitors your webcam for unauthorized phone usage." />
           <StepRow title="4. Roast" description="Get caught? A humiliating message is sent to the chat." />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section container">
        <h2>Built for <span className="highlight">Academic Survival</span></h2>
        <p className="section-subtitle">Everything you need to survive the semester.</p>
        
        <div className="grid-2">
          <FeatureCard title="Roast Room" description="Real-time object detection triggers merciless insults when you slack off." />
          <FeatureCard title="Ephemeral Lounges" description="What happens in the lounge, stays there. All chat logs auto-delete after 24 hours." />
          <FeatureCard title="Syllabus Sync" description="Drag & drop your syllabus CSV. We map your semester into actionable tasks instantly." />
          <FeatureCard title="Streaks & Leaderboard" description="Compete with friends. See who has the lowest 'Roast Count' this week." />
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
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', opacity: 0.5 }}>
          Made with 🤘 by <span style={{ color: 'var(--neon)' }}>Team Cogno</span> for the <span style={{ color: 'var(--gold)' }}>USF Bulls</span>
        </div>
      </footer>

    </div>
  )
}

function FocusPage(){
  return (
    <div className="page-container">
      <div className="left-panel">
        <FocusApp />
      </div>
      <div className="right-panel">
        <ChatboxPlaceholder />
      </div>
    </div>
  )
}

function App(){
  const [page, setPage] = useState<'home'|'focus'|'chat'>('home')
  return (
    <div>
      <nav className="navbar">
        <div className="logo" onClick={() => setPage('home')}>
          <div className="logo-icon">C</div>
          <span>Cogno</span>
        </div>

        <div className="nav-links">
          <button className={page==='home'? 'active':''} onClick={() => setPage('home')}>Home</button>
          <button className={page==='focus'? 'active':''} onClick={() => setPage('focus')}>Focus</button>
          <button className={page==='chat'? 'active':''} onClick={() => setPage('chat')}>Chat</button>
        </div>

        <button className="btn-nav" onClick={handleLogin}>Get Started</button>
      </nav>

      {page === 'home' ? <HomePage /> : page === 'focus' ? <FocusPage /> : <ChatPage />}
    </div>
  )
}


const root = createRoot(document.getElementById('app')!)
root.render(<App />)
