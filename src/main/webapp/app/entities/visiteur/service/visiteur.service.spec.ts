import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IVisiteur } from '../visiteur.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../visiteur.test-samples';

import { VisiteurService } from './visiteur.service';

const requireRestSample: IVisiteur = {
  ...sampleWithRequiredData,
};

describe('Visiteur Service', () => {
  let service: VisiteurService;
  let httpMock: HttpTestingController;
  let expectedResult: IVisiteur | IVisiteur[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(VisiteurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Visiteur', () => {
      const visiteur = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(visiteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Visiteur', () => {
      const visiteur = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(visiteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Visiteur', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Visiteur', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Visiteur', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVisiteurToCollectionIfMissing', () => {
      it('should add a Visiteur to an empty array', () => {
        const visiteur: IVisiteur = sampleWithRequiredData;
        expectedResult = service.addVisiteurToCollectionIfMissing([], visiteur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(visiteur);
      });

      it('should not add a Visiteur to an array that contains it', () => {
        const visiteur: IVisiteur = sampleWithRequiredData;
        const visiteurCollection: IVisiteur[] = [
          {
            ...visiteur,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVisiteurToCollectionIfMissing(visiteurCollection, visiteur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Visiteur to an array that doesn't contain it", () => {
        const visiteur: IVisiteur = sampleWithRequiredData;
        const visiteurCollection: IVisiteur[] = [sampleWithPartialData];
        expectedResult = service.addVisiteurToCollectionIfMissing(visiteurCollection, visiteur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(visiteur);
      });

      it('should add only unique Visiteur to an array', () => {
        const visiteurArray: IVisiteur[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const visiteurCollection: IVisiteur[] = [sampleWithRequiredData];
        expectedResult = service.addVisiteurToCollectionIfMissing(visiteurCollection, ...visiteurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const visiteur: IVisiteur = sampleWithRequiredData;
        const visiteur2: IVisiteur = sampleWithPartialData;
        expectedResult = service.addVisiteurToCollectionIfMissing([], visiteur, visiteur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(visiteur);
        expect(expectedResult).toContain(visiteur2);
      });

      it('should accept null and undefined values', () => {
        const visiteur: IVisiteur = sampleWithRequiredData;
        expectedResult = service.addVisiteurToCollectionIfMissing([], null, visiteur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(visiteur);
      });

      it('should return initial array if no Visiteur is added', () => {
        const visiteurCollection: IVisiteur[] = [sampleWithRequiredData];
        expectedResult = service.addVisiteurToCollectionIfMissing(visiteurCollection, undefined, null);
        expect(expectedResult).toEqual(visiteurCollection);
      });
    });

    describe('compareVisiteur', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVisiteur(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 21785 };
        const entity2 = null;

        const compareResult1 = service.compareVisiteur(entity1, entity2);
        const compareResult2 = service.compareVisiteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 21785 };
        const entity2 = { id: 5296 };

        const compareResult1 = service.compareVisiteur(entity1, entity2);
        const compareResult2 = service.compareVisiteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 21785 };
        const entity2 = { id: 21785 };

        const compareResult1 = service.compareVisiteur(entity1, entity2);
        const compareResult2 = service.compareVisiteur(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
