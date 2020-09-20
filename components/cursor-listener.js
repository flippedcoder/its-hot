const sendUserData = require('./user-model')


AFRAME.registerComponent('cursor-listener', {
    init: () => {
        const finderOrb = document.querySelector('a-sphere')
        const finderPipe = document.querySelector('a-cylinder')
        const finderBox = document.querySelector('#finder-box')
        const finderBlock = document.querySelector('#wooden-block')
        
        
        // send the position of the object as the user position
        const newBoxPos = sendUserData(finderBox.object3D.position.get())
        const newBlockPos = sendUserData(finderBlock.object3D.position.get())
        const newPipePos = sendUserData(finderPipe.object3D.position.get())
        const newOrbPos = sendUserData(finderOrb.object3D.position.get())
        
        finderOrb.object3D.position.set(newOrbPos.x, newOrbPos.y, newOrbPos.z)
        finderPipe.object3D.position.set(newPipePos.x, newPipePos.y, newPipePos.z)
        finderBox.object3D.position.set(newBoxPos.x, newBoxPos.y, newBoxPos.z)
        finderBlock.object3D.position.set(newBlockPos.x, newBlockPos.y, newBlockPos.z)
    }
});