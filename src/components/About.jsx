import React, { useRef, useState, useEffect } from 'react'
import { skills } from '../data/data'
import useReveal from '../hooks/useReveal'

export default function About() {
  const ref = useRef(null)
  useReveal(ref, { selector: '.reveal-on-scroll', threshold: 0.12 })

  return (
    <section id="about" className="py-12" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-1 gap-8 items-start">
        <div className="space-y-3 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white reveal-on-scroll reveal-left">About</h2>

          <div className="mt-4 reveal-on-scroll reveal-fade">
            <div className="bg-neutral-900/95 border border-neutral-800 rounded-lg overflow-hidden shadow-lg font-mono text-sm text-green-300 w-full">
              <div className="flex items-center gap-3 px-3 py-2 bg-neutral-800/60">
                <span className="w-3 h-3 bg-red-500 rounded-full" aria-hidden />
                <span className="w-3 h-3 bg-yellow-400 rounded-full" aria-hidden />
                <span className="w-3 h-3 bg-green-500 rounded-full" aria-hidden />
                <span className="ml-auto text-xs text-neutral-400">rishi@Kailashs-MacBook-Air portfolio %</span>
              </div>
              <TerminalBox skills={skills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalBox({ skills }) {
  const [lines, setLines] = useState([
    { t: 'cmd', text: 'rishi@Kailashs-MacBook-Air portfolio % npm run dev' },
    { t: 'out', text: '> portfolio@0.0.0 dev\n> vite' },
    { t: 'out', text: 'Port 5173 is in use, trying another one...' },
    { t: 'out', text: '' },
    { t: 'out', text: '  VITE v8.0.3  ready in 380 ms' },
    { t: 'out', text: "\n  ➜  Local:   http://localhost:5174/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help" },
    { t: 'info', text: 'Interactive terminal. Type `help` for commands.' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIndex, setHistIndex] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    // focus cursor when component mounts
    inputRef.current?.focus()
  }, [])

  function pushLine(obj) {
    setLines((l) => [...l, obj])
  }

  function handleCommand(raw) {
    const cmd = raw.trim()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHistIndex(-1)
    pushLine({ t: 'cmd', text: `➜ ${cmd}` })

    const norm = cmd.toLowerCase()
    if (norm === 'clear') {
      setLines([])
      return
    }
    if (norm === 'help' || norm === 'ls') {
      pushLine({ t: 'out', text: 'Available: whoami, showskills, needresume, clear, help' })
      return
    }

    // accept both 'cd whoami' and 'whoami' etc.
    const parts = norm.split(/\s+/)
    const key = parts.length > 1 && parts[0] === 'cd' ? parts[1] : parts[0]

    if (key === 'whoami' || key === 'whoaimi') {
      pushLine({ t: 'out', text: 'Kailash Ganeshkumar' })
      return
    }

    if (key === 'showskills' || key === 'skills') {
      pushLine({ t: 'out', text: skills.join(', ') })
      return
    }

    if (key === 'needresume' || key === 'resume' || key === 'getresume') {
      pushLine({ t: 'out', text: 'Generating resume and starting download...' })
      triggerDownload()
      return
    }

    pushLine({ t: 'err', text: `Command not found: ${cmd}` })
  }

  function triggerDownload() {
    try {
      const content = `Name: Kailash Ganeshkumar\n\nSkills:\n${skills.join('\n')}\n\nContact: kailash@example.com\n`;
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Kailash_Ganeshkumar_resume.txt'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      pushLine({ t: 'out', text: 'Download started.' })
    } catch (e) {
      pushLine({ t: 'err', text: 'Failed to start download.' })
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const idx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length === 0) return
      if (histIndex === -1) return
      const idx = histIndex + 1
      if (idx >= history.length) {
        setHistIndex(-1)
        setInput('')
      } else {
        setHistIndex(idx)
        setInput(history[idx])
      }
    }
  }

  return (
    <div className="p-4">
      <div className="min-h-40 max-h-96 overflow-auto pr-2" onClick={() => inputRef.current?.focus()}>
        {lines.map((ln, i) => (
          <div key={i} className={`whitespace-pre-wrap ${ln.t === 'cmd' ? 'text-white' : ln.t === 'err' ? 'text-red-400' : 'text-green-300'}`}>
            {ln.text}
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-neutral-800 pt-3">
        <label className="sr-only">Terminal input</label>
        <div className="flex items-center gap-3">
          <div className="text-neutral-400">➜</div>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command (help)"
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none text-green-200 placeholder:text-neutral-500"
          />
          <button onClick={() => { handleCommand(input); setInput('') }} className="text-xs px-2 py-1 bg-neutral-800/40 rounded text-neutral-300">Run</button>
        </div>
      </div>
    </div>
  )
}
