import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnoses,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(param);
};

const isValidRange = (value: unknown): boolean => {
  return Number.isInteger(value);
};
const isHealthRating = (
  healthRating: number
): healthRating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map(value => value)
    .includes(healthRating);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  console.log(occupation);
  return occupation;
};

const parseString = (target: unknown, description: string): string => {
  if (!target || !isString(target)) {
    throw new Error(`Incorrect or missing ${description}`);
  }
  console.log('new checker');
  return target;
};
const parseCodes = (target: unknown): Array<Diagnoses['code']> => {
  if (!target || typeof target !== 'object' || !('diagnosisCodes' in target)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnoses['code']>;
  }
  return target.diagnosisCodes as Array<Diagnoses['code']>;
};

const parseRating = (value: unknown): HealthCheckRating => {
  if (
    !isValidRange(value) ||
    typeof value !== 'number' ||
    !isHealthRating(value)
  ) {
    throw new Error(`Incorrect or missing health check rate`);
  }
  return value;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sick leave data');
  }

  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }

  throw new Error('Incorrect sickleave data');
};
const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge data');
  }

  if ('date' in discharge && 'criteria' in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria, 'discharge criteria'),
    };
  }
  throw new Error('Incorrect discharge data');
};
// for new patients
export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data in patient details');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const validateHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data in new entry');
  }
  if (
    'date' in object &&
    'description' in object &&
    'specialist' in object &&
    'type' in object &&
    'healthCheckRating' in object
  ) {
    const validatedHealthCheckEntry = {
      date: parseDate(object.date),
      description: parseString(object.description, 'description'),
      specialist: parseString(object.specialist, 'specialist'),
      type: parseString(object.type, 'type') as 'HealthCheck',
      healthCheckRating: parseRating(object.healthCheckRating),
    };
    return validatedHealthCheckEntry;
  }
  throw new Error('Missing or invalid parameters!');
};

const validateOccupationalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data in new entry');
  }
  if (
    'date' in object &&
    'description' in object &&
    'specialist' in object &&
    'type' in object &&
    'employerName' in object
  ) {
    const validatedOccupationalEntry = {
      date: parseDate(object.date),
      description: parseString(object.description, 'description'),
      specialist: parseString(object.specialist, 'specialist'),
      type: parseString(object.type, 'type') as 'OccupationalHealthcare',
      employerName: parseString(object.employerName, 'employername'),
    };
    return validatedOccupationalEntry;
  }
  throw new Error('Missing or invalid parameters!');
};
const validateHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data in new entry');
  }
  if (
    'date' in object &&
    'description' in object &&
    'specialist' in object &&
    'type' in object &&
    'discharge' in object
  ) {
    const validatedHospitalEntry = {
      date: parseDate(object.date),
      description: parseString(object.description, 'description'),
      specialist: parseString(object.specialist, 'specialist'),
      type: parseString(object.type, 'type') as 'Hospital',
      discharge: parseDischarge(object.discharge),
    };
    return validatedHospitalEntry;
  }
  throw new Error('Missing or invalid parameters!');
};
// for existing Patient's new entry
export const toNewEntry = (object: EntryWithoutId): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data in new entry');
  }
  let validatedNewEntry: EntryWithoutId;

  switch (object.type) {
    case 'HealthCheck':
      validatedNewEntry = validateHealthCheckEntry(object);
      if (object.diagnosisCodes) {
        parseCodes(object.diagnosisCodes);
      }
      return validatedNewEntry;
    case 'OccupationalHealthcare':
      validatedNewEntry = validateOccupationalEntry(object);
      if (object.sickLeave) {
        parseSickLeave(object.sickLeave);
      } else if (object.diagnosisCodes) {
        parseCodes(object.diagnosisCodes);
      }
      return validatedNewEntry;

    case 'Hospital':
      validatedNewEntry = validateHospitalEntry(object);
      if (object.diagnosisCodes) {
        parseCodes(object.diagnosisCodes);
      } else if (object.discharge) {
        parseDischarge(object.discharge);
      }
      return validatedNewEntry;

    default:
      throw new Error('Invalid entry type');
  }
};
