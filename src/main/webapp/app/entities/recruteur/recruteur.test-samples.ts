import { IRecruteur, NewRecruteur } from './recruteur.model';

export const sampleWithRequiredData: IRecruteur = {
  id: 7612,
  type: 'PARTICULIER',
};

export const sampleWithPartialData: IRecruteur = {
  id: 31099,
  type: 'ENTREPRISE',
};

export const sampleWithFullData: IRecruteur = {
  id: 22999,
  type: 'PARTICULIER',
};

export const sampleWithNewData: NewRecruteur = {
  type: 'PARTICULIER',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
