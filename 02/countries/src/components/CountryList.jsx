import SingleCountry from "./SingleCountry"

const CountryList = ({ filteredCountries }) => {
  return filteredCountries.length > 10 ? (
    <p>Too many matches, apply another filter</p>
  ) : filteredCountries.length === 1 ? (
    <SingleCountry country={filteredCountries[0]} />
  ) : (
    <ul>
      {filteredCountries.map((country, i) => (
        <li key={i}>{country.name.common}</li>
      ))}
    </ul>
  )
}

export default CountryList
