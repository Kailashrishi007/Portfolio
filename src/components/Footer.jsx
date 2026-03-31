import React from 'react'

export default function Footer(){
  return (
    <footer className="py-8 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Kailash Ganeshkumar — Built with React and Gen AI</div>
    </footer>
  )
}
