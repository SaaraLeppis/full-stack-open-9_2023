//import { CoursePartProps } from '../types';
import { CoursePart } from '../types';
import { Part } from './Part';

//const Content = ({ parts }: { parts: CoursePartProps[] }): JSX.Element => {
const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div className="content-container">
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
