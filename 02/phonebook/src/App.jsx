import { useState } from "react"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Person from "./components/Person"

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

  const clearInputs = () => {
    setNewName("")
    setNewNumber(null)
  }
  const addPerson = (event) => {
    event.preventDefault()
    nameExists(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }))

    setNewName("")
    setNewNumber("")
  }
  const handleChange = (event) => {
    event.target.name === "newName"
      ? setNewName(event.target.value)
      : setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <div className="form-section">
        <h2>Phonebook</h2>
        <Filter value={searchValue} onChange={handleSearch} />
        <h3>add a new</h3>
        {/*         <PersonForm
          onSubmit={addPerson}
          value={newName}
          onChange={handlePersonChange}
          onChange={handleNumberChange}
        /> */}
        <Form
          onSubmit={addPerson}
          name={newName}
          number={newNumber}
          onChange={handleChange}
        />
        {/* <form onSubmit={addPerson}>
          <div id="input-section">
            <label htmlFor="newName">name:</label>
            <input
              id="newName"
              name="newName"
              value={newName}
              onChange={handleChange}
            />
            <label htmlFor="newValue">number: </label>
            <input
              id="newValue"
              name="newValue"
              value={newNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form> */}
      </div>
      <div className="list-section">
        <h3>numbers</h3>
        <Person persons={persons} searchValue={searchValue} />
        {/*         <ul className="persons">
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
        </ul> */}
      </div>
    </div>
  )
}

export default App
