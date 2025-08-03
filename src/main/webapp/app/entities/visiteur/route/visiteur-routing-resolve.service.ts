import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVisiteur } from '../visiteur.model';
import { VisiteurService } from '../service/visiteur.service';

const visiteurResolve = (route: ActivatedRouteSnapshot): Observable<null | IVisiteur> => {
  const id = route.params.id;
  if (id) {
    return inject(VisiteurService)
      .find(id)
      .pipe(
        mergeMap((visiteur: HttpResponse<IVisiteur>) => {
          if (visiteur.body) {
            return of(visiteur.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default visiteurResolve;
