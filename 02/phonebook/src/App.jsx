import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])

  const [newName, setNewName] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName("")
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <div className="form-section">
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handlePersonChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div className="list-section">
        <h2>Numbers</h2>
        <ul className="persons">
          {persons.map((person, i) => (
            <li key={i}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
