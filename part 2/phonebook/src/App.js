import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filteredName, setFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  let filteredContacts = persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (persons.filter(x => newName === x.name).length > 0){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result){
        const person = persons.find(n => n.name === newName)
        const changedPerson = {...person, number: newNumber}
        phoneService
        .update(person.id, changedPerson)
        .then(returnedContact => {
          setPersons(persons.map(note => note.id !== person.id ? note : returnedContact))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage('This contact cannot be updated as it has already been removed from the database')
          setPersons(persons.filter(x => x.id !== person.id))
          setNewNumber('')
          setNewName('')

          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      }

    } else if (newNumber === '' || newName === '') {
      window.alert("Please fill in all fields")
    } else {
      const addressObject = {
        name: newName,
        number: newNumber
      }

      phoneService
      .create(addressObject)
      .then(returnedAddress => {
        setPersons(persons.concat(returnedAddress))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedAddress.name}!`)

        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  const deleteContact = (id) => {
    const result = window.confirm('Do you really want to delete the contact?')
    if (result){
      phoneService
        .deleteContact(id)
        .then(()  => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage('Contact has already been deleted')
          setPersons(persons.filter(x => x.id !== id))
        })
    }
  }

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhoneAddress => {
        setPersons(initialPhoneAddress)
      })
  }, [])

  return (
    <div>
      <Notification message = {message}/>
      <ErrorMessage message = {errorMessage}/>
      <h2>Phonebook</h2>
      <Filter name={filteredName} handler={handleFilter}/>
      <h2> add a new</h2>
      <PersonForm addContact={addContact} newName={newName}
                  handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons arr={filteredContacts} filteredName={filteredName} deleteContact={deleteContact}/>
    </div>
  )
}

export default App