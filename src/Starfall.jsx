import { useEffect, useRef } from 'react'

const colors = [
    'white',
    'silver',
    'blue',
    'pink',
    'green',
    'yellow',
    'orange',
    'purple',
]

export default function Starfall() {
    const starsRef = useRef(null)

    useEffect(() => {
        let timeoutId

        function createStar() {
            const container = starsRef.current
            if (!container) return

            const star = document.createElement('span')

            const top = Math.random() * window.innerHeight
            star.style.top = `${top - 300}px`
            if (top > window.innerHeight * 0.7) {
                star.style.left =
                    `${window.innerWidth * 0.8 + Math.random() * window.innerWidth * 0.2}px`
            } else {
                star.style.left = `${Math.random() * window.innerWidth}px`
            }

            const duration = 2 + Math.random() * 3
            star.style.animationDuration = `${duration}s`

            const color = colors[Math.floor(Math.random() * colors.length)]
            star.classList.add(color)

            container.appendChild(star)

            star.addEventListener('animationend', () => {
                star.remove()
            })
        }

        function loop() {
            createStar()

            const next = 80 + Math.random() * 220
            timeoutId = setTimeout(loop, next)
        }

        loop()

        return () => {
            clearTimeout(timeoutId)

            if (starsRef.current) {
                starsRef.current.innerHTML = ''
            }
        }
    }, [])

    return (
        <div className="space-container">
            <section ref={starsRef} />
        </div>
    )
}