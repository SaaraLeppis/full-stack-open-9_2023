import diagnoseData from '../../data/diagnoseData';

import Diagnoses from '../../types';

const diagnoses: Diagnoses[] = diagnoseData;

const getEntries = (): Diagnoses[] => {
  return diagnoses;
};

export default { getEntries };
