import data from '../../data/patientsData';

import { Patient, NonSensitivePatientInfo } from '../../types';

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
export default { getPatients, getNonSensitivePatientInfo };
