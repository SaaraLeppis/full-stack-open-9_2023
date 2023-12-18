const Person = ({ persons, searchValue, removePerson }) => {
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
            <button
              id="remove-button"
              name={person.name}
              type="reset"
              value={person.id}
              onClick={removePerson}
            >
              delete
            </button>
          </li>
        ))}
    </ul>
  )
}
export default Person
