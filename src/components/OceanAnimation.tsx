'use client'

import { useEffect, useRef } from 'react'

interface Bubble {
  x: number; y: number; radius: number; speed: number
  drift: number; driftSpeed: number; driftOffset: number; opacity: number
}
interface LightBeam {
  x: number; width: number; angle: number; opacity: number
  opacitySpeed: number; opacityMin: number; opacityMax: number
}

export default function OceanAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationId: number
    let bubbles: Bubble[] = []
    let beams: LightBeam[] = []
    let time = 0
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; initScene() }
    const initScene = () => {
      const w = canvas.width, h = canvas.height
      beams = []
      for (let i = 0; i < 7; i++) {
        beams.push({ x: (w/7)*i + Math.random()*(w/7), width: 60+Math.random()*120,
          angle: -0.25+Math.random()*0.5, opacity: 0,
          opacitySpeed: 0.003+Math.random()*0.003, opacityMin: 0.02+Math.random()*0.03, opacityMax: 0.06+Math.random()*0.06 })
      }
      bubbles = []
      for (let i = 0; i < 80; i++) bubbles.push(makeBubble(w, h, true))
    }
    const makeBubble = (w: number, h: number, rnd = false): Bubble => ({
      x: Math.random()*w, y: rnd ? Math.random()*h : h+10,
      radius: 0.8+Math.random()*3, speed: 0.2+Math.random()*0.5,
      drift: 0, driftSpeed: 0.003+Math.random()*0.005,
      driftOffset: Math.random()*Math.PI*2, opacity: 0.06+Math.random()*0.18
    })
    const drawBeam = (b: LightBeam) => {
      const h = canvas.height; ctx.save(); ctx.translate(b.x, 0)
      const g = ctx.createLinearGradient(0,0,Math.sin(b.angle)*h,h)
      g.addColorStop(0,`rgba(126,206,206,${b.opacity})`)
      g.addColorStop(0.4,`rgba(126,206,206,${b.opacity*0.5})`)
      g.addColorStop(1,'rgba(26,128,128,0)')
      const hw=b.width/2, ox=Math.sin(b.angle)*h
      ctx.beginPath(); ctx.moveTo(-hw,0); ctx.lineTo(hw,0)
      ctx.lineTo(hw+ox+hw*0.5,h); ctx.lineTo(-hw+ox-hw*0.5,h)
      ctx.closePath(); ctx.fillStyle=g; ctx.fill(); ctx.restore()
    }
    const drawBubble = (b: Bubble) => {
      ctx.beginPath(); ctx.arc(b.x,b.y,b.radius,0,Math.PI*2)
      ctx.fillStyle=`rgba(126,206,206,${b.opacity*0.6})`; ctx.fill()
      ctx.beginPath(); ctx.arc(b.x-b.radius*0.3,b.y-b.radius*0.3,b.radius*0.4,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,240,240,${b.opacity})`; ctx.fill()
    }
    const drawCaustics = () => {
      const w=canvas.width; ctx.save()
      for(let i=0;i<5;i++){
        const x=(w/5)*i+Math.sin(time*0.4+i*1.2)*30, y=20+Math.sin(time*0.6+i*0.8)*10, r=40+Math.sin(time*0.5+i)*15
        const g=ctx.createRadialGradient(x,y,0,x,y,r)
        g.addColorStop(0,'rgba(126,206,206,0.07)'); g.addColorStop(1,'rgba(126,206,206,0)')
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
      }
      ctx.restore()
    }
    const drawVignette = () => {
      const w=canvas.width, h=canvas.height
      const v=ctx.createRadialGradient(w/2,h*0.3,h*0.1,w/2,h/2,w*0.8)
      v.addColorStop(0,'rgba(13,48,64,0)'); v.addColorStop(1,'rgba(10,30,40,0.55)')
      ctx.fillStyle=v; ctx.fillRect(0,0,w,h)
      const bv=ctx.createLinearGradient(0,h*0.5,0,h)
      bv.addColorStop(0,'rgba(13,40,55,0)'); bv.addColorStop(1,'rgba(8,25,35,0.75)')
      ctx.fillStyle=bv; ctx.fillRect(0,0,w,h)
    }
    const render = () => {
      const w=canvas.width, h=canvas.height; time+=0.016; ctx.clearRect(0,0,w,h)
      for(const b of beams){
        b.opacity+=b.opacitySpeed
        if(b.opacity>b.opacityMax||b.opacity<b.opacityMin) b.opacitySpeed*=-1
        b.x+=Math.sin(time*0.1+beams.indexOf(b))*0.15
        if(b.x<-b.width) b.x=w+b.width; if(b.x>w+b.width) b.x=-b.width
        drawBeam(b)
      }
      drawCaustics()
      for(let i=0;i<bubbles.length;i++){
        const b=bubbles[i]; b.y-=b.speed; b.x+=Math.sin(time*b.driftSpeed+b.driftOffset)*0.4
        if(b.y<-10) bubbles[i]=makeBubble(w,h,false); else drawBubble(b)
      }
      drawVignette(); animationId=requestAnimationFrame(render)
    }
    resize(); render()
    const ro=new ResizeObserver(resize); ro.observe(canvas)
    return () => { cancelAnimationFrame(animationId); ro.disconnect() }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{opacity:0.85}} aria-hidden="true" />
}
