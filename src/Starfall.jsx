import { useEffect, useRef } from 'react'
import {createStart} from "./shared/createStart.js";

export default function Starfall() {
    const starsRef = useRef(null)

    useEffect(() => {
        let timeoutId

        function _createStar() {
            const container = starsRef.current
            if (!container) {
                return
            }
            createStart(container);
        }

        function loop() {
            _createStar()
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