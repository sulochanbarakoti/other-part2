

const Display = (props) => {

    const data = props.props
    console.log(props.props)
    return(
        <div>
            <h2>Numbers</h2>
        <ul>
            {data.map(item => 
            <li key={item.id}>{item.name} = {item.number}</li>
            )}
        </ul>
        </div>
    )
}

export default Display;