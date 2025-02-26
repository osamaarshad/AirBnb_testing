  class TopCitiesPage {
    
    distances: Array<{ distance: number; element: Cypress.Chainable }> = []; //typescript giving type error that is why array is to be declared like this
  
    // method to select city
    selectTopCities(): void {
      cy.get('[data-testid="category-item--Top cities--unchecked"] > .c1ozl2w2').click();
      cy.wait(5000); 
    }
  
    // method to find city with min distance
    cityMindist(): void {
      
      cy.get('.cy5jw6o > div.lxq01kf > div.g1qv1ctd > div.fb4nyux > span > span') //select kilometeres of all cities
        .each(($element) => {
          const text = $element.text().trim();
  
          if (text.includes('kilometers') && !text.includes('-')) {           
            //  extract the numeric part of the distance (remove any non-numeric characters)
            const distance = parseInt(text.replace(/[^\d]/g, ''), 10);
            
            this.distances.push({
              distance: distance,
              element: cy.wrap($element)
            });
          }
        })
        .then(() => {
          // find the city with the minimum distance
          let minDistance = Infinity;
          let minElement: Cypress.Chainable | undefined;
  
          //iterate over all distances found
          this.distances.forEach(({ distance, element }) => {
            if (distance < minDistance) {
              minDistance = distance;
              minElement = element; 
            }
          });
  
          //if min distance found click it
          if (minElement) {
            minElement.click({ force: true });
            cy.log(`Selected the city with the minimum distance: ${minDistance} kilometers`);
          } else {
            cy.log('No valid city element found.');
          }





        //  cy.get('.cy5jw6o > div.lxq01kf > div.g1qv1ctd > div.fb4nyux > span > span')
       // .contains(`${minDistance} kilometers`) // Check if the distance is displayed on the UI (modify selector as per UI structure)
        //.should('be.visible')

        });
    }
  }
  
  export default TopCitiesPage;
  