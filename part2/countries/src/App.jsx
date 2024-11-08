import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [everyCountry, setEveryCountry] = useState([])

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setEveryCountry(response.data)
    })
  })

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    if(newFilter){
      const displayCountries = everyCountry.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setCountries(displayCountries)
    }
    else{
      setCountries(everyCountry)
    }
  }


  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange}></Filter>
      <Content countries={countries} setCountries={setCountries}></Content>
    </div>
  )
}

export default App
