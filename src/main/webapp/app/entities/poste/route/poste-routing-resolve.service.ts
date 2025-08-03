import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPoste } from '../poste.model';
import { PosteService } from '../service/poste.service';

const posteResolve = (route: ActivatedRouteSnapshot): Observable<null | IPoste> => {
  const id = route.params.id;
  if (id) {
    return inject(PosteService)
      .find(id)
      .pipe(
        mergeMap((poste: HttpResponse<IPoste>) => {
          if (poste.body) {
            return of(poste.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default posteResolve;
