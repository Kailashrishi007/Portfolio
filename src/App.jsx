import React, { useEffect } from 'react'
import './styles/app.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { playClick } from './lib/soundManager'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  useEffect(() => {
    function handleClick(e) {
      try {
        const tag = e.target && e.target.tagName
        const editable = e.target && e.target.isContentEditable
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || editable) return
        playClick()
      } catch (e) {}
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="site-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
