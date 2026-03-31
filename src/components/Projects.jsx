import React, { useEffect, useRef } from 'react'
import { projects } from '../data/data'
import Card from './Card'

export default function Projects(){
  const ref = useRef(null)
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=> {
        if(e.isIntersecting) e.target.classList.add('visible')
        else e.target.classList.remove('visible')
      })
    },{threshold:0.12})
    el.querySelectorAll('.project-card').forEach((n,i)=>{
      // stagger slightly
      n.style.transitionDelay = `${i * 60}ms`
      n.classList.add('reveal','reveal-fade')
      io.observe(n)
    })
    return ()=> io.disconnect()
  },[])

  return (
    <section id="projects" className="py-12" tabIndex={-1}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Projects</h2>
        <div className="carousel mt-4" ref={ref}>
          <div className="carousel-track flex gap-6 items-stretch py-4">
            {[...projects, ...projects].map((p, idx) => (
              <Card key={`${p.id}-${idx}`} className="w-72 flex-shrink-0 flex flex-col items-center text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">{p.tech.map(t=> <span className="text-xs bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded" key={t}>{t}</span>)}</div>
                <div className="mt-4 text-sm mt-auto">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
