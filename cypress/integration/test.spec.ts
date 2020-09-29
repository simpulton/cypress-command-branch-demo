describe('Branch Command Demo', () => {
  it('should nav home', () => {
    cy.nav().home();
  });

  it('should carry subject through chain', () => {
    cy.get('body').nav().home().exit().as('body');

    cy.log('subject', cy.get('@body'));
  });

  it('should navigate to sub page', () => {
    cy.nav().home().menu('Outbox');
    cy.checkUrl('Outbox');
  });
});
