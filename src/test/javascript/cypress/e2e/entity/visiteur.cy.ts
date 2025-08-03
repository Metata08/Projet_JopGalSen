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

describe('Visiteur e2e test', () => {
  const visiteurPageUrl = '/visiteur';
  const visiteurPageUrlPattern = new RegExp('/visiteur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const visiteurSample = {};

  let visiteur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/visiteurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/visiteurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/visiteurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (visiteur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/visiteurs/${visiteur.id}`,
      }).then(() => {
        visiteur = undefined;
      });
    }
  });

  it('Visiteurs menu should load Visiteurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('visiteur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Visiteur').should('exist');
    cy.url().should('match', visiteurPageUrlPattern);
  });

  describe('Visiteur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(visiteurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Visiteur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/visiteur/new$'));
        cy.getEntityCreateUpdateHeading('Visiteur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', visiteurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/visiteurs',
          body: visiteurSample,
        }).then(({ body }) => {
          visiteur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/visiteurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [visiteur],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(visiteurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Visiteur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('visiteur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', visiteurPageUrlPattern);
      });

      it('edit button click should load edit Visiteur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Visiteur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', visiteurPageUrlPattern);
      });

      it('edit button click should load edit Visiteur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Visiteur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', visiteurPageUrlPattern);
      });

      it('last delete button click should delete instance of Visiteur', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('visiteur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', visiteurPageUrlPattern);

        visiteur = undefined;
      });
    });
  });

  describe('new Visiteur page', () => {
    beforeEach(() => {
      cy.visit(`${visiteurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Visiteur');
    });

    it('should create an instance of Visiteur', () => {
      cy.get(`[data-cy="cv"]`).type('briller vroum');
      cy.get(`[data-cy="cv"]`).should('have.value', 'briller vroum');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        visiteur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', visiteurPageUrlPattern);
    });
  });
});
