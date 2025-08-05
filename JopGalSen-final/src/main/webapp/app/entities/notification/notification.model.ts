import { IUser } from 'app/entities/user/user.model';

export interface INotification {
  id: number;
  message?: string | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
