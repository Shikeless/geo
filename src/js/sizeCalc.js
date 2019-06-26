function sizeCalc(x, y, pop) {
    if (x + pop.offsetWidth > window.innerWidth) {
        pop.style.left = `${window.innerWidth - pop.offsetWidth}px`;
    } else {
        pop.style.left = `${x}px`;
    }

    if (y + pop.offsetHeight > window.innerHeight) {
        pop.style.top = `${window.innerHeight - pop.offsetHeight}px`;
    } else {
        pop.style.top = `${y}px`;
    }
}


export {
    sizeCalc
} 