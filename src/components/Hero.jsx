import React, { useRef } from 'react'
import TypingEffect from './TypingEffect'
import profile from '../assets/heromain.png'
import { skills } from '../data/data'
import Button from './Button'
import useReveal from '../hooks/useReveal'

export default function hero() {
  const ref = useRef(null)
  useReveal(ref, { selector: '.reveal-on-scroll', threshold: 0.08, once: true })

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20"
      aria-label="hero section"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50/30 via-white/10 to-white/0 dark:from-neutral-900/60 dark:via-neutral-900/50 parallax-bg" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight reveal-on-scroll reveal-left">Kailash Ganeshkumar</h1>
          <div className="mt-3 text-lg text-gray-600 dark:text-gray-300 flex items-center gap-3 reveal-on-scroll reveal-fade">
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" aria-hidden />
            <TypingEffect texts={["Music Producer", "React Developer", "Spring Boot Developer"]} />
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-xl reveal-on-scroll reveal-fade">I design and build modern, accessible web products with performance and polish in mind.</p>
          <div className="mt-4 reveal-on-scroll reveal-fade">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Core skills:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.slice(0,8).map((s) => (
                <span key={s} className="inline-block bg-gray-100 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-200 reveal-on-scroll reveal-scale">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 reveal-on-scroll reveal-scale">
            <Button ariaLabel="View projects" className="">View Projects</Button>
            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              Contact
            </a>
          </div>
        </div>

        <aside className="w-56 md:w-72 flex-shrink-0 reveal-on-scroll reveal-scale">
          <div className="rounded-2xl overflow-hidden bg-white/60 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700 shadow-lg backdrop-blur-md p-1">
            <img src={profile} alt="Profile" className="rounded-xl w-full h-auto object-cover block" />
          </div>
        </aside>
      </div>
    </section>
  )
}
