import React, { useEffect, useState } from 'react'
import clickSfx from '../assets/click2.mp3'
import bgMusic from '../assets/music.mp3'
import musicalNote from '../assets/musical-note.png'
import { initSoundManager, toggleMusic, isMusicPlaying, playClick } from '../lib/soundManager'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const repoUrl = 'https://github.com/Kailashrishi007/Portfolio'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [musicOn, setMusicOn] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    // initialize audio manager
    try { initSoundManager(clickSfx, bgMusic) } catch (e) {}
    try { setMusicOn(isMusicPlaying()) } catch (e) {}

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-shadow backdrop-blur-sm ${
        scrolled ? 'bg-white/60 dark:bg-neutral-900/60 shadow-md' : 'bg-transparent dark:bg-transparent'
      } border-b border-transparent`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">KG</div>
          <span className="hidden sm:inline text-gray-900 dark:text-white font-semibold">Kailash Ganeshkumar</span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-gray-700 dark:text-gray-200 hover:opacity-90 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent/40"
            aria-label="View source code by Kailash Ganeshkumar on GitHub"
          >
            See How It’s Built
          </a>
          <button
            aria-label="Toggle music"
            onClick={() => { playClick(); const playing = toggleMusic(); setMusicOn(playing) }}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform shadow-sm flex items-center justify-center"
          >
            <img src={musicalNote} alt="music" className={`h-4 w-4 ${musicOn ? 'opacity-100 animate-pulse' : 'opacity-85'}`} />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle music"
            onClick={() => { playClick(); const playing = toggleMusic(); setMusicOn(playing) }}
            className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform shadow-sm flex items-center justify-center"
          >
            <img src={musicalNote} alt="music" className={`h-4 w-4 ${musicOn ? 'opacity-100 animate-pulse' : 'opacity-85'}`} />
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-3">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium"
            >
              View code
            </a>

            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
