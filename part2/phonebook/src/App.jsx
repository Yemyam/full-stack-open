import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearchInput(event.target.value)
  }

  const removePerson = (id) => {
    const name = persons.find(name => name.id === id).name
    if(window.confirm(`Delete ${name}?`)){
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      number: newNumber, 
    }
    if (persons.some(person => (person.name == newPerson.name & person.number == newPerson.number))) {
      window.alert(`${newName} is already added to the phonebook`)
    }
    else if (persons.some(person => person.name == newPerson.name)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.find(person => person.name == newPerson.name)
        personService
        .update(oldPerson.id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.name !== newPerson.name ? person : response.data))
          setMessage(
            `Updated ${newPerson.name}'s number`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== oldPerson.id))
          setMessage(
            `Information of ${newPerson.name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }
    else {
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      setMessage(
        `Added ${newPerson.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().match(searchInput.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Filter onChange={handleSearchChange}></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} nameChange={handleNameChange} numberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <Persons people={peopleToShow} removePerson={removePerson}></Persons>
    </div>
  )
}

export default App