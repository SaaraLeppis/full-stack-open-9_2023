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
    setsearchValue(event.target.value)
  }

  return (
    <div className="main-container">
      <h1>Countries</h1>
      <div className="search-section">
        <label htmlFor="search-input">Find countries: </label>
        <input type="text" name="search-input" onChange={handleSearch} />
      </div>
      <div>
        <CountryList filteredCountries={filteredCountries} />
      </div>
    </div>
  )
}

export default App
