const express = require('express')
const app = express()
app.use(express.json()) 

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
// create 'body' token
morgan.token('body', (req, res) => JSON.stringify(req.body))
// use morgan and use body token, i.e.  :body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//tiny format is  :method :url :status :res[content-length] - :response-time ms


let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.contentType = "text/html"
  response.send(`<div>Phonebook has info for ${persons.length} people <br/> ${new Date()} </div>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  console.log(`persons after deletion of ${id}`, persons)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log('persons before: ', persons)

  const person = request.body
  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'name and number must be provided' 
    })
  }
  if (persons.find((p) => p.name === person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  person.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  console.log('person to be added: ', person)
  persons = [...persons, person]
  response.send(person)
  console.log('persons after: ', persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})