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
            <div className="bg-neutral-900/95 border border-neutral-800 rounded-lg overflow-hidden shadow-lg font-mono text-sm text-green-300 w-full text-left">
              <div className="flex items-center gap-3 px-3 py-2 bg-neutral-800/60">
                <span className="w-3 h-3 bg-red-500 rounded-full" aria-hidden />
                <span className="w-3 h-3 bg-yellow-400 rounded-full" aria-hidden />
                <span className="w-3 h-3 bg-green-500 rounded-full" aria-hidden />
                <span className="ml-auto text-xs text-neutral-400">terminal@Kailashs-MacBook-Air portfolio %</span>
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
  const initialLines = [
    { t: 'cmd', text: 'terminal@Kailashs-MacBook-Air portfolio % npm run dev' },
    { t: 'out', text: '> portfolio@0.0.0 dev\n> vite' },
    { t: 'out', text: 'Port 5173 is in use, trying another one...' },
    { t: 'out', text: '' },
    { t: 'out', text: '  VITE v8.0.3  ready in 380 ms' },
    { t: 'out', text: "\n  ➜  Local:   http://localhost:5174/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help" },
    { t: 'info', text: 'Interactive terminal. Type `help` for commands.' },
  ]

  const [lines, setLines] = useState(initialLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIndex, setHistIndex] = useState(-1)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const userScrolledRef = useRef(false)

  // don't autofocus on mount (prevents the page from jumping to About)

  function pushLine(obj) {
    setLines((l) => [...l, obj])
  }

  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms))
  }

  async function typeOut(text, type = 'out', wordDelay = 80) {
    const words = String(text).split(' ')
    setLines((l) => [...l, { t: type, text: '' }])
    for (let i = 0; i < words.length; i++) {
      await sleep(wordDelay)
      setLines((prev) => {
        const copy = [...prev]
        const lastIdx = copy.length - 1
        const last = copy[lastIdx] || { t: type, text: '' }
        copy[lastIdx] = { ...last, text: (last.text ? last.text + ' ' : '') + words[i] }
        return copy
      })
    }
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // if user hasn't scrolled up manually, auto-scroll to bottom
    if (!userScrolledRef.current) {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      } catch (e) {
        el.scrollTop = el.scrollHeight
      }
    }
  }, [lines])

  function handleCommand(raw) {
    const cmd = raw.trim()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHistIndex(-1)
    pushLine({ t: 'cmd', text: `➜ ${cmd}` })

    const norm = cmd.toLowerCase()
    if (norm === 'clear') {
      // reset to the original predefined lines only (preserve the initial header/info)
      setLines(initialLines.slice())
      return
    }
    if (norm === 'help' || norm === 'ls') {
      typeOut('Available: whoareyou, showskills, needresume, clear, help', 'out')
      return
    }

    // accept both 'cd whoami' and 'whoami' etc.
    const parts = norm.split(/\s+/)
    const key = parts.length > 1 && parts[0] === 'cd' ? parts[1] : parts[0]

    if (key === 'whoareyou' || key === 'whoareu') {
      typeOut('Kailash Ganeshkumar', 'out')
      return
    }

    if (key === 'showskills' || key === 'skills') {
      typeOut(skills.join(', '), 'out', 50)
      return
    }

    if (key === 'needresume' || key === 'resume' || key === 'getresume') {
      typeOut('Generating resume and starting download...', 'out')
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
      typeOut('Download started.', 'out')
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
          <div className="p-4 text-left">
        <div
          ref={containerRef}
          className="min-h-40 max-h-96 overflow-auto pr-2 text-left"
          onClick={() => inputRef.current?.focus()}
          onScroll={() => {
            const el = containerRef.current
            if (!el) return
            const atBottom = el.scrollHeight - (el.scrollTop + el.clientHeight) < 20
            userScrolledRef.current = !atBottom
          }}
        >
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
            placeholder="type the command (help)"
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none text-green-200 placeholder:text-neutral-500 text-left"
          />
          <button onClick={() => { handleCommand(input); setInput('') }} className="text-xs px-2 py-1 bg-neutral-800/40 rounded text-neutral-300">Run</button>
        </div>
      </div>
    </div>
  )
}
