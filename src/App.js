import {useEffect, useState} from 'react'

const App = (props) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [name, setName] = useState([])


  // add button click event.
  const addNote = (event) => {
    // debugger
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toDateString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    // checking name in object and alert if name already exist
    const newN = persons.filter(e=>e.name === newName)
      if(newN.length==0){
        setPersons(persons.concat(nameObject))
      }
      else{
        window.alert(newName + ' is already in phonebook.')
      }
    
    setNewName('')
    setNewNumber('')
  }

  // change event in textbox
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //change event in number textbox
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const nameToShow = showAll ? persons : persons.filter(item => item.important === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {nameToShow.map(item => 
          <li key={item.id}>{item.name} = {item.number}</li>
          )}
      </ul>
    </div>
  );
}

export default App;
