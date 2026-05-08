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


export function createStarAndRemove(starsContainer) {
    const star = document.createElement('span')
    const duration = applyStyles(star);
    starsContainer.appendChild(star);
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
    return star;
}

export function createStar(starsContainer) {
    const star = document.createElement('span')
    const duration = applyStyles(star);
    starsContainer.appendChild(star);
    setTimeout(() => {
        star.style.display = 'none';
    }, duration * 1000);
    return star;
}

export function showHiddenStar(star) {
    const duration = applyStyles(star);
    star.style.display = 'block';
    setTimeout(() => {
        star.style.display = 'none';
    }, duration * 1000);
}

function randomCenterBiased() {
    return Math.min(
        1,
        Math.max(
            0,
            0.7 + (Math.random() - Math.random()) * 0.95
        )
    )
}

function applyStyles(star) {
    const width = window.innerWidth
    const height = window.innerHeight
    const spawnPadding = 300
    const fromRight = Math.random() < 0.5
    if (fromRight) {
        star.style.left = `${width + Math.random() * spawnPadding}px`
        star.style.top = `${randomCenterBiased() * height}px`
        // star.style.top = `${Math.random() * height}px`
    } else {
        // star.style.left = `${Math.random() * width}px`
        star.style.left = `${randomCenterBiased() * width}px`
        star.style.top = `${-spawnPadding + Math.random() * spawnPadding}px`
    }
    const duration = 2 + Math.random() * 3
    star.style.animationDuration = `${duration}s`
    star.className = colors[Math.floor(Math.random() * colors.length)]
    return duration;
}