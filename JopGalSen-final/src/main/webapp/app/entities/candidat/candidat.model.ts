import { IUser } from 'app/entities/user/user.model';

export interface ICandidat {
  id: number;
  cv?: string | null;
  cvContentType?: string | null;
  tel?: string | null;
  profil?: string | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewCandidat = Omit<ICandidat, 'id'> & { id: null };
