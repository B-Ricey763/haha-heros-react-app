import express from 'express'
import cors from 'cors'
import { database } from './database.js'

const app = express()
const port = 8080
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/api/bog/users', (req, res) => {
  res.json(database).status(200)
})

app.get('/api/bog/users/:id', (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0]
  res.json(user).status(200)
})
app.delete('/api/bog/users/delete/:id', (req, res) => {
  const index = database.findIndex((user) => user.id === req.params.id)
  console.log(index, req.params.id)
  if (index !== -1) {
    // Item was successfully deleted, so update and let them know
    database.splice(index, 1)
    res.sendStatus(200)
  } else {
    // Item was not found
    res.sendStatus(404)
  }
})

app.put('/api/bog/users/update/:id', (req, res) => {
  const index = database.findIndex((user) => user.id === req.params.id)
  if (index !== -1) {
    database[index] = req.body
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/bog/users/create/', (req, res) => {
  const volunteer = req.body
  const nextId = database[database.length - 1].id + 1
  // Since id's aren't controlled by the database, it's
  // just a js array, we are just kind of guessing the
  // next index. There may be holes, but I think this
  // solution is better than updating every id when you delete.
  database.push({
    ...volunteer,
    id: nextId
  })
  res.sendStatus(200)
})

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
