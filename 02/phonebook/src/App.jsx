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

  useEffect(() => {
    console.log("hook")
    personServices.getAll().then((phoneBookContent) => {
      setPersons(phoneBookContent)
    })
  }, [])
  //function for adding person data
  const setNewData = (newData) => {
    personServices.create(newData).then((data) => {
      setPersons(persons.concat(data))
    })
  }

  //function to check if name exists
  const nameExists = (checkName) => {
    return persons.some((person) => person.name === checkName)
  }

  // checking if person exists (alert) and adding if not
  const addPerson = (event) => {
    event.preventDefault()
    nameExists(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setNewData({ name: newName, number: newNumber })

    setNewName("")
    setNewNumber("")
  }
  //deleting person when 'delete'-button clicked
  const deletePerson = (event) => {
    event.preventDefault()
    personServices.remove(event.target.value)
    const newSet = persons.filter((person) => person.name !== event.target.name)
    setPersons(newSet)
  }

  // change and search handlers
  const handleChange = (event) => {
    event.target.name === "newName"
      ? setNewName(event.target.value)
      : setNewNumber(event.target.value)
    /*     event.target.name === "delete"
      ? console.log("click", event.target.value)
      : console.log("hups") */
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
        <Person
          persons={persons}
          searchValue={searchValue}
          removePerson={deletePerson}
        />
      </div>
    </div>
  )
}

export default App
