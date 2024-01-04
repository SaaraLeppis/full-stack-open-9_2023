import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import CountryList from "./components/CountryList"

const App = () => {
  const [searchValue, setsearchValue] = useState("")
  const [countryList, setCountryList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

  useEffect(() => {
    axios.get(`${baseUrl}all`).then(response => {
      setCountryList(response.data)
    })
  }, [])

  useEffect(() => {
    const filteredData = countryList.filter(c =>
      c.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredCountries(filteredData)
  }, [searchValue])

  const handleSearch = event => {
    console.log(event.target.value, "at Search")
    setsearchValue(event.target.value)
  }

  return (
    <div>
      <p>Hello World!</p>
      <div className="search-tools">
        <input
          type="text"
          name="search-input"
          placeholder="what?"
          onChange={handleSearch}
        />
      </div>
      <div>
        <CountryList filteredCountries={filteredCountries} />
        {/*  {filteredCountries.length > 10 ? (
          <p>Too many</p>
        ) : filteredCountries.length === 1 ? (
          <p>Only One</p>
        ) : (
          <ul>
            {filteredCountries.map((country, i) => (
              <li key={i}>{country.name.common}</li>
            ))}
          </ul>
        )} */}
        {/*           {countryList
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .map((country, i) => (
              <li key={i}>{country.name.common}</li>
            ))} */}
      </div>
    </div>
  )
}

export default App
