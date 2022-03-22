import { useState } from "react"
import Display from "./display"

const Form = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

     // add button click event.
    const addNote = (event) => {
        event.preventDefault()      
        if (newName !== '' && newNumber !== '') {
            const nameObject = {
            name: newName,
            number: newNumber,
            // date: new Date().toDateString(),
            // important: Math.random() < 0.5,
            id: persons.length + 1,
            }
        
            // checking name in object and alert if name already exist
            const newN = persons.filter(e=>e.name === newName)
            if(newN.length === 0){
                setPersons(persons.concat(nameObject))
            }
            else{
                window.alert(newName + ' is already in phonebook.')
            }
        } else {
            window.alert('Please fill the form.')
        }
        setNewName('')
        setNewNumber('')
        // setSearch('')
    }

      // change event in textbox
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    //change event in number textbox
    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log(event.target.value)
      }
      
      // filter search
      const nameToShow = (search === '') ? persons : persons.filter(item => item.name.match(search))

    return(
        <div>
            <h2>Phonebook</h2><br></br>
        <div>
            filter shown with: <input value={search} onChange={handleSearchChange}/>
        </div><br></br>
            <form onSubmit={addNote}>
                <h1>add a new</h1>
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
            <Display props={nameToShow}/>
        </div>
    )
}

export default Form;