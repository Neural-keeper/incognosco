import './style.css'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FilesetResolver, FaceLandmarker, type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

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
    <div>
      <h1>Focus Detector</h1>
      <div id="camera-wrap" style={{ position: 'fixed', bottom: 12, left: 12, zIndex: 1000 }}>
        <video
          ref={videoRef}
          id="mp-video"
          autoPlay
          playsInline
          muted
          style={{ maxWidth: 240, width: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: 6, display: 'block' }}
        />
        <div id="mp-status" style={{ marginTop: 6, fontFamily: 'monospace' }}>{status}</div>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('app')!)
root.render(<FocusApp />)
