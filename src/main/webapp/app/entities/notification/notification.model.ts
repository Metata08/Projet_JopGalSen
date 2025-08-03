import { IUsers } from 'app/entities/users/users.model';
import { TypeNotification } from 'app/entities/enumerations/type-notification.model';

export interface INotification {
  id: number;
  message?: string | null;
  typeNotif?: keyof typeof TypeNotification | null;
  user?: IUsers | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
