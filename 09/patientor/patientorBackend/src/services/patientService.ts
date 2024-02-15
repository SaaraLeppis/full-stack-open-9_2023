import data from '../../data/patientsData';
import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensitivePatientInfo,
  NewPatient,
  EntryWithoutId,
} from '../types';

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

//9.26
const addPatientEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patientIndex = patients.findIndex(p => p.id === id);
  const entryId: string = uuid();
  const newEntry = {
    id: entryId,
    ...entry,
  };

  patients[patientIndex].entries.push(newEntry);
  const patient = searchPatient(id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found after adding new entry`);
  }
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient,
  searchPatient,
  addPatientEntry,
};
