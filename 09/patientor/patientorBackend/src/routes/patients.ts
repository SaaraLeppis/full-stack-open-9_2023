import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
import { toNewEntry } from '../utils';
import { EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message);
  }
});

//9.20

router.get('/:id', (req, res) => {
  try {
    const searchedPatientID = req.params.id;
    const details = patientService.searchPatient(searchedPatientID);
    details ? res.json(details) : res.status(404).send('id not found');
  } catch (error) {
    console.log(error);
    if (error instanceof Error) res.status(400).send(error.message);
  }
});

//9.26

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry: EntryWithoutId = toNewEntry(req.body as EntryWithoutId);

    const newPatientEntry = patientService.addPatientEntry(
      patientId.toString(),
      newEntry
    );
    res.send(newPatientEntry);
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message);
  }
});

export default router;
