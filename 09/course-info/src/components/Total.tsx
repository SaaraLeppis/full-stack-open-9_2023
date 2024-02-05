import { CoursePart } from '../types';

const TotalExercises = ({ parts }: { parts: CoursePart[] }) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default TotalExercises;
