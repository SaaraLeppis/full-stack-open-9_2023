import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import diagnoses from '../../services/diagnoses';
import { Diagnosis, Patient } from '../../types';
import PatientEntries from './PatientEntries';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const OnePatient = () => {
  const patientId: string | undefined = useParams().id;

  const [details, setDetails] = useState<Patient | null>(null);
  const [diagnoseList, setDiagnoseList] = useState<Diagnosis[] | null>([]);
  useEffect(() => {
    patients
      // .getById('d27736ec-f723-11e9-8f0b-362b9e155667')
      .getById(patientId)
      .then(data => setDetails(data));
    diagnoses.getAllDiagnoses().then(data => setDiagnoseList(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>
        {details?.name}
        {details?.gender === 'male' ? (
          <MaleIcon />
        ) : details?.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <></>
      <p>ssn: {details?.ssn} </p>
      <p>occupation: {details?.occupation}</p>

      <div className="entry-section">
        <h3>entries</h3>
        {details?.entries.length === 0 && <p>no entries</p>}
        {details?.entries.map(e => (
          <div key={e.id}>
            <PatientEntries entry={e} diagnoseList={diagnoseList} />
          </div>
        ))}
      </div>
    </>
  );
};

export default OnePatient;
