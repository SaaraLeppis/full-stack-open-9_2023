import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Person from "./components/Person"
import personServices from "./services/personServices"
import Notification from "./components/Notification"

import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personServices.getAll().then((phoneBookContent) => {
      setPersons(phoneBookContent)
    })
  }, [])

  //function fro showing notification (2.16)
  const showNotififation = () => {}

  //function for adding person data
  const setNewData = (newData) => {
    personServices.create(newData).then((data) => {
      setPersons(persons.concat(data))
    })
  }

  //function to check if name exists
  const nameExists = (checkName, checkNumber) => {
    console.log(persons.find((person) => person.name === checkName))

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
    if (window.confirm(`Delete ${event.target.name}?`)) {
      personServices.remove(event.target.value)
      const newSet = persons.filter(
        (person) => person.name !== event.target.name
      )
      setMessage(`${event.target.name} was removed from list`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(newSet)
    }
  }

  // change and search handlers
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
        <Notification message={message} />
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
