import Content from './components/Content';
import Header from './components/Header';
import TotalExercises from './components/Total';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div className="main-container">
      <Header name={courseName} />
      <Content parts={courseParts} />
      <TotalExercises parts={courseParts} />
    </div>
  );
};

export default App;
