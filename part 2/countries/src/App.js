import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './services/Weather'

const Filter = ({name, handler}) => {
  return (
    <form>
      <div>
        find countries
          <input value={name} onChange={handler}/>
      </div>
    </form>
  )
}

const CountryList = ({countries, setFilter}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, be more specific
      </div>
    )
  } else if (countries.length === 0){
    return (
      <div>
        No matches Found
      </div>
    )
  } else if (countries.length === 1) {
      console.log(countries[0])
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Population: {countries[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {countries[0].languages.map(language => 
            <li key={language.iso639_1}>
              {language.name}
            </li>
            )}
        </ul>
        <img src={countries[0].flag} alt={countries[0].name} width="150" height="150"/>
        <Weather country={countries[0]}/>
      </div>
    )
  } else {
    return (
      <div>
          {countries.map(x => 
              <p> {x.name} 
                  <button onClick={() => setFilter(x.name.toLowerCase())}>
                    Show
                  </button>
              </p>
            )}
      </div>
    )
  }
}

const App = () => {
  const [inputCountry, setCountry] = useState('')
  const [countries, setCountries] = useState([]) 


  const handleFilter = (event) => {
    setCountry(event.target.value.toLowerCase())
  }
  const filteredCountries = countries.filter(x => x.name.toLowerCase()
                                                        .includes(inputCountry))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
        console.log(response.data)
      })
  }, [])


  return (
    <div>
        <Filter name={inputCountry} handler={handleFilter}/>
        <CountryList countries={filteredCountries} setFilter={setCountry}/>
    </div>
  )
}

export default App