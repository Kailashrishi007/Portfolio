import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <article
      role="article"
      className={`project-card reveal interactive-card group rounded-2xl p-6 bg-transparent dark:bg-neutral-900/10 shadow-sm hover:shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-105 active:scale-95 focus-within:ring-2 focus-within:ring-accent/40 ${className}`}
      tabIndex={0}
    >
      {children}
    </article>
  )
}
