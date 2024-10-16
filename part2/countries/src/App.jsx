import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'

const Filter = ({value, onChange}) => {
  return(
    <div>
      find countries <input onChange={onChange} value={value}></input>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  })

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange}></Filter>
      <Content countries={countries} filter={filter}></Content>
    </div>
  )
}

export default App
