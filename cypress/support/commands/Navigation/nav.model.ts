/// <reference types="cypress" />
/**
 * Nav Command Branch Interface
 *
 * Yields Basic Navigation Commands
 */
export declare interface NavChainable {
  /**
   * Navigate Back Using ion-back-button
   */
  back(): NavChainable;
  /**
   * Navigate Back Using tool-bar home button
   */
  homeButton(): NavChainable;
  /**
   * Navigate Home using safeVisit() and waiting
   */
  home(): NavChainable;
  /**
   * Navigate using sidebar menu.
   *
   * Recomended use from home page
   */
  menu(item: string): NavChainable;
  /**
   * Exits Branched Command Chain
   *
   */
  exit?(): Cypress.Chainable;
}
