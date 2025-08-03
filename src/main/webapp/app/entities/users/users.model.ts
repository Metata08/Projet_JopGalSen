import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { Roles } from 'app/entities/enumerations/roles.model';

export interface IUsers {
  id: number;
  email?: string | null;
  password?: string | null;
  name?: string | null;
  role?: keyof typeof Roles | null;
  telephone?: string | null;
  entreprise?: string | null;
  visiteur?: IVisiteur | null;
  recruteur?: IRecruteur | null;
}

export type NewUsers = Omit<IUsers, 'id'> & { id: null };
