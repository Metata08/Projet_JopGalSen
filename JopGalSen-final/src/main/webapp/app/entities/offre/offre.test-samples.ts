import dayjs from 'dayjs/esm';

import { IOffre, NewOffre } from './offre.model';

export const sampleWithRequiredData: IOffre = {
  id: 11043,
  titre: 'vouh verger abandonner',
  contrat: 'STAGE',
};

export const sampleWithPartialData: IOffre = {
  id: 13353,
  titre: 'à condition que',
  categorie: 'pourvu que jusqu’à ce que',
  dateDePostule: dayjs('2025-08-05'),
  dateDeFin: dayjs('2025-08-05'),
  remuneration: 21882,
  contrat: 'CDD',
};

export const sampleWithFullData: IOffre = {
  id: 14500,
  titre: 'raser vu que bzzz',
  description: '../fake-data/blob/hipster.txt',
  entreprise: 'spécialiste hebdomadaire',
  localite: 'souper vétuste',
  categorie: 'police approximativement vraisemblablement',
  experience: 'ouch à la merci',
  exigences: 'pêcher collègue clientèle',
  benefice: 'glouglou',
  dateDePostule: dayjs('2025-08-04'),
  dateDeFin: dayjs('2025-08-04'),
  urgent: false,
  remuneration: 16299,
  contrat: 'CDD',
};

export const sampleWithNewData: NewOffre = {
  titre: 'tellement',
  contrat: 'CDD',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
