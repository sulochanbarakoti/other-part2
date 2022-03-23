
import ReactDOM from 'react-dom';
import axios from 'axios'
import App from './App';

const notes = [
  {
    id: 1,
    name: 'Sulochan',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    name: 'Avishek',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    name: 'Aanchal',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

// const promise = axios.get('http://localhost:3001/notes')
// promise.then(response => {
//   console.log(response)
// })

// axios
//   .get('http://localhost:3001/notes')
//   .then(res =>{
//     const data = res.data
//   console.log(data)
// })

ReactDOM.render(
    <App notes={notes}/>,
  document.getElementById('root')
);

