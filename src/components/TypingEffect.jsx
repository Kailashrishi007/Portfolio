import React, { useEffect, useState } from 'react'

export default function TypingEffect({ texts = [], speed = 80 }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)

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

  return <span style={{whiteSpace:'pre'}}>{display}</span>
}
