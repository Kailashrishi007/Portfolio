import { useEffect } from 'react'

export default function useReveal(rootRef, opts = {}) {
  useEffect(() => {
    const root = rootRef && rootRef.current
    if (!root) return

    const selector = opts.selector || '.reveal-on-scroll'
    const threshold = typeof opts.threshold === 'number' ? opts.threshold : 0.12
    const rootMargin = opts.rootMargin || '0px 0px -8% 0px'

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target
        if (entry.isIntersecting) el.classList.add('visible')
        else if (!opts.once) el.classList.remove('visible')
      })
    }, { threshold, rootMargin })

    const nodes = root.querySelectorAll(selector)
    nodes.forEach((n) => {
      n.classList.add('reveal')
      io.observe(n)
    })

    return () => io.disconnect()
  }, [rootRef, opts.selector, opts.threshold, opts.rootMargin, opts.once])
}
