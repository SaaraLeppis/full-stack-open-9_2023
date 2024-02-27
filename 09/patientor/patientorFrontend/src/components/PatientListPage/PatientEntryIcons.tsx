import Favorite from '@mui/icons-material/Favorite';
import { Entry, HealthCheckRating } from '../../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospital from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import {
  green,
  orange,
  grey,
  red,
  brown,
  lightBlue,
} from '@mui/material/colors';

export const HealthCheckIcon: React.FC<{ rate: HealthCheckRating }> = ({
  rate,
}) => {
  let color;
  switch (rate) {
    case HealthCheckRating.Healthy:
      color = green['A400'];
      break;
    case HealthCheckRating.LowRisk:
      color = lightBlue[400];
      break;
    case HealthCheckRating.HighRisk:
      color = orange[500];
      break;
    case HealthCheckRating.CriticalRisk:
      color = brown[400];
      break;
    default:
      color = 'default';
  }
  return <Favorite style={{ color, verticalAlign: 'bottom' }} />;
};
export const EntryTypeIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <LocalHospital style={{ color: red[400], verticalAlign: 'bottom' }} />
      );
    case 'OccupationalHealthcare':
      return <WorkIcon style={{ color: grey[800], verticalAlign: 'bottom' }} />;
    case 'HealthCheck':
      return (
        <MedicalInformationIcon
          style={{ color: lightBlue[400], verticalAlign: 'bottom' }}
        />
      );
    default:
      break;
  }
};
