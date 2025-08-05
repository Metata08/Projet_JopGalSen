import dayjs from 'dayjs/esm';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { IPoste } from 'app/entities/poste/poste.model';
import { TypeContrat } from 'app/entities/enumerations/type-contrat.model';

export interface IOffre {
  id: number;
  titre?: string | null;
  description?: string | null;
  entreprise?: string | null;
  localite?: string | null;
  categorie?: string | null;
  experience?: string | null;
  exigences?: string | null;
  benefice?: string | null;
  dateDePostule?: dayjs.Dayjs | null;
  dateDeFin?: dayjs.Dayjs | null;
  urgent?: boolean | null;
  remuneration?: number | null;
  contrat?: keyof typeof TypeContrat | null;
  recruteur?: Pick<IRecruteur, 'id' | 'entreprise'> | null;
  postes?: Pick<IPoste, 'id' | 'nomPoste'>[] | null;
}

export type NewOffre = Omit<IOffre, 'id'> & { id: null };
