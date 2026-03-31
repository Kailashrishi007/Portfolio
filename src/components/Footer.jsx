import React from 'react'

export default function Footer(){
  return (
    <footer className="py-8 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Kailash Ganeshkumar — Built with React and Gen AI</div>
      <div className="max-w-7xl mx-auto px-6 mt-4 text-center">
        <a
          href="https://github.com/Kailashrishi007/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="See how it's built on GitHub"
        >
          See how it's built
        </a>
      </div>
    </footer>
  )
}
