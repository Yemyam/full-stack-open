import React from 'react'
import Country from './Country'
import Weather from './Weather'

const Content = ({countries, setCountries}) => {
    if (countries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length == 1){
        const country = countries[0]
        return(
            <div>
              <Country country={country}></Country>
              <Weather country={country}></Weather>
            </div>
        )
    }
    else{
      return(
        <div>
          {countries.map((country,i) => 
            <div key={i}>
              {country.name.common}
              <button onClick={() => setCountries([country])}>show</button>
            </div>
          )}
        </div>
      )
    }
  }

export default Content