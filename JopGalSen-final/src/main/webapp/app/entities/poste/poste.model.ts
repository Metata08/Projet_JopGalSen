import { IDomaine } from 'app/entities/domaine/domaine.model';
import { IOffre } from 'app/entities/offre/offre.model';

export interface IPoste {
  id: number;
  nomPoste?: string | null;
  domaine?: Pick<IDomaine, 'id' | 'nomDomaine'> | null;
  offres?: Pick<IOffre, 'id'>[] | null;
}

export type NewPoste = Omit<IPoste, 'id'> & { id: null };
