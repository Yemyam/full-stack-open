import React from 'react'

const Content = ({countries, filter}) => {
    const displayCountries = countries.filter(country => country.name.common.toLowerCase().match(filter.toLowerCase()))
    if (displayCountries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (displayCountries.length == 1){
        const country = displayCountries[0]
        const langKeys = Object.keys(country.languages)
        return(
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h3>languages:</h3>
                <ul>
                    {langKeys.map(langKey => <li key={country.languages[langKey]}>{country.languages[langKey]}</li>)}
                </ul>
                <img src={country.flags["png"]}></img>
            </div>
        )
    }
    return(
      <div>
        {displayCountries.map((country,i) => 
          <div key={i}>
            {country.name.common}
          </div>
        )}
      </div>
    )
  }

export default Content