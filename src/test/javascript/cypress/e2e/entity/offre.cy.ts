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

describe('Offre e2e test', () => {
  const offrePageUrl = '/offre';
  const offrePageUrlPattern = new RegExp('/offre(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const offreSample = { title: 'tôt à demi jusqu’à ce que', company: 'entrevoir bè', type: 'CDD' };

  let offre;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/offres+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/offres').as('postEntityRequest');
    cy.intercept('DELETE', '/api/offres/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (offre) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/offres/${offre.id}`,
      }).then(() => {
        offre = undefined;
      });
    }
  });

  it('Offres menu should load Offres page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('offre');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Offre').should('exist');
    cy.url().should('match', offrePageUrlPattern);
  });

  describe('Offre page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(offrePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Offre page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/offre/new$'));
        cy.getEntityCreateUpdateHeading('Offre');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', offrePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/offres',
          body: offreSample,
        }).then(({ body }) => {
          offre = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/offres+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/offres?page=0&size=20>; rel="last",<http://localhost/api/offres?page=0&size=20>; rel="first"',
              },
              body: [offre],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(offrePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Offre page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('offre');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', offrePageUrlPattern);
      });

      it('edit button click should load edit Offre page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Offre');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', offrePageUrlPattern);
      });

      it('edit button click should load edit Offre page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Offre');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', offrePageUrlPattern);
      });

      it('last delete button click should delete instance of Offre', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('offre').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', offrePageUrlPattern);

        offre = undefined;
      });
    });
  });

  describe('new Offre page', () => {
    beforeEach(() => {
      cy.visit(`${offrePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Offre');
    });

    it('should create an instance of Offre', () => {
      cy.get(`[data-cy="title"]`).type('à peu près porte-parole');
      cy.get(`[data-cy="title"]`).should('have.value', 'à peu près porte-parole');

      cy.get(`[data-cy="company"]`).type('produire flotter cuicui');
      cy.get(`[data-cy="company"]`).should('have.value', 'produire flotter cuicui');

      cy.get(`[data-cy="location"]`).type("à l'égard de membre à vie plic");
      cy.get(`[data-cy="location"]`).should('have.value', "à l'égard de membre à vie plic");

      cy.get(`[data-cy="type"]`).select('CDI');

      cy.get(`[data-cy="salary"]`).type("dense d'avec ressembler");
      cy.get(`[data-cy="salary"]`).should('have.value', "dense d'avec ressembler");

      cy.get(`[data-cy="description"]`).type('../fake-data/blob/hipster.txt');
      cy.get(`[data-cy="description"]`).invoke('val').should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="skills"]`).type('adversaire solitaire concevoir');
      cy.get(`[data-cy="skills"]`).should('have.value', 'adversaire solitaire concevoir');

      cy.get(`[data-cy="experienceLevel"]`).type('incalculable à raison de');
      cy.get(`[data-cy="experienceLevel"]`).should('have.value', 'incalculable à raison de');

      cy.get(`[data-cy="postedDate"]`).type('2025-07-31T05:52');
      cy.get(`[data-cy="postedDate"]`).blur();
      cy.get(`[data-cy="postedDate"]`).should('have.value', '2025-07-31T05:52');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        offre = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', offrePageUrlPattern);
    });
  });
});
