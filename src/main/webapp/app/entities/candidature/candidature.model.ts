import dayjs from 'dayjs/esm';
import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { IOffre } from 'app/entities/offre/offre.model';

export interface ICandidature {
  id: number;
  motivationLetter?: string | null;
  cvFileUrl?: string | null;
  dateCandidature?: dayjs.Dayjs | null;
  visiteur?: IVisiteur | null;
  offre?: IOffre | null;
}

export type NewCandidature = Omit<ICandidature, 'id'> & { id: null };
