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
        <p className="text-gray-700 dark:text-gray-300 mb-6 reveal-on-scroll reveal-fade">You can download my CV or reach out on LinkedIn.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={resume}
            download
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/60 shadow-sm bg-gradient-to-r from-purple-600 to-indigo-500 hover:scale-105 active:scale-95 text-white"
            aria-label="Download CV"
          >
            Download CV
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=kailashrishi777@gmail.com&su=Thanks%20for%20checking%20out%20my%20profile!%20Let's%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-100"
            aria-label="Compose email to Kailash via Gmail"
          >
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/kailashganeshkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-on-scroll reveal-scale inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-100"
            aria-label="Open LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </section>
  )
}
