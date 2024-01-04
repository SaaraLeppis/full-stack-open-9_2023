import SingleCountry from "./SingleCountry"

const CountryList = ({ filteredCountries }) => {
  console.log("filter", filteredCountries)
  return filteredCountries.length > 10 ? (
    <p>Too many</p>
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
