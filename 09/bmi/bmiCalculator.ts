const bmiCategory = (bmi: number): string => {
  // based on wikipedia 23/1/24 https://en.wikipedia.org/wiki/Body_mass_index
  switch (true) {
    case bmi < 16:
      return 'Severely underweight'
    case bmi < 17:
      return 'Moderate underweight'
    case bmi < 18.5:
      return 'Underweight'
    case bmi < 25:
      return 'Normal (healthy weight)'
    case bmi < 30:
      return 'Overweight'
    case bmi < 35:
      return 'Obese (Class I)'
    case bmi < 40:
      return 'Obese (Class II)'
    default:
      return 'Obese (Class III)'
  }
}
const calculateBmi = (height: number, weight: number) => {
  const index = weight / (height / 100) ** 2
  return bmiCategory(index)
}

console.log(calculateBmi(180, 74))
