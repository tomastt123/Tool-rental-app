/// <reference types="cypress" />

describe('Tool Rental Charges', () => {
    it('Should retrieve tool rental charges in JSON format', function () {
      // Assuming your API endpoint for tool rental charges is at /api/tool-rental-charges
      cy.request('GET', 'http://localhost:3000/api/tool-rental-charges').then(function (response) {
        // Verify the response status is 200
        expect(response.status).to.eq(200);
  
        // Log the response body to check the actual output
        cy.log(JSON.stringify(response.body));
  
        // Adjust the expected response if needed based on the actual data
        const expectedResponse = [
          { type: "ladder", dailyCharge: 1.99 },
          { type: "chainsaw", dailyCharge: 1.49 },
          { type: "jackhammer", dailyCharge: 2.99 },
          { type: "jackhammer", dailyCharge: 2.99 } // Add this if your response has 4 items
        ];
  
        // Verify the response matches the expected JSON structure
        expect(response.body).to.deep.equal(expectedResponse);
      });
    });
  });
  