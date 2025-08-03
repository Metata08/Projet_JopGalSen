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

describe('Poste e2e test', () => {
  const postePageUrl = '/poste';
  const postePageUrlPattern = new RegExp('/poste(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const posteSample = { nomPoste: 'composer grâce à' };

  let poste;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/postes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/postes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/postes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (poste) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/postes/${poste.id}`,
      }).then(() => {
        poste = undefined;
      });
    }
  });

  it('Postes menu should load Postes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('poste');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Poste').should('exist');
    cy.url().should('match', postePageUrlPattern);
  });

  describe('Poste page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(postePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Poste page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/poste/new$'));
        cy.getEntityCreateUpdateHeading('Poste');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', postePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/postes',
          body: posteSample,
        }).then(({ body }) => {
          poste = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/postes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/postes?page=0&size=20>; rel="last",<http://localhost/api/postes?page=0&size=20>; rel="first"',
              },
              body: [poste],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(postePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Poste page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('poste');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', postePageUrlPattern);
      });

      it('edit button click should load edit Poste page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Poste');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', postePageUrlPattern);
      });

      it('edit button click should load edit Poste page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Poste');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', postePageUrlPattern);
      });

      it('last delete button click should delete instance of Poste', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('poste').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', postePageUrlPattern);

        poste = undefined;
      });
    });
  });

  describe('new Poste page', () => {
    beforeEach(() => {
      cy.visit(`${postePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Poste');
    });

    it('should create an instance of Poste', () => {
      cy.get(`[data-cy="nomPoste"]`).type('de façon à jusqu’à ce que');
      cy.get(`[data-cy="nomPoste"]`).should('have.value', 'de façon à jusqu’à ce que');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        poste = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', postePageUrlPattern);
    });
  });
});
