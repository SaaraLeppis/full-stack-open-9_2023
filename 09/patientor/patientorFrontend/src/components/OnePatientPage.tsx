import { useEffect, useState } from 'react';
import patients from '../services/patients';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';

const OnePatient = () => {
  const patientId: string | undefined = useParams().id;

  const [details, setDetails] = useState<Patient | null>(null);
  useEffect(() => {
    patients
      // .getById('d27736ec-f723-11e9-8f0b-362b9e155667')
      .getById(patientId)
      .then(data => setDetails(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>{details?.name}</h2>
      <p>ssn: {details?.ssn} </p>
      <p>occupation: {details?.occupation}</p>
    </>
  );
};

export default OnePatient;
