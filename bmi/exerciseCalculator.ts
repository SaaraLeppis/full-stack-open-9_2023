interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseCalculatorArguments = (args: string[]) => {
  // if empty ("") values given, they will be removed
  // * * * NOTICED that they will be removed from input automatically, but to reminde how it would have been done:
  /* const removeEmpty = (listToChcek: string[]) => {
    return listToChcek.filter(str => str !== '')
  } */

  // removes 2 first from 'input'
  const slicedArgs = args.slice(2);

  // makes input values to numbers from strings
  const argsAsNumbers = slicedArgs.map(Number);

  // function to check if any item is not number (strings with letters will be NaN)
  const allNotNumbers = () => argsAsNumbers.some(item => isNaN(item));

  if (args.length < 4)
    throw new Error('Not enough arguments, check your input!');

  if (!allNotNumbers()) {
    return {
      input1: argsAsNumbers[0],
      input2: argsAsNumbers.slice(1),
    };
  } else {
    throw new Error('Given values were not numbers, check your input!');
  }
};

const description = (value: number): string => {
  switch (true) {
    case value === 1:
      return 'Move more, Breathe Easy!';
    case value === 2:
      return 'Well done, but surely you can do even better!';
    default:
      return 'Great work, keep on moving!';
  }
};

const calculateExercises = (hoursList: number[], target: number): Result => {
  const periodLength = hoursList.length;

  const trainingDaysList = hoursList.filter(hours => hours !== 0);

  const trainingHoursSum = hoursList.reduce((acc, current) => {
    return acc + current;
  }, 0);

  const averageTrainingHours = trainingHoursSum / periodLength;
  const rating =
    averageTrainingHours > target + 1
      ? 3
      : averageTrainingHours >= target
      ? 2
      : 1;

  return {
    periodLength,
    trainingDays: trainingDaysList.length,
    success: averageTrainingHours >= target ? true : false,
    rating,
    ratingDescription: description(rating),
    target: target,
    average: averageTrainingHours,
  };
};

//console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2))

try {
  const { input1, input2 } = parseCalculatorArguments(process.argv);
  console.log(calculateExercises(input2, input1));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened. ';
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
