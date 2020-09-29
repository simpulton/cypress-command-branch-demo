import { NavChainable } from './nav.model';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Nav Command Branch.
       *
       * Exposes Branched Commands For Use
       */
      nav(): NavChainable;
    }
  }
}

Cypress.Commands.add('nav', { prevSubject: 'optional' }, (Subject) =>
  cy.wrap(Subject, { log: false })
);

const back = (item: string) => {
  cy.get('ion-back-button').last().click();
};

const homeButton = (item: string) => {
  cy.get(`[data-cy=home-button]`).should('have.class', 'ion-activatable').click();
};

const home = (item: string) => {
  cy.safeVisit('/');
  // Wait For Loading Requests Here:
  cy.breathe();
};

const menu = (item: string) => {
  cy.get(`ion-menu-button`).should('have.class', 'ion-activatable').click();

  // Ensures Menu is visible before continuing
  cy.get(`ion-menu`).should('have.class', 'show-menu');

  // Goes to page
  cy.get(`ion-item`)
    .should('have.class', 'ion-activatable')
    .contains(item)
    .ionClick()
    .should('not.be.visible');
};

const fnsToReg = [
  { name: 'home', function: home },
  { name: 'back', function: back },
  { name: 'homeButton', function: homeButton },
  { name: 'menu', function: menu },
];

const register = () =>
  fnsToReg.forEach((fn) =>
    Cypress.Commands.add(fn.name, { prevSubject: 'optional' }, (Subject, item) => {
      fn.function(item);
      return cy.wrap(Subject, { log: false });
    })
  );

register();

// Cypress.Commands.add('nav', { prevSubject: 'optional' }, (Subject) => {
//   return new Cypress.Promise((resolve) => resolve(nav));
// });

Cypress.Commands.add('exit', { prevSubject: 'optional' }, (Subject) =>
  cy.wrap(Subject, { log: false })
);

export { NavChainable } from './nav.model';
