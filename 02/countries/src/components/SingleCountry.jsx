const SingleCountry = ({ country }) => {
  return (
    <div className="single-container">
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages</h3>
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
