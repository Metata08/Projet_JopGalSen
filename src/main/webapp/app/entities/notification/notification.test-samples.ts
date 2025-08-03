import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 10110,
};

export const sampleWithPartialData: INotification = {
  id: 1745,
};

export const sampleWithFullData: INotification = {
  id: 5787,
  message: '../fake-data/blob/hipster.txt',
  typeNotif: 'ALERT',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
