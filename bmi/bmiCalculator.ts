const parseArguments = (args: string[]) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments, check your input!')
  } else if (args.length > 4)
    throw new Error('Too many arguments, check your input!')
  if (!isNaN(+args[2]) && !isNaN(+args[3])) {
    console.log(args[2], typeof +args[2], args[3], typeof +args[3])
    return {
      input1: +args[2],
      input2: +args[3],
    }
  } else {
    throw new Error('Given values were not numbers, check your input!')
  }
}

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
  console.log(bmiCategory(index))
}

//console.log(calculateBmi(180, 74))

try {
  const { input1, input2 } = parseArguments(process.argv)
  calculateBmi(input1, input2)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened. '
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`
  }
  console.log(errorMessage)
}
