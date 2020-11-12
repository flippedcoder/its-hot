const brain = require('brain.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

// start up express app
const app = express()

// use libraries to get data from the front-end
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/*
User Features:
  - x final coordinate (number)
  - y final coordinate (number)
  - z final coordinate (number)
  - item found (boolean)
  - steps taken (number) (assume number of steps is the difference between all of the coordinates from beginning position to end position **this would never be true)
*/
// initial training data
const trainingDataInput = [
  { x: 5.4, y: 1.2, z: -7.9, itemFound: 1, stepsTaken: 584 },
  { x: -8.4, y: 1.2, z: 5.9, itemFound: 0, stepsTaken: 864 },
  { x: 5.4, y: 1.2, z: -7.9, itemFound: 1, stepsTaken: 684 },
  { x: 5.4, y: 1.2, z: -7.9, itemFound: 1, stepsTaken: 456 },
  { x: 5.4, y: 1.2, z: -7.9, itemFound: 1, stepsTaken: 946 },
  { x: 1.6, y: 1.2, z: 15.9, itemFound: 1, stepsTaken: 984 },
  { x: -15.4, y: 1.2, z: 12.9, itemFound: 0, stepsTaken: 9845 },
  { x: 7.8, y: 1.2, z: 10.9, itemFound: 1, stepsTaken: 146 },
  { x: 9.7, y: 1.2, z: -10.8, itemFound: 1, stepsTaken: 4896 },
  { x: 10.6, y: 1.2, z: -5.4, itemFound: 0, stepsTaken: 4615 },
  { x: -7.8, y: 1.2, z: 8.6, itemFound: 0, stepsTaken: 1068 },
  { x: 4.7, y: 1.2, z: -7.3, itemFound: 1, stepsTaken: 5433 },
  { x: -12.9, y: 1.2, z: 9.4, itemFound: 1, stepsTaken: 949 },
  { x: -14.6, y: 1.2, z: 18.2, itemFound: 1, stepsTaken: 6451 },
  { x: -8.1, y: 1.2, z: -11.5, itemFound: 0, stepsTaken: 4599 },
  { x: 11.9, y: 1.2, z: -6.8, itemFound: 1, stepsTaken: 3448 },
  { x: 14.9, y: 1.2, z: -4.4, itemFound: 0, stepsTaken: 2845 },
  { x: 2.8, y: 1.2, z: 12.8, itemFound: 0, stepsTaken: 1968 },
  { x: 7.7, y: 1.2, z: 17.5, itemFound: 0, stepsTaken: 7683 },
  { x: -13.4, y: 1.2, z: -2.3, itemFound: 1, stepsTaken: 8648 },
  { x: 8.8, y: 1.2, z: -9.5, itemFound: 0, stepsTaken: 3483 },
]

/*
Prediction:
  - will user finish the game
*/
// initial training prediction
const trainingDataOutput = [
  { willFinish: 1 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 0 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 1 },
  { willFinish: 1 },
  { willFinish: 0 },
  { willFinish: 0 },
]

// combine training data into one array
const trainingSet = trainingDataOutput.map((value, index) => {
  return {
    input: trainingDataInput[index],
    output: value,
  }
})

// set up neural network model with 3 hidden layers
const net = new brain.NeuralNetwork({ hiddenLayers: [3] })

// train the model with the trainingSet array and get the stats
const stats = net.train(trainingSet)

console.log(stats)
console.log(
  net.run({ x: 18.8, y: 12.2, z: -19.5, itemFound: 0, stepsTaken: 3483 })
)

/** get the user data from the front-end after the user finds all of the objects */
app.post('/api/getUserData/', (req, res) => {
  const { xPos, yPos, zPos, steps, itemFound } = req.body.userData

  const prediction = net.run({ x: xPos, y: yPos, z: zPos, steps: steps, itemFound: itemFound })

  // return the predicted best value for one of the items left to find based on the new user info
  const newXPos = xPos + (steps * (prediction > 0.5 ? 1 : -1)) / (xPos + yPos + zPos)
  const newZPos = zPos + steps / (xPos + yPos + zPos)

  const newItemLocation = { x: newXPos, y: yPos, z: newZPos }

  res.status(200)
  res.send(newItemLocation)
})

app.listen('3500', () => console.log('endpoints running on port 3500'))
