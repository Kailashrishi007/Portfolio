import React from 'react'
import { playClick } from '../lib/soundManager'

export default function Button({ children, onClick, className = '', ariaLabel, type = 'button' }) {
  function handleClick(e) {
    try { playClick() } catch (e) {}
    if (typeof onClick === 'function') onClick(e)
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={
        `inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-transform will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/60 shadow-sm bg-gradient-to-r from-purple-600 to-indigo-500 hover:scale-105 active:scale-95 text-white ${className}`
      }
    >
      {children}
    </button>
  )
}
