import { useEffect, useState } from 'react';
import axios from 'axios';
interface Entries {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

function App() {
  const [diaryData, setDiaryData] = useState<Entries[]>([]);
  useEffect(() => {
    axios.get<Entries[]>('http://localhost:3000/api/diaries').then(response => {
      const dataInDiary = response.data;
      console.log(dataInDiary);
      setDiaryData(dataInDiary as Entries[]);
    });
  }, []);

  return (
    <>
      <h1>Flight diary</h1>
      <div className="entires">
        <h2>Diary entries</h2>
        {diaryData.map(data => (
          <li key={data.id}>
            {data.date} {data.weather} {data.visibility}
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
