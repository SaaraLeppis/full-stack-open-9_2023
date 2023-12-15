import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Person from "./components/Person"

import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")

  // change port if 3001 in use
  const port = "localhost:3001"

  //axios
  useEffect(() => {
    axios.get(`http://${port}/persons`).then((response) => {
      setPersons(response.data)
    })
  }, [])

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
        <Form
          onSubmit={addPerson}
          name={newName}
          number={newNumber}
          onChange={handleChange}
        />
      </div>
      <div className="list-section">
        <h3>numbers</h3>
        <Person persons={persons} searchValue={searchValue} />
      </div>
    </div>
  )
}

export default App
