import axios from 'axios';
import { Entry, NewDiaryEntry } from '../types';

const baseUrl: string = 'http://localhost:3000/api/diaries';

export const getData = () => {
  return axios.get<Entry[]>(baseUrl).then(response => response.data);
};

export const createData = (object: NewDiaryEntry) => {
  return axios.post<Entry>(baseUrl, object).then(response => response.data);
};
