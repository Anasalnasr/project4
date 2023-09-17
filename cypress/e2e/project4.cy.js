/// <reference types="cypress" />

const { expect } = require("chai");



Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
  })
  

const aracountries = ['Dubai', 'Jeddah', 'Amman'];
const randomCountryIndex = Math.floor(Math.random() * aracountries.length);
const today = new Date().getDate();
const tomorrow = today + 1;
const theDayAfterTomorrow = today + 2;

describe('Flight Search', () => {
  it.skip('should set Departure and Return Dates correctly', () => {
    cy.visit('https://www.almosafer.com/en');
    cy.get('.cta__saudi').click();

    cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt').invoke('text').then((elementText) => {
      expect(elementText.trim()).to.eql(tomorrow.toString());
    });

    cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-eSePXt').invoke('text').then((elementText) => {
      expect(elementText.trim()).to.eql(theDayAfterTomorrow.toString());
    });
  });

  it.skip('should select Economy class by default', () => {
    cy.visit('https://www.almosafer.com/en');
    cy.get('.cta__saudi').click();

    const expectedClassValue = "Economy";
    cy.get('.sc-jWxkHr').invoke('text').then((elementText) => {
      expect(elementText.trim()).to.eql(expectedClassValue);
    });
  });
});

describe('Hotel Search', () => {
  it.skip('should search for a random country', () => {
    cy.visit('https://www.almosafer.com/en');
    cy.get('#uncontrolled-tab-example-tab-hotels > .sc-dWcDbm').click();

    // Add code to type a random country and perform a hotel search
    // e.g., cy.get('[data-testid="AutoCompleteInput"]').type(aracountries[randomCountryIndex]);
    // Wait for results and perform assertions
  });

  it('should sort hotels by the lowest price and verify the first is cheaper than the last', () => {
    let prices = [];
    cy.visit('https://www.almosafer.com/en');
    cy.get('.cta__saudi').click();
    cy.get('#uncontrolled-tab-example-tab-hotels > .sc-dWcDbm').click();
    cy.get('[data-testid="AutoCompleteInput"]').type(aracountries[randomCountryIndex]);
    cy.wait(3000);
  
    cy.get('[data-testid="AutoCompleteResultsList"]').find('li').eq(1).click();
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
    cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
    cy.wait(3000);
  
    // Corrected assertion
    cy.get('[data-testid="HotelSearchResult__ResultsList"]').find('.Price__Value').each((element) => {
      const PriceText = element.text();
      const PriceValue = parseInt(PriceText);
      prices.push(PriceValue);
    }).then(() => {
      expect(prices[0]).to.be.lessThan(prices[prices.length - 1]);
    });
  });
    });
