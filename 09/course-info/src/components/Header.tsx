import { NameProps } from '../types';

const Header = ({ name }: NameProps): JSX.Element => {
  return (
    <div className="header-sectiom">
      <h1>{name}</h1>
    </div>
  );
};

export default Header;
