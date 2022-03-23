import axios from "axios"
import {useEffect, useState } from "react"
import Display from "./display"

const Form = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(()=>{
        console.log('useeffect')
        axios
            .get('http://localhost:3001/notes')
            .then(res=>{
                console.log('promise fulfilled')
                setPersons(res.data)
                // console.log(res.data)
                console.log(persons)
            })
    },[])

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