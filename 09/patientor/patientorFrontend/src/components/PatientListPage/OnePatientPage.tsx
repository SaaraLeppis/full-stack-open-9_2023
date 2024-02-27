import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import diagnoses from '../../services/diagnoses';
import { Diagnosis, Entry, Patient } from '../../types';
import PatientEntries from './PatientEntries';
import { NewEntryForm } from './NewEntryForm';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Button from '@mui/material/Button';

const OnePatient = () => {
  const patientId: string | undefined = useParams().id;

  const [details, setDetails] = useState<Patient | null>(null);
  const [diagnoseList, setDiagnoseList] = useState<Diagnosis[] | null>([]);
  const [openEntryForm, setOpenEntryForm] = useState(false);

  const handleEntryForm = (entryFormState: boolean, newEntry: Entry): void => {
    setOpenEntryForm(entryFormState);
    if (newEntry) {
      setDetails(prevDetails => {
        if (prevDetails) {
          return {
            ...prevDetails,
            entries: [...prevDetails.entries, newEntry],
          };
        }
        return null; // Return null if prevDetails is null
      });
    }
  };

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
        <NewEntryForm
          handleForm={handleEntryForm}
          openForm={openEntryForm}
          entryList={details?.entries}
          patientId={patientId}
          setEntryFormOpen={setOpenEntryForm}
        />
        {details?.entries.length === 0 && <p>no entries</p>}
        {details?.entries.map(e => (
          <div key={e.id}>
            <PatientEntries entry={e} diagnoseList={diagnoseList} />
          </div>
        ))}
        <Button variant="contained" onClick={() => setOpenEntryForm(true)}>
          Add New Entry
        </Button>
      </div>
    </>
  );
};

export default OnePatient;
