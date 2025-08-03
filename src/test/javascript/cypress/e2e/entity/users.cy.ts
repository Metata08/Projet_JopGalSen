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

describe('Users e2e test', () => {
  const usersPageUrl = '/users';
  const usersPageUrlPattern = new RegExp('/users(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const usersSample = { email: 'Colin_Marty@hotmail.fr', password: 'alors que', role: 'Candidate' };

  let users;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (users) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${users.id}`,
      }).then(() => {
        users = undefined;
      });
    }
  });

  it('Users menu should load Users page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('users');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Users').should('exist');
    cy.url().should('match', usersPageUrlPattern);
  });

  describe('Users page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(usersPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Users page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/users/new$'));
        cy.getEntityCreateUpdateHeading('Users');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', usersPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/users',
          body: usersSample,
        }).then(({ body }) => {
          users = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [users],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(usersPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Users page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('users');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', usersPageUrlPattern);
      });

      it('edit button click should load edit Users page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Users');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', usersPageUrlPattern);
      });

      it('edit button click should load edit Users page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Users');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', usersPageUrlPattern);
      });

      it('last delete button click should delete instance of Users', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('users').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', usersPageUrlPattern);

        users = undefined;
      });
    });
  });

  describe('new Users page', () => {
    beforeEach(() => {
      cy.visit(`${usersPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Users');
    });

    it('should create an instance of Users', () => {
      cy.get(`[data-cy="email"]`).type('Ascelin_Carpentier70@gmail.com');
      cy.get(`[data-cy="email"]`).should('have.value', 'Ascelin_Carpentier70@gmail.com');

      cy.get(`[data-cy="password"]`).type('gens défendre à cause de');
      cy.get(`[data-cy="password"]`).should('have.value', 'gens défendre à cause de');

      cy.get(`[data-cy="name"]`).type('partenaire étant donné que comme');
      cy.get(`[data-cy="name"]`).should('have.value', 'partenaire étant donné que comme');

      cy.get(`[data-cy="role"]`).select('Recruiter');

      cy.get(`[data-cy="telephone"]`).type('+33 113067915');
      cy.get(`[data-cy="telephone"]`).should('have.value', '+33 113067915');

      cy.get(`[data-cy="entreprise"]`).type('autrement');
      cy.get(`[data-cy="entreprise"]`).should('have.value', 'autrement');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        users = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', usersPageUrlPattern);
    });
  });
});
