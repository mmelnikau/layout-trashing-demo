import {createStar, createStarAndRemove, showHiddenStar} from "../src/shared/createStart.js";

const starsContainer = document.getElementById('stars')

/* --- Initial --- */

setInterval(() => createStarAndRemove(starsContainer), 150)

/* --- With layout trashing --- */

/*
function createStarWithLayoutTrashing(container) {
    const star = createStarAndRemove(container)
    const rect = star.getBoundingClientRect()
    star.style.left = `${rect.left + 1}px`
}
setInterval(() => createStarWithLayoutTrashing(starsContainer), 150)
 */

/* --- Create many at once --- */

/*
function createManyAtOnce(container) {
    for (let i = 0; i < 5; i++) {
        createStarWithPool();
        createStarAndRemove(container)
        // with layout trashing
        // const star = createStarAndRemove(container)
        // const rect = star.getBoundingClientRect()
        // star.style.left = `${rect.left + 1}px`
    }
}
setInterval(() => createManyAtOnce(starsContainer), 15)
 */

/* --- Fix with pooling --- */

/*
const pool = [];
const MAX_STARS = 100;

function createStarWithPool(container) {
    if (pool.length < MAX_STARS) {
        const star = createStar(container)
        pool.push(star)
        return star;
    }
    const hiddenStar = pool.find(el => el.style.display === 'none')
    if (!hiddenStar) {
        return;
    }
    showHiddenStar(hiddenStar);
    return hiddenStar;
}

function createManyAtOnceFixed(container) {
    for (let i = 0; i < 10; i++) {
        createStarWithPool(container);
    }
}

setInterval(() => createManyAtOnceFixed(starsContainer), 15)
 */
