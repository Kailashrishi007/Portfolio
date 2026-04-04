import React, { useRef, useState, useEffect } from 'react'
import { experience, skills as allSkills } from '../data/data'
import useReveal from '../hooks/useReveal'
import ltiLogo from '../assets/LTI.png'
import annaLogo from '../assets/anna.png'
import sjitLogo from '../assets/sjit.webp'
import googleLogo from '../assets/google.png'
import nvidiaLogo from '../assets/nvidia.png'
import hackerRankLogo from '../assets/hackerank.png'

export default function Experience(){
  const ref = useRef(null)
  useReveal(ref, { selector: '.reveal-on-scroll', threshold: 0.12 })

  return (
    <section id="experience" className="py-12" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 text-left">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 reveal-on-scroll reveal-left">Experience & Education</h2>
        <div className="space-y-6">
          {experience.map(item => (
            <div key={item.id} className="p-4 border border-gray-100 dark:border-neutral-700 rounded-lg bg-transparent dark:bg-neutral-900/10 reveal-on-scroll reveal-fade interactive-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    // robust matching for organization logos (handle small text variations)
                    const org = String(item.org || '').toLowerCase()
                    let logo = null
                    if (org.includes('lti')) logo = ltiLogo
                    else if (org.includes('joseph') || org.includes('sjit') || org.includes('st joseph')) logo = sjitLogo
                    else if (org.includes('college') || org.includes('anna')) logo = annaLogo
                    return logo ? <img src={logo} alt={item.org} className="w-10 h-10 object-contain rounded-md" /> : null
                  })()}
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h4>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.period}</div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.org}</div>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Skill graph */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 reveal-on-scroll reveal-left">Skill Levels</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Interactive skill bars animate when scrolled into view.</p>
              <SkillGraph />
            </div>
            <div className="md:items-stretch">
              <div className="p-4 rounded-lg border border-gray-100 dark:border-neutral-700 bg-transparent dark:bg-neutral-900/10 h-full flex flex-col justify-between w-full">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Certifications</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-white/30 dark:bg-neutral-800/60 rounded-md border interactive-card flex items-center gap-3">
                    <img src={googleLogo} alt="Google" className="w-10 h-10 object-contain rounded-md" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Google Associate Cloud Engineer</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Issued: 2025</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/30 dark:bg-neutral-800/60 rounded-md border interactive-card flex items-center gap-3">
                    <img src={nvidiaLogo} alt="NVIDIA" className="w-10 h-10 object-contain rounded-md" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">NVIDIA Networking</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Issued: 2024</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/30 dark:bg-neutral-800/60 rounded-md border interactive-card flex items-center gap-3">
                    <img src={hackerRankLogo} alt="HackerRank" className="w-10 h-10 object-contain rounded-md mb-2" />
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Hacker Rank - Java</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Issued: 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillGraph() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else {
          // reset when out of view so animation runs again when re-entered
          setVisible(false)
          setCurrent(skillLevels.map(() => 0))
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const skillLevels = [
    { name: 'React', pct: 92 },
    { name: 'JavaScript', pct: 88 },
    { name: 'Spring Boot', pct: 75 },
    { name: 'Java', pct: 72 },
    // { name: 'AWS', pct: 65 },
    { name: 'MySQL', pct: 68 },
  ]

  const [current, setCurrent] = useState(skillLevels.map(() => 0))

  useEffect(() => {
    if (!visible) return
    const DURATION = 900
    const start = performance.now()
    let rafId = null

    function tick(now) {
      const t = Math.min(1, (now - start) / DURATION)
      setCurrent(skillLevels.map((s, i) => Math.round(s.pct * easeOutCubic(t))))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [visible])

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  return (
    <div ref={ref} className="space-y-3">
      {skillLevels.map((s, idx) => (
        <div key={s.name} className="skill-row">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{current[idx]}%</span>
          </div>
          <div className="skill-bar bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden h-3">
            <div
              className="skill-fill h-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500"
              style={{ width: `${current[idx]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
