import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  console.log('diagnosis', data);

  return data;
};

export default {
  getAllDiagnoses,
};
