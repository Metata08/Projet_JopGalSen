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

describe('Candidature e2e test', () => {
  const candidaturePageUrl = '/candidature';
  const candidaturePageUrlPattern = new RegExp('/candidature(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const candidatureSample = {};

  let candidature;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/candidatures+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/candidatures').as('postEntityRequest');
    cy.intercept('DELETE', '/api/candidatures/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (candidature) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/candidatures/${candidature.id}`,
      }).then(() => {
        candidature = undefined;
      });
    }
  });

  it('Candidatures menu should load Candidatures page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('candidature');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Candidature').should('exist');
    cy.url().should('match', candidaturePageUrlPattern);
  });

  describe('Candidature page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(candidaturePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Candidature page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/candidature/new$'));
        cy.getEntityCreateUpdateHeading('Candidature');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', candidaturePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/candidatures',
          body: candidatureSample,
        }).then(({ body }) => {
          candidature = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/candidatures+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/candidatures?page=0&size=20>; rel="last",<http://localhost/api/candidatures?page=0&size=20>; rel="first"',
              },
              body: [candidature],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(candidaturePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Candidature page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('candidature');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', candidaturePageUrlPattern);
      });

      it('edit button click should load edit Candidature page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Candidature');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', candidaturePageUrlPattern);
      });

      it('edit button click should load edit Candidature page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Candidature');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', candidaturePageUrlPattern);
      });

      it('last delete button click should delete instance of Candidature', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('candidature').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', candidaturePageUrlPattern);

        candidature = undefined;
      });
    });
  });

  describe('new Candidature page', () => {
    beforeEach(() => {
      cy.visit(`${candidaturePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Candidature');
    });

    it('should create an instance of Candidature', () => {
      cy.get(`[data-cy="motivationLetter"]`).type('../fake-data/blob/hipster.txt');
      cy.get(`[data-cy="motivationLetter"]`).invoke('val').should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="cvFileUrl"]`).type('euh jadis');
      cy.get(`[data-cy="cvFileUrl"]`).should('have.value', 'euh jadis');

      cy.get(`[data-cy="dateCandidature"]`).type('2025-08-01T10:41');
      cy.get(`[data-cy="dateCandidature"]`).blur();
      cy.get(`[data-cy="dateCandidature"]`).should('have.value', '2025-08-01T10:41');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        candidature = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', candidaturePageUrlPattern);
    });
  });
});
