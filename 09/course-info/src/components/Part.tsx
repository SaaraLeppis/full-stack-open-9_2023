import { CoursePart } from '../types';
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  return (
    <div className="part-section">
      <p>
        {part.name} {part.exerciseCount}
      </p>
      {(() => {
        switch (part.kind) {
          case 'basic':
            return <p className="part">{part.description}</p>;
          case 'group':
            return (
              <p className="part">project exercises {part.groupProjectCount}</p>
            );
          case 'background':
            return (
              <p className="part">
                {part.description} <br />
                submit to{' '}
                <a
                  href={part.backgroundMaterial}
                  target="_blank"
                  rel="norefferer"
                >
                  {part.backgroundMaterial}
                </a>
              </p>
            );
          case 'special':
            return (
              <p className="part">
                {part.description} <br />
                required skills: {part.requirements.join(', ')}
              </p>
            );

          default:
            return assertNever(part);
        }
      })()}
    </div>
  );
};
