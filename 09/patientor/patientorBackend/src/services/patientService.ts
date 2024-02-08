import data from '../../data/patientsData';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientInfo, NewPatient } from '../types';

const patients: Patient[] = data;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const searchPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient,
  searchPatient,
};
