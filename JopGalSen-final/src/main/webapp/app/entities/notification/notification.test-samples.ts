import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 10110,
  message: '../fake-data/blob/hipster.txt',
};

export const sampleWithPartialData: INotification = {
  id: 27987,
  message: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: INotification = {
  id: 5787,
  message: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewNotification = {
  message: '../fake-data/blob/hipster.txt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
