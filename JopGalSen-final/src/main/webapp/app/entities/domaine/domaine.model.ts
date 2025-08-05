export interface IDomaine {
  id: number;
  nomDomaine?: string | null;
}

export type NewDomaine = Omit<IDomaine, 'id'> & { id: null };
