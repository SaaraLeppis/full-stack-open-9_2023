const SingleCountry = ({ country }) => {
  return (
    <div className="single-container">
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h2>languages</h2>
      {Object.values(country.languages).map((value, i) => (
        <li key={i}>{value}</li>
      ))}
      <img
        id="flag"
        src={country.flags.svg}
        alt="picture of country's flag"
      ></img>
    </div>
  )
}
export default SingleCountry
