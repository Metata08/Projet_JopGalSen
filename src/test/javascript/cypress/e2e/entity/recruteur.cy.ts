import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Recruteur e2e test', () => {
  const recruteurPageUrl = '/recruteur';
  const recruteurPageUrlPattern = new RegExp('/recruteur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const recruteurSample = { type: 'PARTICULIER' };

  let recruteur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/recruteurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/recruteurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/recruteurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (recruteur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/recruteurs/${recruteur.id}`,
      }).then(() => {
        recruteur = undefined;
      });
    }
  });

  it('Recruteurs menu should load Recruteurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('recruteur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Recruteur').should('exist');
    cy.url().should('match', recruteurPageUrlPattern);
  });

  describe('Recruteur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(recruteurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Recruteur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/recruteur/new$'));
        cy.getEntityCreateUpdateHeading('Recruteur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', recruteurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/recruteurs',
          body: recruteurSample,
        }).then(({ body }) => {
          recruteur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/recruteurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [recruteur],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(recruteurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Recruteur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('recruteur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', recruteurPageUrlPattern);
      });

      it('edit button click should load edit Recruteur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Recruteur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', recruteurPageUrlPattern);
      });

      it('edit button click should load edit Recruteur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Recruteur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', recruteurPageUrlPattern);
      });

      it('last delete button click should delete instance of Recruteur', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('recruteur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', recruteurPageUrlPattern);

        recruteur = undefined;
      });
    });
  });

  describe('new Recruteur page', () => {
    beforeEach(() => {
      cy.visit(`${recruteurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Recruteur');
    });

    it('should create an instance of Recruteur', () => {
      cy.get(`[data-cy="type"]`).select('ENTREPRISE');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        recruteur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', recruteurPageUrlPattern);
    });
  });
});
