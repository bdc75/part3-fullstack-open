const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.static('dist'))

const cors = require('cors')
const morgan = require('morgan')
// const PersonModel = require('./models/person')

// necessary for being able to deploy frontend with the backend, using the dist folder
// static bc the frontend is built into a static index.html (which contains script ref to js)
// it works like this: whenever Express gets an HTTP GET request,
// it will first check if the dist directory contains a file corresponding to the request's address



app.use(express.json())

app.use(cors())
// create 'body' token
morgan.token('body', (req, res) => JSON.stringify(req.body))
// use morgan and use body token, i.e.  :body
//tiny format is  :method :url :status :res[content-length] - :response-time ms
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  // PersonModel.find({}).then(persons => {
  //   response.json(persons)
  // })
  response.json({msg: "hello"})
})

app.get('/api/persons/:id', (request, response) => {
  // const person = PersonModel.findById(request.params.id)
  //   .then(result => {
  //     if (result) {
  //       response.json(result)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     response.status(400).send({ error: 'malformatted id' })
  //   })
  response.json({msg: "hello"})
})

app.get('/info', (request, response) => {
  // response.contentType = "text/html"
  // const people = PersonModel.find({}).then(result => {
  //   response.send(`<div>Phonebook has info for ${result.length} people <br/> ${new Date()} </div>`)
  // })
  response.json({msg: "hello"})
})

app.delete('/api/persons/:id', (request, response, next) => {
  // PersonModel.findByIdAndDelete(request.params.id)
  //   .then(result => {
  //     console.log(`deletion result: <${result}>`)
  //     response.status(204).end()
  //   })
  //   .catch(error => {
  //     console.log(`deletion error: ${error}`)
  //     return next(error)
  //   })
  
  // const id = request.params.id
  // persons = persons.filter(person => person.id !== id)
  // console.log(`persons after deletion of ${id}`, persons)
  // response.status(204).end()
  response.json({msg: "hello"})
})

app.post('/api/persons', (request, response, next) => {
  // // console.log('persons before: ', persons)

  // const body = request.body
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ 
  //     error: 'name and number must be provided' 
  //   })
  // }
  // // if (persons.find((p) => p.name === person.name)) {
  // //   return response.status(400).json({ 
  // //     error: 'name must be unique' 
  // //   })
  // // }

  // console.log('person to be added: ', body)
  // const person = new PersonModel({
  //   name: body.name,
  //   number: body.number
  // })

  // person.save().then(result => {
  //   console.log(`${person.name} saved`)
  //   response.json(result)
  // })
  // .catch(error => next(error))
  response.json({msg: "hello"})
})

app.put('/api/persons/:id', (request, response, next) => {
  // const body = request.body
  // const person = {
  //   name: body.name,
  //   number: body.number
  // }
  // PersonModel.findByIdAndUpdate(request.params.id, person, { new: true })
  //   .then(updatedPerson => {
  //     response.json(updatedPerson)
  //   })
  //   .catch(error => next(error))
  response.json({msg: "hello"})
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})