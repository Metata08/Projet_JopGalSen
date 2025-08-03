import dayjs from 'dayjs/esm';

import { IOffre, NewOffre } from './offre.model';

export const sampleWithRequiredData: IOffre = {
  id: 11043,
  title: 'vouh verger abandonner',
  company: 'auprès de grandement quoique',
  type: 'CDD',
};

export const sampleWithPartialData: IOffre = {
  id: 19680,
  title: 'étant donné que',
  company: 'à raison de minuscule ouille',
  type: 'STAGE',
  skills: 'du fait que',
};

export const sampleWithFullData: IOffre = {
  id: 14500,
  title: 'raser vu que bzzz',
  company: 'spécialiste hebdomadaire',
  location: 'souper vétuste',
  type: 'STAGE',
  salary: 'membre du personnel',
  description: '../fake-data/blob/hipster.txt',
  skills: 'naître passablement',
  experienceLevel: 'au-dessous de souple',
  postedDate: dayjs('2025-07-31T08:09'),
};

export const sampleWithNewData: NewOffre = {
  title: 'tellement',
  company: 'sous',
  type: 'CDI',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
