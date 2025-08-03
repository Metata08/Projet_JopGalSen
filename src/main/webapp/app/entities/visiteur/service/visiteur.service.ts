import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVisiteur, NewVisiteur } from '../visiteur.model';

export type PartialUpdateVisiteur = Partial<IVisiteur> & Pick<IVisiteur, 'id'>;

export type EntityResponseType = HttpResponse<IVisiteur>;
export type EntityArrayResponseType = HttpResponse<IVisiteur[]>;

@Injectable({ providedIn: 'root' })
export class VisiteurService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/visiteurs');

  create(visiteur: NewVisiteur): Observable<EntityResponseType> {
    return this.http.post<IVisiteur>(this.resourceUrl, visiteur, { observe: 'response' });
  }

  update(visiteur: IVisiteur): Observable<EntityResponseType> {
    return this.http.put<IVisiteur>(`${this.resourceUrl}/${this.getVisiteurIdentifier(visiteur)}`, visiteur, { observe: 'response' });
  }

  partialUpdate(visiteur: PartialUpdateVisiteur): Observable<EntityResponseType> {
    return this.http.patch<IVisiteur>(`${this.resourceUrl}/${this.getVisiteurIdentifier(visiteur)}`, visiteur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVisiteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVisiteur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVisiteurIdentifier(visiteur: Pick<IVisiteur, 'id'>): number {
    return visiteur.id;
  }

  compareVisiteur(o1: Pick<IVisiteur, 'id'> | null, o2: Pick<IVisiteur, 'id'> | null): boolean {
    return o1 && o2 ? this.getVisiteurIdentifier(o1) === this.getVisiteurIdentifier(o2) : o1 === o2;
  }

  addVisiteurToCollectionIfMissing<Type extends Pick<IVisiteur, 'id'>>(
    visiteurCollection: Type[],
    ...visiteursToCheck: (Type | null | undefined)[]
  ): Type[] {
    const visiteurs: Type[] = visiteursToCheck.filter(isPresent);
    if (visiteurs.length > 0) {
      const visiteurCollectionIdentifiers = visiteurCollection.map(visiteurItem => this.getVisiteurIdentifier(visiteurItem));
      const visiteursToAdd = visiteurs.filter(visiteurItem => {
        const visiteurIdentifier = this.getVisiteurIdentifier(visiteurItem);
        if (visiteurCollectionIdentifiers.includes(visiteurIdentifier)) {
          return false;
        }
        visiteurCollectionIdentifiers.push(visiteurIdentifier);
        return true;
      });
      return [...visiteursToAdd, ...visiteurCollection];
    }
    return visiteurCollection;
  }
}
