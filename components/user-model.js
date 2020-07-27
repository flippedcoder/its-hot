import axios from 'axios'

/** call this when one of the items is found to relocate one of the items left */
const sendUserData = async ({x, y, z}) => {
  const xPos = x
  const yPos = y
  const zPos = z
  const steps = x + y + z
  const itemFound = true

  // get the predicted best value for one of the other items
  const moveItem = await axios.post('http://localhost:3500/api/getUserData', {
    xPos,
    yPos,
    zPos,
    steps,
    itemFound
  })

  return moveItem
}

export default sendUserData