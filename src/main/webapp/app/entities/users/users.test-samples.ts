import { IUsers, NewUsers } from './users.model';

export const sampleWithRequiredData: IUsers = {
  id: 28636,
  email: 'Anselme_Royer86@yahoo.fr',
  password: 'à moins de euh',
  role: 'Admin',
};

export const sampleWithPartialData: IUsers = {
  id: 6725,
  email: 'Amiel_Bernard10@gmail.com',
  password: 'fidèle',
  role: 'Candidate',
  telephone: '+33 428971215',
  entreprise: 'manier énorme gestionnaire',
};

export const sampleWithFullData: IUsers = {
  id: 17995,
  email: 'Helier39@gmail.com',
  password: 'figurer hi avant de',
  name: 'parmi',
  role: 'Recruiter',
  telephone: '0682540307',
  entreprise: 'placide spécialiste',
};

export const sampleWithNewData: NewUsers = {
  email: 'Sabine.Huet@gmail.com',
  password: 'pis dessus au cas où',
  role: 'Recruiter',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
