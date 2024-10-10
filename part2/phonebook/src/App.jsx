import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({onChange}) => {
  return(
    <div>
      filter shown with <input onChange={onChange}></input>
    </div>
  )
}

const PersonForm = ({onSubmit, nameChange, numberChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={nameChange}/>
      </div>
      <div>
        number: <input onChange={numberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({people,removePerson}) => {
  return(
    <div>
      {people.map(person => 
          <div key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => removePerson(person.id)}>delete</button></div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

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
      id: (persons.length + 1).toString()
    }
    if (persons.some(person => person.name == newPerson.name)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(newPerson.id -1, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response.data))
        })
      }
    }
    else {
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
      })
    }
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().match(searchInput.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange}></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} nameChange={handleNameChange} numberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <Persons people={peopleToShow} removePerson={removePerson}></Persons>
    </div>
  )
}

export default App