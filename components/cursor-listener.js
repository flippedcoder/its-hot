AFRAME.registerComponent('cursor-listener', {
    init: () => {
        let lastIndex = -1;
        const COLORS = ['red', 'green', 'purple'];
        const finderBox = document.querySelector('.finder-box');
        finderBox.addEventListener('mouseenter', (evt) => {
        lastIndex = (lastIndex + 1) % COLORS.length;
        finderBox.setAttribute('material', 'color', COLORS[lastIndex]);
        });
        finderBox.addEventListener('mouseleave', (evt) => {
        finderBox.setAttribute('material', 'color', 'blue');
        });
    }
});