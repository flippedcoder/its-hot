AFRAME.registerComponent('found-item', {
    init: () => {
        const finderOrb = document.querySelector('a-sphere')
        const finderPipe = document.querySelector('a-cylinder')
        const finderBox = document.querySelector('#finder-box')
        const finderBlock = document.querySelector('#wooden-block')

        finderBox.addEventListener('click', () => {
            finderBox.object3D.position.set(1, 2, 1)
        })

        finderBlock.addEventListener('click', () => {
            finderBlock.object3D.position.set(1, 3, 1)
        })

        finderOrb.addEventListener('click', () => {
            finderOrb.object3D.position.set(1, 1, 1)
        })

        finderPipe.addEventListener('click', () => {    
            finderPipe.object3D.position.set(1, 4, 1)
        });
    }
})