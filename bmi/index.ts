/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import calculateWebBmi from './utils/webBmi';
import calculateExercises from './utils/webExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateWebBmi(Number(height), Number(weight));
  if (!validParameters || !height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  res.send(bmi);
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  const target = body.target;
  const listOfExercises = body.daily_exercises;

  try {
    if (!target || !listOfExercises) {
      res.status(400).json({ error: 'Parameters missing' });
    } else if (isNaN(target) || listOfExercises.some(isNaN)) {
      res.status(400).json({ error: 'Malformated parameters' });
    } else {
      const result = calculateExercises(listOfExercises, target);
      res.status(200).json({ result });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Something went wrong' });
    }
  }
  console.log(calculateExercises(listOfExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
