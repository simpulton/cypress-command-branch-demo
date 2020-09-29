import './commands/index';

import { spyOnAddEventListener, waitForAppStart } from './commands/waitAppStart';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      checkUrl(path: string): void;
      ionClick(options?);
      breathe(log?);
      safeVisit(path: string): void;
    }
  }
}

Cypress.Commands.add('safeVisit', (path: string) => {
  cy.visit(path, {
    onBeforeLoad: spyOnAddEventListener,
  }).then({ timeout: 10000 }, waitForAppStart);
});

Cypress.Commands.add('checkUrl', (path: string) => {
  cy.url().should('contain', `${path}`);
});

Cypress.Commands.add('breathe', { prevSubject: 'optional' }, (subject, log = true) => {
  const message = `allowing app to breathe`;
  if (log) {
    Cypress.log({
      name: 'breath',
      message,
    });
  }
  return cy.wrap(subject, { log: false }).wait(0, { log: false });
});

Cypress.Commands.add('ionClick', { prevSubject: 'element' }, (subject, options?) => {
  // Produces more consistent clicking results sometimes
  const log = false;

  const message = `Ionic Mobile Style Click`;
  Cypress.log({
    name: 'ionClick',
    message,
    consoleProps: () => {
      return {
        Options: options,
        message,
      };
    },
  });

  cy.wrap(subject, { log })
    .breathe(false)
    .trigger('mousedown', { log })
    .breathe(false)
    .trigger('mouseup', { log })
    .breathe(false)
    .as('element');

  if (!!options) {
    return cy.get('@element', { log }).breathe(false).click(options);
  } else {
    return cy.get('@element', { log }).breathe(false).click();
  }
});
