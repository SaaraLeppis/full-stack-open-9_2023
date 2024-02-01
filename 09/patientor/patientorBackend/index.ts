import express from 'express';
import diagnoseRouter from './src/routes/diagnoses';
const app = express();
const cors = require('cors');
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('Hello pinger');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});