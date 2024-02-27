import React from 'react';
import { Diagnosis, Entry } from '../../types';

import { Health, Hospital, Occupational } from './PatientEntryCases';

interface entryProps {
  entry: Entry;
  diagnoseList: Diagnosis[] | null;
}
/* // example in material 
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}; */

// testing other option and found it also functional
const exhaustiveCheck = (entry: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
};

const PatientEntries: React.FC<entryProps> = ({ entry, diagnoseList }) => {
  if (diagnoseList === null) {
    // Handle the case where diagnoseList is null
    return <div>Loading diagnoses...</div>;
  }
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnoseList={diagnoseList} />;
    case 'OccupationalHealthcare':
      return <Occupational entry={entry} diagnoseList={diagnoseList} />;
    case 'HealthCheck':
      return <Health entry={entry} diagnoseList={diagnoseList} />;

    default:
      //return assertNever(entry);
      exhaustiveCheck(entry);
  }
};

export default PatientEntries;
