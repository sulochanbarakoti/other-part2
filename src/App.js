import {useEffect, useState} from 'react'

const App = (props) => {

  const [persons, setPersons] = useState(props.notes)
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)

  console.log(persons.length)
  const addNote = (event) => {
    // debugger
    event.preventDefault()
    // console.log("clicked",event.target.value)
    const nameObject = {
      name: newName,
      date: new Date().toDateString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
    // console.log(persons)
    setPersons(persons.concat(nameObject))
    // console.log(persons)
    setNewName('')

  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  // const showPerson = () => {
  //   const showTruePerson = persons.filter(item => item.important === true)
  //   setShowAll(showTruePerson)
  // }

  const nameToShow = showAll ? persons : persons.filter(item => item.important === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {nameToShow.map(item => 
          <li key={item.id}>{item.name}</li>
          )}
      </ul>
    </div>
  );
}

export default App;
