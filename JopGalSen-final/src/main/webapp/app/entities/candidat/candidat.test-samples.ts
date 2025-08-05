import { ICandidat, NewCandidat } from './candidat.model';

export const sampleWithRequiredData: ICandidat = {
  id: 18880,
};

export const sampleWithPartialData: ICandidat = {
  id: 29576,
  cv: '../fake-data/blob/hipster.png',
  cvContentType: 'unknown',
  tel: 'miam groin groin',
  profil: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICandidat = {
  id: 11710,
  cv: '../fake-data/blob/hipster.png',
  cvContentType: 'unknown',
  tel: 'dans la mesure où déjà de sorte que',
  profil: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCandidat = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
