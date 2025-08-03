import { TypeRecruteur } from 'app/entities/enumerations/type-recruteur.model';

export interface IRecruteur {
  id: number;
  type?: keyof typeof TypeRecruteur | null;
}

export type NewRecruteur = Omit<IRecruteur, 'id'> & { id: null };
