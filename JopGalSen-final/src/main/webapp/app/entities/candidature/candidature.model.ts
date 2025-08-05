import dayjs from 'dayjs/esm';
import { IOffre } from 'app/entities/offre/offre.model';
import { ICandidat } from 'app/entities/candidat/candidat.model';
import { Statuts } from 'app/entities/enumerations/statuts.model';

export interface ICandidature {
  id: number;
  dateCandidature?: dayjs.Dayjs | null;
  statut?: keyof typeof Statuts | null;
  offre?: Pick<IOffre, 'id' | 'titre'> | null;
  candidat?: Pick<ICandidat, 'id'> | null;
}

export type NewCandidature = Omit<ICandidature, 'id'> & { id: null };
