import dayjs from 'dayjs/esm';

import { ICandidature, NewCandidature } from './candidature.model';

export const sampleWithRequiredData: ICandidature = {
  id: 28558,
};

export const sampleWithPartialData: ICandidature = {
  id: 8476,
  motivationLetter: '../fake-data/blob/hipster.txt',
  dateCandidature: dayjs('2025-08-01T12:33'),
};

export const sampleWithFullData: ICandidature = {
  id: 23153,
  motivationLetter: '../fake-data/blob/hipster.txt',
  cvFileUrl: 'rose inciter environ',
  dateCandidature: dayjs('2025-07-31T23:28'),
};

export const sampleWithNewData: NewCandidature = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
