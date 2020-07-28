import sendUserData from './user-model'

AFRAME.registerComponent('found-item', {
    init: () => {
        const finderOrb = document.querySelector('a-sphere')
        const finderPipe = document.querySelector('a-cylinder')
        const finderBox = document.querySelector('#finder-box')
        const finderBlock = document.querySelector('#wooden-block')

        finderBox.addEventListener('click', () => {
            // send the position of the object as the user position
            const newPos = sendUserData(finderBox.object3D.position.get())
            finderBox.setAttribute('scale', { x: 0.25, y: 0.25, z: 0.25 })
            finderBox.object3D.position.set(newPos.x, newPos.y, newPos.z)
        })

        finderBlock.addEventListener('click', () => {
            // send the position of the object as the user position
            sendUserData(finderBlock.object3D.position.get())
            finderBlock.setAttribute('scale', { x: 0.25, y: 0.25, z: 0.25 })
            finderBlock.object3D.position.set(newPos.x, newPos.y, newPos.z)
        })

        finderOrb.addEventListener('click', () => {
            // send the position of the object as the user position
            sendUserData(finderOrb.object3D.position.get())
            finderOrb.setAttribute('scale', { x: 0.25, y: 0.25, z: 0.25 })
            finderOrb.object3D.position.set(newPos.x, newPos.y, newPos.z)
        })

        finderPipe.addEventListener('click', () => {            
            // send the position of the object as the user position
            sendUserData(finderPipe.object3D.position.get())
            finderPipe.setAttribute('scale', { x: 0.25, y: 0.25, z: 0.25 })
            finderPipe.object3D.position.set(newPos.x, newPos.y, newPos.z)
        });
    }
})