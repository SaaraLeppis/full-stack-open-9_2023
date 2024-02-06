import { useEffect, useState } from 'react';
import axios from 'axios';
import { Entry } from './types';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  /*   const [newEntry, setNewEntry] = useState<Entry>(id:'', date:'', visibility:'', weather:'', comment:'' );
   */ useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then(response => {
      const dataInDiary = response.data;
      console.log(dataInDiary);
      setEntries(dataInDiary as Entry[]);
    });
  }, []);

  /*   const entryCreation = (event) => {
    const {name,value} =event.target;
    setNewEntry ({...newEntry, [name]:value})
  }; */

  return (
    <div className="main-container">
      <h1>Flight diary</h1>
      {/* <div className="form-container">
        <h2>Add new entry</h2>
        <form onSubmit={entryCreation}>
          <label htmlFor="date">date: </label>
          <input
            type="text"
            name="date"
            value={newEntry}
            onChange={event => setNewEntry(event.target.value)}
          />
          <label htmlFor="visibility">visibility: </label>
          <input
            type="text"
            name="visibility"
            value={newEntry}
            onChange={event => setNewEntry(event.target.value)}
          />
          <label htmlFor="weather">Weather: </label>
          <input
            type="text"
            name="weather"
            value={newEntry}
            onChange={event => setNewEntry(event.target.value)}
          />
          <label htmlFor="comment">Comment: </label>
          <input
            type="text"
            name="comment"
            value={newEntry}
            onChange={event => setNewEntry(event.target.value)}
          />
          <button type="submit">add +</button>
        </form>
      </div> */}
      <div className="entires-container">
        <h2>Diary entries</h2>
        {entries.map(data => (
          <div key={data.id} className="single-entry">
            <h3>{data.date}</h3>
            <p>visibility: {data.visibility}</p>
            <p>weather: {data.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
