export interface IVisiteur {
  id: number;
  cv?: string | null;
}

export type NewVisiteur = Omit<IVisiteur, 'id'> & { id: null };
