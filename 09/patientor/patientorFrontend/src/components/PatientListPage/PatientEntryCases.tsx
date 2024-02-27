import {
  Diagnosis,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import { EntryTypeIcon, HealthCheckIcon } from './PatientEntryIcons';

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

export const Hospital: React.FC<{
  entry: HospitalEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  console.log(entry, 'in Hospitalcomponent');
  return (
    <div className="patient-entry hospital">
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
    </div>
  );
};
export const Occupational: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  return (
    <div className="patient-entry occupational">
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
      <div>
        Employer: {entry.employerName}
        {entry.sickLeave && (
          <>
            <p>sickleave starts: {entry.sickLeave?.startDate}</p>
            <p>sickleave ends: {entry.sickLeave?.endDate}</p>
          </>
        )}
      </div>
    </div>
  );
};
export const Health: React.FC<{
  entry: HealthCheckEntry;
  diagnoseList: Diagnosis[];
}> = ({ entry, diagnoseList }) => {
  return (
    <div className="patient-entry healthcheck">
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
    </div>
  );
};
