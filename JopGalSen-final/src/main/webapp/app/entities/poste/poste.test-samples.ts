import { IPoste, NewPoste } from './poste.model';

export const sampleWithRequiredData: IPoste = {
  id: 21776,
  nomPoste: 'de peur que solliciter',
};

export const sampleWithPartialData: IPoste = {
  id: 1948,
  nomPoste: 'tout à fait',
};

export const sampleWithFullData: IPoste = {
  id: 17229,
  nomPoste: 'atchoum cogner',
};

export const sampleWithNewData: NewPoste = {
  nomPoste: 'comprendre',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
