import { IDomaine, NewDomaine } from './domaine.model';

export const sampleWithRequiredData: IDomaine = {
  id: 4899,
  nomDomaine: 'hebdomadaire',
};

export const sampleWithPartialData: IDomaine = {
  id: 12693,
  nomDomaine: 'collègue proche de',
};

export const sampleWithFullData: IDomaine = {
  id: 3417,
  nomDomaine: 'marcher',
};

export const sampleWithNewData: NewDomaine = {
  nomDomaine: 'ensemble porte-parole',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
