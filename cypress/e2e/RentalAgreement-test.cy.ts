/// <reference types="cypress" />

describe('Tool Rental Application', () => {
    it('Should submit rental data for a valid tool and return JSON response', () => {
      // Intercept the POST request
      cy.intercept('POST', '/api/checkout').as('rentalRequest');
  
      // Visit your application URL
      cy.visit('http://localhost:3000');
  
      // Fill out the form with test data
      cy.get('label').contains('Tool Code').next('input').type('CHNS');
      cy.get('label').contains('Checkout Date').next('input').type('2021-06-15');
      cy.get('label').contains('Return Date').next('input').type('2021-06-17');
      cy.get('label').contains('Discount Percent').next('input').type('10'); // Set valid discount percent
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Wait for the intercepted request and capture its response
      cy.wait('@rentalRequest').then((interception) => {
        // Check if response body is defined
        if (interception.response) {
          const rentalAgreement = interception.response.body;
          
          // Log the response body (JSON data) to the Cypress console
          cy.log(JSON.stringify(rentalAgreement));
  
          // Check if the backend returned the expected JSON structure
          expect(rentalAgreement.toolCode).to.equal('CHNS');
          expect(rentalAgreement.finalAmount).to.be.a('string');
          expect(rentalAgreement).to.have.property('toolType');
          expect(rentalAgreement).to.have.property('checkoutDate');
          expect(rentalAgreement).to.have.property('returnDate');
        } else {
          throw new Error("Response from the intercepted request is undefined.");
        }
      });
    });
  });
  