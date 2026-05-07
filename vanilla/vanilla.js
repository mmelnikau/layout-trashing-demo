const starsContainer = document.getElementById('stars')

const STARS_COUNT = 40

const colors = [
    'white',
    'silver',
    'blue',
    'pink',
    'green',
    'yellow',
    'orange',
    'purple'
]

for (let i = 0; i < STARS_COUNT; i++) {
    const star = document.createElement('span')

    // position
    // star.style.top = `${Math.random() * window.innerHeight}px`
    // star.style.left = `${Math.random() * window.innerWidth}px`

    const top = Math.random() * window.innerHeight
    star.style.top = `${top}px`
    if (top > window.innerHeight * 0.7) {
        star.style.left =
            `${window.innerWidth * 0.8 + Math.random() * window.innerWidth * 0.2}px`
    } else {
        star.style.left = `${Math.random() * window.innerWidth}px`
    }

    star.style.animationDuration = `${1 + Math.random() * 3}s`
    star.style.animationDelay = `${Math.random() * 5}s`

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)]
    star.classList.add(randomColor)

    starsContainer.appendChild(star)
}