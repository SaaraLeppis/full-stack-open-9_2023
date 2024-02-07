import { useEffect, useState } from 'react';
import axios from 'axios';
import { Entry, Visibility, Weather } from './types';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<Entry>({
    date: '',
    visibility: '' as Visibility,
    weather: '' as Weather,
    comment: '',
  });
  const fetchData = () => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then(response => {
      const dataInDiary = response.data;
      console.log(dataInDiary);
      setEntries(dataInDiary as Entry[]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  /* useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then(response => {
      const dataInDiary = response.data;
      console.log(dataInDiary);
      setEntries(dataInDiary as Entry[]);
    });
  }, []); */

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      axios
        .post('http://localhost:3000/api/diaries', newEntry)
        .then(response => response.data)
        .then(data => {
          setEntries(entries.concat(data));
        });

      setNewEntry({
        date: '',
        visibility: '' as Visibility,
        weather: '' as Weather,
        comment: '',
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-container">
      <h1>Flight diary</h1>
      <div className="form-container">
        <h2>Add new entry</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="date">date: </label>
          <input
            type="text"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={changeHandler}
          />
          <label htmlFor="visibility">visibility: </label>
          <input
            type="text"
            id="visibility"
            name="visibility"
            value={newEntry.visibility}
            onChange={changeHandler}
          />
          <label htmlFor="weather">Weather: </label>
          <input
            type="text"
            id="weather"
            name="weather"
            value={newEntry.weather}
            onChange={changeHandler}
          />
          <label htmlFor="comment">Comment: </label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={newEntry.comment}
            onChange={changeHandler}
          />
          <button type="submit">add +</button>
        </form>
      </div>
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
