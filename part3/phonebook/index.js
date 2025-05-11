require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
const morgan = require('morgan')

morgan.token('data', function (req, res) {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return ' ';
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

app.get("/info", (request, response) => {
    const date = new Date()
    response.send(
        `
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${date}</div>
        `
    )
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({error: 'malformatted id'})
      })
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})