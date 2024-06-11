describe('Select category', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should show people attributes when "People" category is selected', () => {
    cy.get('#choose-category .category-option[value="people"]').click();
    cy.get('#attribute-people').within(() => {
      cy.get('.people-option').should('have.length', 2);
      cy.get('.people-option label').eq(0).should('contain', 'Height');
      cy.get('.people-option label').eq(1).should('contain', 'Mass');
    });
  });

  it('should show starships attributes when "Starships" category is selected', () => {
    cy.get('#choose-category .category-option[value="starships"]').click();
    cy.get('#attribute-starships').within(() => {
      cy.get('.starships-option').should('have.length', 5);
      cy.get('.starships-option').eq(0).should('contain', 'Cost');
      cy.get('.starships-option').eq(1).should('contain', 'Length');
      cy.get('.starships-option').eq(2).should('contain', 'Passengers');
      cy.get('.starships-option').eq(3).should('contain', 'Capacity');
      cy.get('.starships-option').eq(4).should('contain', 'Crew');
    });
  });

  it('Let`s go button should be enabled if category and attribute are selected', () => {
    cy.get('#choose-category .category-option[value="people"]').click();
    cy.get('.people-option input[value="height"]').click();
    cy.get('#battle-button').should('not.be.disabled');
  });

  it('should display the header', () => {
    cy.get('.header').should('contain', 'Choose a category and attributes');
  });

})
