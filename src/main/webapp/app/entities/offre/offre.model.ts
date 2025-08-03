import dayjs from 'dayjs/esm';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { IPoste } from 'app/entities/poste/poste.model';
import { TypeContrat } from 'app/entities/enumerations/type-contrat.model';

export interface IOffre {
  id: number;
  title?: string | null;
  company?: string | null;
  location?: string | null;
  type?: keyof typeof TypeContrat | null;
  salary?: string | null;
  description?: string | null;
  skills?: string | null;
  experienceLevel?: string | null;
  postedDate?: dayjs.Dayjs | null;
  recruteur?: IRecruteur | null;
  poste?: IPoste | null;
}

export type NewOffre = Omit<IOffre, 'id'> & { id: null };
