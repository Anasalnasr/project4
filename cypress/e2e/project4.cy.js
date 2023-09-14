/// <reference types="cypress" />


const aracountries = ['Dubai', 'Jeddah', 'Amman'];
const rancountries = Math.floor(Math.random() * aracountries.length);

describe('Hotel Price Comparison', () => {
  it('First result should have a lower price than the last result', () => {
    cy.visit('https://www.almosafer.com/en');

    cy.get('.cta__saudi').click();
    cy.get('#uncontrolled-tab-example-tab-hotels').click();
    cy.get('[data-testid="AutoCompleteInput"]').type(aracountries[rancountries]);
    cy.wait(3000); 

    cy.get('[data-testid="AutoCompleteResultItem0"]').click();
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();

    cy.wait(10000); 

    cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
    cy.wait(10000); 

    cy.get('[data-testid="HotelSearchResult__Hotel0__PriceLabel"]').invoke('text').then((firstPrice) => {
      cy.get('.Price__Value').last().invoke('text').then((lastPrice) => {
        const firstPriceValue = parseFloat(firstPrice.replace('SAR', '').trim());
        const lastPriceValue = parseFloat(lastPrice.replace('SAR', '').trim());
        expect(firstPriceValue).to.be.lessThan(lastPriceValue);
      });
    });
  });
});
