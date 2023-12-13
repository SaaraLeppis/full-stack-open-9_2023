import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123 321" },
    { name: "Sami Metsälä", number: "040-555 555" },
    { name: "Tiina Taneli", number: "040-621 321" },
    { name: "Aamu Aikainen", number: "044-999 321" },
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")

  //function to check if name exists
  const nameExists = (checkName) => {
    return persons.some((person) => person.name === checkName)
  }
  const addPerson = (event) => {
    event.preventDefault()
    nameExists(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName("")
    setNewNumber("")
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <div className="form-section">
        <h2>Phonebook</h2>
        <div id="input-section">
          <label htmlFor="nameFilter">filter shown with:</label>
          <input id="nameFilter" value={searchValue} onChange={handleSearch} />
        </div>
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
          <div id="input-section">
            <label htmlFor="newName">name:</label>
            <input id="newName" value={newName} onChange={handlePersonChange} />
            <label htmlFor="newValue">number: </label>
            <input
              id="newValue"
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div className="list-section">
        <h2>Numbers</h2>
        <ul className="persons">
          {/*           {showAll &&
            persons.map((person, i) => (
              <li key={i}>
                {person.name} {person.number}
              </li>
            ))} */}
          {persons
            .filter(
              (person) =>
                person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                searchValue === ""
            )
            .map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App
