import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

const App = () => {
  const [countrySearch, setCountrySearch] = useState("")
  const [countryList, setCountryList] = useState([])

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
  const handleSearch = (event) => {
    console.log(event.target.value, "at Search")
    setCountrySearch(event.target.value)
  }
  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => {
      setCountryList(response.data)
    })
  }, [])

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
        <ul>
          {countryList
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(countrySearch.toLowerCase())
            )
            .map((country, i) => (
              <li key={i}>{country.name.common}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App
