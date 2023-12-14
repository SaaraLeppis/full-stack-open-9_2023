const Person = ({ persons, searchValue }) => {
  return (
    <ul className="persons">
      {persons
        .filter(
          (person) =>
            person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue === ""
        )
        .map((person, i) => (
          <li key={i}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  )
}
export default Person
