interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

export default calculateExercises;
