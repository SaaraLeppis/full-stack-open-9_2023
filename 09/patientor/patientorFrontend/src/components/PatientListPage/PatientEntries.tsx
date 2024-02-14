import React from 'react';
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import Favorite from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospital from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import {
  green,
  orange,
  grey,
  red,
  brown,
  lightBlue,
} from '@mui/material/colors';

interface entryProps {
  entry: Entry;
  diagnoseList: Diagnosis[] | null;
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getDiagnosisName = (
  diagnosisCodes: string[] | undefined,
  diagnoseList: Diagnosis[]
): string | undefined => {
  if (!diagnosisCodes) return undefined;

  for (const code of diagnosisCodes) {
    const diagnosis = diagnoseList.find(d => d.code === code);
    if (diagnosis) return diagnosis.name;
  }

  return undefined;
};

const HealthCheckIcon: React.FC<{ rate: HealthCheckRating }> = ({ rate }) => {
  let color;
  switch (rate) {
    case HealthCheckRating.Healthy:
      color = green['A400'];
      break;
    case HealthCheckRating.LowRisk:
      color = lightBlue[400];
      break;
    case HealthCheckRating.HighRisk:
      color = orange[500];
      break;
    case HealthCheckRating.CriticalRisk:
      color = brown[400];
      break;
    default:
      color = 'default';
  }
  return <Favorite style={{ color, verticalAlign: 'bottom' }} />;
};
const EntryTypeIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <LocalHospital style={{ color: red[400], verticalAlign: 'bottom' }} />
      );
      break;
    case 'OccupationalHealthcare':
      return <WorkIcon style={{ color: grey[800], verticalAlign: 'bottom' }} />;
      break;
    case 'HealthCheck':
      return (
        <MedicalInformationIcon
          style={{ color: lightBlue[400], verticalAlign: 'bottom' }}
        />
      );
      break;
    default:
      break;
  }
};
const Hospital: React.FC<{
  entry: HospitalEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  console.log(entry, 'in Hospitalcomponent');
  return (
    <>
      <p>
        {entry.date} <EntryTypeIcon entry={entry} />
        <br />
        {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map(c => {
          const diagnosisName = getDiagnosisName([c], diagnoseList);
          console.log('diagnoosi', diagnosisName);
          return (
            <li key={c}>
              {c} {diagnosisName ? <>{diagnosisName}</> : ''}
            </li>
          );
        })}
      </ul>
      <p>
        {entry.discharge.date}
        {entry.discharge.criteria}
      </p>
    </>
  );
};
const Occupational: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  return (
    <>
      <p>
        {entry.date} <EntryTypeIcon entry={entry} /> <br />
        {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map(c => {
          const diagnosisName = getDiagnosisName([c], diagnoseList);
          return (
            <li key={c}>
              {c} {diagnosisName ? <>{diagnosisName}</> : ''}
            </li>
          );
        })}
      </ul>
      <p>
        Employer: {entry.employerName}
        {entry.sickLeave && (
          <>
            <p>sickleave starts: {entry.sickLeave?.startDate}</p>
            <p>sickleave ends: {entry.sickLeave?.endDate}</p>
          </>
        )}
      </p>
    </>
  );
};
const Health: React.FC<{
  entry: HealthCheckEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  console.log(entry, 'in HCcomponent');
  return (
    <>
      <p>
        {entry.date} <EntryTypeIcon entry={entry} />
        <br />
        {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map(c => {
          const diagnosisName = getDiagnosisName([c], diagnoseList);
          return (
            <li key={c}>
              {c} {diagnosisName ? <>{diagnosisName}</> : ''}
            </li>
          );
        })}
      </ul>
      <p>
        Health:
        <HealthCheckIcon rate={entry.healthCheckRating} />
      </p>
    </>
  );
};

const PatientEntries: React.FC<entryProps> = ({ entry, diagnoseList }) => {
  // <EntryDetails entry={entry} diagnoseList={diagnoseList} />
  if (diagnoseList === null) {
    // Handle the case where diagnoseList is null
    return <div>Loading diagnoses...</div>;
  }
  switch (entry.type) {
    case 'Hospital':
      return (
        <div className="patient-entry hospital">
          <Hospital entry={entry} diagnoseList={diagnoseList} />
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div className="patient-entry occupational">
          <Occupational entry={entry} diagnoseList={diagnoseList} />
        </div>
      );
    case 'HealthCheck':
      return (
        <div className="patient-entry healthcheck">
          <Health entry={entry} diagnoseList={diagnoseList} />
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default PatientEntries;
