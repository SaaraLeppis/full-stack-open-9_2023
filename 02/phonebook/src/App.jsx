import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Person from "./components/Person"
import personServices from "./services/personServices"

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
    personServices.getAll().then((someData) => {
      setPersons(someData)
    })
  }, [newName])

  const setNewData = (newData) => {
    personServices.create(newData)
    /* // Don't need following (which used earlier)as useEffect will update the list when name input is cleared.
    .then((xx) => {
      setPersons(persons.concat(xx))
    }) */
  }

  //function to check if name exists
  const nameExists = (checkName) => {
    return persons.some((person) => person.name === checkName)
  }

  const addPerson = (event) => {
    event.preventDefault()
    nameExists(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setNewData({ name: newName, number: newNumber })

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
