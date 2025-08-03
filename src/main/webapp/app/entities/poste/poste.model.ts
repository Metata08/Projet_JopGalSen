import { IDomaine } from 'app/entities/domaine/domaine.model';

export interface IPoste {
  id: number;
  nomPoste?: string | null;
  domaine?: IDomaine | null;
}

export type NewPoste = Omit<IPoste, 'id'> & { id: null };
