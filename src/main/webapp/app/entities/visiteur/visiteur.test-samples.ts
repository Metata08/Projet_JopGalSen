import { IVisiteur, NewVisiteur } from './visiteur.model';

export const sampleWithRequiredData: IVisiteur = {
  id: 20078,
};

export const sampleWithPartialData: IVisiteur = {
  id: 7079,
  cv: 'sympathique délégation',
};

export const sampleWithFullData: IVisiteur = {
  id: 25471,
  cv: 'de peur que',
};

export const sampleWithNewData: NewVisiteur = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
