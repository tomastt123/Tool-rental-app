describe('Tools', () => {
    it('Should retrieve tools data in JSON format', function () {
      cy.request('GET', 'http://localhost:3000/api/tools')
        .then((response) => {
          // Log the status and body to help with debugging
          cy.log(`Response Status: ${response.status}`);
          cy.log(`Response Body: ${JSON.stringify(response.body)}`);
  
          expect(response.status).to.eq(200);
  
          const expectedResponse = [
            { type: "chainsaw", code: "CHNS", brand: "Stihl" },
            { type: "ladder", code: "LADW", brand: "Werner" },
            { type: "jackhammer", code: "JAKD", brand: "DeWalt" },
            { type: "jackhammer", code: "JAKR", brand: "Ridgid" }
          ];
  
          // Define explicit type for sorting function
          const sortFn = (a: { code: string }, b: { code: string }) => a.code.localeCompare(b.code);
  
          // Compare sorted versions to prevent order-based mismatches
          const sortedActual = response.body.sort(sortFn);
          const sortedExpected = expectedResponse.sort(sortFn);
  
          // Log the sorted arrays for easier debugging
          cy.log(`Sorted Actual: ${JSON.stringify(sortedActual)}`);
          cy.log(`Sorted Expected: ${JSON.stringify(sortedExpected)}`);
  
          expect(sortedActual).to.deep.equal(sortedExpected);
        });
    });
  });
  