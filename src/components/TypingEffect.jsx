import React, { useEffect, useState } from 'react'

export default function TypingEffect({ texts = [], speed = 80 }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)

  // calculate longest text length to reserve space and avoid layout shift
  const maxLen = texts && texts.length ? Math.max(...texts.map((t) => String(t).length)) : 0

  useEffect(() => {
    if (!texts.length) return
    const timeout = setTimeout(() => {
      if (subIndex === texts[index].length) {
        setTimeout(() => {
          setSubIndex(0)
          setIndex((i) => (i + 1) % texts.length)
        }, 900)
      } else {
        setSubIndex((s) => s + 1)
      }
    }, speed)

    setDisplay(texts[index].slice(0, subIndex))
    return () => clearTimeout(timeout)
  }, [subIndex, index, texts, speed])

  return (
    <span style={{ display: 'inline-block', position: 'relative', verticalAlign: 'middle' }} aria-hidden>
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}>{' '.repeat(maxLen)}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>{display}</span>
    </span>
  )
}
