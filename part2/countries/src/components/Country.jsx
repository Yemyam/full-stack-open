import React from 'react'

const Country = ({country}) => {
    return(
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages).map(key => 
                    <li key={key}>{country.languages[key]}</li>
                )}
            </ul>
            <img src={country.flags["png"]}></img>
        </div>
    )
}
export default Country