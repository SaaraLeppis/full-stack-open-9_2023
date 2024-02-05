import { CoursePartProps } from '../types';

const Content = ({ parts }: { parts: CoursePartProps[] }): JSX.Element => {
  return (
    <div className="content-container">
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
