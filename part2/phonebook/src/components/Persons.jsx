import React from 'react'
const Persons = ({people,removePerson}) => {
    return(
      <ul>
        {people.map(person => 
            <li key={person.id}>
              {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
            </li>)}
      </ul>
    )
  }
export default Persons