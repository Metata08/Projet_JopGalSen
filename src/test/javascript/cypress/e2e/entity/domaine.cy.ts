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

describe('Domaine e2e test', () => {
  const domainePageUrl = '/domaine';
  const domainePageUrlPattern = new RegExp('/domaine(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const domaineSample = { nomDomaine: "détester d'entre marron" };

  let domaine;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/domaines+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/domaines').as('postEntityRequest');
    cy.intercept('DELETE', '/api/domaines/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (domaine) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/domaines/${domaine.id}`,
      }).then(() => {
        domaine = undefined;
      });
    }
  });

  it('Domaines menu should load Domaines page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('domaine');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Domaine').should('exist');
    cy.url().should('match', domainePageUrlPattern);
  });

  describe('Domaine page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(domainePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Domaine page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/domaine/new$'));
        cy.getEntityCreateUpdateHeading('Domaine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/domaines',
          body: domaineSample,
        }).then(({ body }) => {
          domaine = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/domaines+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/domaines?page=0&size=20>; rel="last",<http://localhost/api/domaines?page=0&size=20>; rel="first"',
              },
              body: [domaine],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(domainePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Domaine page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('domaine');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainePageUrlPattern);
      });

      it('edit button click should load edit Domaine page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Domaine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainePageUrlPattern);
      });

      it('edit button click should load edit Domaine page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Domaine');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainePageUrlPattern);
      });

      it('last delete button click should delete instance of Domaine', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('domaine').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainePageUrlPattern);

        domaine = undefined;
      });
    });
  });

  describe('new Domaine page', () => {
    beforeEach(() => {
      cy.visit(`${domainePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Domaine');
    });

    it('should create an instance of Domaine', () => {
      cy.get(`[data-cy="nomDomaine"]`).type('coin-coin ouah écarter');
      cy.get(`[data-cy="nomDomaine"]`).should('have.value', 'coin-coin ouah écarter');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        domaine = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', domainePageUrlPattern);
    });
  });
});
