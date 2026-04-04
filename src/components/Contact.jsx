import React, { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import resume from '../assets/Kailash Ganeshkumar Resume.pdf'

export default function Contact(){
  const ref = useRef(null)
  useReveal(ref, { selector: '.reveal-on-scroll', threshold: 0.12 })

  return (
    <section id="contact" ref={ref} className="py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 reveal-on-scroll reveal-left">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 reveal-on-scroll reveal-fade">Let’s connect — download my CV or reach out on LinkedIn. 🚀</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={resume}
            download
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/60 shadow-sm bg-gradient-to-r from-purple-600 to-indigo-500 hover:scale-105 active:scale-95 text-white"
            aria-label="Download CV"
          >
            Get My Resume
          </a>
          <a
            href="mailto:kailashrishi777@gmail.com?subject=Thanks%20for%20checking%20out%20my%20profile!"
            onClick={(e) => {
              // Try to open Gmail app first (deep link). Fallback to the mailto: link if app isn't available.
              try {
                const gmailUrl = `googlegmail://co?to=kailashrishi777@gmail.com&subject=${encodeURIComponent("Thanks for checking out my profile!")}`
                // attempt to open Gmail app
                window.location.href = gmailUrl
                // fallback after short delay to mailto if app not installed
                setTimeout(() => {
                  window.location.href = 'mailto:kailashrishi777@gmail.com?subject=' + encodeURIComponent("Thanks for checking out my profile!")
                }, 700)
                e.preventDefault()
              } catch (err) {
                // noop, let the href mailto work
              }
            }}
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition transform shadow-sm bg-emerald-500 hover:bg-emerald-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label="Compose email to Kailash via Gmail"
          >
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/kailashganeshkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition transform shadow-sm bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Open LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </section>
  )
}
