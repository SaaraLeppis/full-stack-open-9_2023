import { SyntheticEvent, useState } from 'react';
import { TextField, Grid, Button, Alert } from '@mui/material';
import { Entry, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';

interface Props {
  openForm: boolean;
  handleForm: (what: boolean, newEntry: Entry) => void;
  setEntryFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entryList: Entry[] | undefined;
  patientId: string | undefined;
}

export const NewEntryForm = ({
  handleForm,
  setEntryFormOpen,
  openForm,
  patientId,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleDiagnosisCodes = (value: string) => {
    const codeArray = value.split(',').map(code => code.trim());
    setDiagnosisCodes(codeArray);
  };
  const errorHandler = (message: string) => {
    setErrorMessage(message.replace('Something went wrong. ', ''));
    setTimeout(() => setErrorMessage(''), 5000);
  };
  const clearForm = () => {
    setTimeout(() => {
      setDescription('');
      setDate('');
      setDiagnosisCodes([]);
      setErrorMessage('');
      setHealthCheckRating(0);
      setSpecialist('');
    }, 1100);
  };

  /* // today's date    
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  }; */
  const addHelthCheckEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryWithoutId = {
      date,
      specialist,
      type: 'HealthCheck',
      description,
      healthCheckRating,
      diagnosisCodes,
    };
    if (patientId) {
      try {
        const entry = await patientService.addPatientEntry(patientId, newEntry);
        setTimeout(() => {
          handleForm(false, entry);
        }, 1000);
        clearForm();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message: string = error.response?.data;
          console.error(message);
          errorHandler(message);
        } else {
          console.error('Unknown error', error);
          setErrorMessage('Unknown error');
        }
      }
    } else {
      console.error('Patient Id missing');
      setErrorMessage('Patient id missing');
    }
  };

  return (
    <>
      <div className="error-message">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
      {openForm && (
        <div className="entry-form">
          <h3>New HealthCheck entry</h3>
          <form onSubmit={addHelthCheckEntry}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              variant="standard"
              focused
              required
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              fullWidth
              value={date}
              placeholder="YYYY-MM-DD"
              variant="standard"
              focused
              required
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Diagnosis codes"
              fullWidth
              value={diagnosisCodes}
              variant="standard"
              focused
              onChange={({ target }) => handleDiagnosisCodes(target.value)}
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              variant="standard"
              focused
              required
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              label="Healthcheck rating "
              fullWidth
              value={
                healthCheckRating !== null ? healthCheckRating.toString() : ''
              }
              variant="standard"
              focused
              required
              onChange={({ target }) => setHealthCheckRating(+target.value)}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={() => setEntryFormOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </>
  );
};
