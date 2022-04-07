
const Display = (props) => {

    const deleteContact = (id) => {
        // axios
        //     .delete(`http://localhost:3001/notes/${id}`)
        //     .then(res=>{
        //     })
        return id
    }

    const data = props.props
    return(
        <div>
            <h2>Numbers</h2>
        <ul>
            {data.map(item => 
            <li key={item.id}>{item.name} : {item.number}<button onClick={()=>deleteContact(item.id)}>delete</button></li>
            )}
        </ul>
        </div>
    )
}

export default Display;