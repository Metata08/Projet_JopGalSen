import dayjs from 'dayjs/esm';

import { ICandidature, NewCandidature } from './candidature.model';

export const sampleWithRequiredData: ICandidature = {
  id: 28558,
  dateCandidature: dayjs('2025-08-05'),
  statut: 'EN_ATTENTE',
};

export const sampleWithPartialData: ICandidature = {
  id: 14253,
  dateCandidature: dayjs('2025-08-05'),
  statut: 'ACCEPTEE',
};

export const sampleWithFullData: ICandidature = {
  id: 23153,
  dateCandidature: dayjs('2025-08-05'),
  statut: 'REFUSEE',
};

export const sampleWithNewData: NewCandidature = {
  dateCandidature: dayjs('2025-08-04'),
  statut: 'REFUSEE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
