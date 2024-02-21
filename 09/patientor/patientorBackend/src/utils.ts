import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnoses,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from './types';

// helper functions for validation
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

// validation functions
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseString = (target: unknown, description: string): string => {
  console.log('hi there');
  if (!target || !isString(target)) {
    throw new Error(`Incorrect or missing ${description}`);
  }
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
// for ** NEW PATIENT **
export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data in patient details ${object}`);
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: [],
    };
    return newPatientEntry;
  }
  throw new Error(`Incorrect data: some fields are missing`);
};

// options for ** NEW ENTRY **
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

// for existing Patient's ** NEW ENTRY **
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
