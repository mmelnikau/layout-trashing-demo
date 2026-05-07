const starsContainer = document.getElementById('stars')

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

function createStar() {
    const star = document.createElement('span')

    // position
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

    star.style.animationDelay = `0s`

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)]
    star.classList.add(randomColor)

    starsContainer.appendChild(star)

    setTimeout(() => {
        star.remove()
    }, duration * 1000)
}

setInterval(createStar, 150)