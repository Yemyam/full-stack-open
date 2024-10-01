import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({people}) => {
  return(
    <div>
      {people.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearchInput(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, number: newNumber, id: persons.length + 1
    }
    if (persons.some(person => person.name == newPerson.name)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios.post("http://localhost:3001/persons",newPerson)
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
      <Persons people={peopleToShow}></Persons>
    </div>
  )
}

export default App