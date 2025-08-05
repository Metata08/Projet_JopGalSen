import { IUser } from 'app/entities/user/user.model';

export interface IRecruteur {
  id: number;
  entreprise?: string | null;
  tel?: string | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewRecruteur = Omit<IRecruteur, 'id'> & { id: null };
