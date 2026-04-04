import React, { useEffect, useRef, useState } from 'react'
import { projects } from '../data/data'
import Card from './Card'

export default function Projects(){
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const len = projects.length

  useEffect(()=>{
    const el = rootRef.current
    if(!el) return
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=> {
        if(e.isIntersecting) e.target.classList.add('visible')
        else e.target.classList.remove('visible')
      })
    },{threshold:0.12})
    el.querySelectorAll('.project-card').forEach((n,i)=>{
      n.style.transitionDelay = `${i * 60}ms`
      n.classList.add('reveal','reveal-fade')
      io.observe(n)
    })
    return ()=> io.disconnect()
  },[])

  function prev(){
    setIndex((s)=> (s - 1 + len) % len)
  }
  function next(){
    setIndex((s)=> (s + 1) % len)
  }

  // keep DOM focus in view when index changes (optional)
  useEffect(()=>{
    const track = trackRef.current
    if(!track) return
    // transform handled via style on track
  },[index])

  return (
    <section id="projects" className="py-12" tabIndex={-1}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Projects</h2>
        <div className="carousel mt-4 relative" ref={rootRef}>
          <button aria-label="Previous project" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md">
            ‹
          </button>
          <button aria-label="Next project" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md">
            ›
          </button>

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex transition-transform duration-500" style={{transform:`translateX(-${index * 100}%)`}}>
              {projects.map((p, idx) => (
                  <div key={p.id} className="project-card min-w-full flex-shrink-0 px-4">
                  <Card className="w-full flex flex-col items-center text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{p.title}</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2 justify-center">{p.tech.map(t=> <span className="text-xs bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded" key={t}>{t}</span>)}</div>
                    <div className="mt-4 text-sm mt-auto">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
