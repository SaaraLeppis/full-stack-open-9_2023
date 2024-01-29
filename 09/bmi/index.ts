import express, { Application, Request, Response } from 'express'
import calculateWebBmi from './utils/webBmi'

const app: Application = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight))

  const bmi = calculateWebBmi(Number(height), Number(weight))
  if (!validParameters || !height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' })
  }
  res.send(bmi)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
