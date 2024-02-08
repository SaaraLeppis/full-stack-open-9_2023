import { useEffect, useState } from 'react';

import { createData, getData } from './services/diaryService';
import { Entry, Visibility, Weather } from './types';
import axios from 'axios';

function App() {
  //states
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<Entry>({
    date: '',
    visibility: '' as Visibility,
    weather: '' as Weather,
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getData().then(data => setEntries(data));
  }, []);

  // helper functions / handlers
  const errorHandler = (message: string) => {
    setErrorMessage(message.replace('Something went wrong. ', ''));
    setTimeout(() => setErrorMessage(''), 4500);
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await createData(newEntry);
      setEntries(entries.concat(data));
      /*       createData(newEntry).then(data => {
        setEntries(entries.concat(data));
      }); */
      setNewEntry({
        date: '',
        visibility: '' as Visibility,
        weather: '' as Weather,
        comment: '',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data;
        errorHandler(message);
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="main-container">
      <h1>Flight diary</h1>
      <div className="error-container">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div className="form-container">
        <h2>Add new entry</h2>
        <form onSubmit={submitHandler}>
          <div className="input-row">
            <label htmlFor="date">date: </label>
            <input
              type="text"
              id="date"
              name="date"
              value={newEntry.date}
              onChange={changeHandler}
            />
          </div>
          <div className="input-row">
            <label htmlFor="visibility">visibility: </label>
            <input
              type="text"
              id="visibility"
              name="visibility"
              value={newEntry.visibility}
              onChange={changeHandler}
            />
          </div>
          <div className="input-row">
            <label htmlFor="weather">Weather: </label>
            <input
              type="text"
              id="weather"
              name="weather"
              value={newEntry.weather}
              onChange={changeHandler}
            />
          </div>
          <div className="input-row">
            <label htmlFor="comment">Comment: </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={newEntry.comment}
              onChange={changeHandler}
            />
          </div>
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
