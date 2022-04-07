import axios from "axios"
import {useEffect, useState } from "react"
import './index.css'
// import Display from "./display"

const Form = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [addedMessage, setAddedMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        // console.log('useeffect')
        axios
            .get('http://localhost:3001/notes')
            .then(res=>{
                console.log('promise fulfilled')
                setPersons(res.data)
            })
            .catch(e=>{
                console.log(e)
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

                // sending data to server   
                axios
                .post('http://localhost:3001/notes',nameObject)
                .then(res=>{
                    console.log(res.data)
                })
                .catch(e=>{
                    console.log(e)
                })
                setAddedMessage(`Added ${nameObject.name}`)
            }
            else{
                console.log(newN[0].id)
                const result = window.confirm(`${newN[0].name} is already to phonebook, replace the old number with a new one?`)
                if (result) {
                    axios
                    .put(`http://localhost:3001/notes/${newN[0].id}`,{name: newN[0].name, number: newNumber})
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(e=>{
                        setErrorMessage(`the name '${newN[0].name}' was already deleted from server`)
                    })
                    axios
                    .get('http://localhost:3001/notes')
                    .then(res=>{
                        console.log('promise fulfilled')
                        setPersons(res.data)
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                // window.alert(newName + ' is already in phonebook.')
                console.log(newN)
                }
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

    const deleteContact = (id,name) =>{

        const result = window.confirm(`Delete ${name} ?`)
        if (result) {
            axios
            .delete(`http://localhost:3001/notes/${id}`)
            .then(res=>{
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        
        axios
            .get('http://localhost:3001/notes')
            .then(res=>{
                console.log('promise fulfilled')
                setPersons(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }         
    }
      
      // filter search
      const nameToShow = (search === '') ? persons : persons.filter(item => item.name.match(search))

    return(
        <div>
            <h2>Phonebook</h2><br></br>
        <div>
        <div className="errorMessage">
            {/* <h1>{errorMessage}</h1> */}
            {addedMessage === '' ? null : <h1>{addedMessage}</h1>}
            {errorMessage === '' ? null : <h2>{errorMessage}</h2>}
        </div>
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
            {/* <Display props={nameToShow}/> */}
            <div>
            <h2>Numbers</h2>
        <ul>
            {nameToShow.map(item => 
            <li key={item.id}>{item.name} : {item.number}<button onClick={()=>deleteContact(item.id,item.name)}>delete</button></li>
            )}
        </ul>
        </div>
        </div>
    )
}

export default Form;