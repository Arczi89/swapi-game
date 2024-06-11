describe('Battle', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('#choose-category .category-option[value="people"]').click();
    cy.get('.people-option input[value="height"]').click();
    cy.get('#battle-button').click();
  });

  it('page is loaded', () => {
    cy.url().should('contain','battle');
  })

  it('should battle be resolved after PLAY button pressed', () => {

    cy.intercept('GET', 'https://www.swapi.tech/api/people/*').as('getPeople');
    cy.wait('@getPeople').its('response.statusCode').should('eq', 200);

    cy.get('.card__item').should('have.length', 2);

    cy.get('#battle-play').click();

    cy.get('.counter .counter__opponent').invoke('text').then(values => {
      expect(parseInt(values[0])).to.not.eq(parseInt(values[1]));
    });

    cy.get('#battle-play').should('contain', 'PLAY AGAIN');
  });

})
