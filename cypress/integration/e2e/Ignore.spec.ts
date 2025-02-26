describe('My First Test', () => {
    it('Airbnb website', () => {
  
      const CheckinDate = "Feb 25";
      const CheckoutDate = "Mar 12";
      
  
      cy.visit('https://www.airbnb.com/');  // Visit Airbnb's homepage
  
      cy.wait(4000)
      /*cy.get('#bigsearch-query-location-input').type('Lahore', { force: true });
  
      cy.get('#bigsearch-query-location-suggestion-0').each(($e1, index, $list) => {         
  
        if ($e1.text() === 'Lahore') {
          cy.wrap($e1).click({ force: true });
        }
      }
      )
      cy.get('button[aria-label="25, Tuesday, February 2025. Available. Select as check-in date."]').click({ force: true })   //slect the checkin date from checkin calender
      cy.get('div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr').eq(1).should('be.visible'); // Check if cursor is moved to CheckoutDate and calender is visible
      cy.get('button[aria-label="12, Wednesday, March 2025. Available. Select as checkout date."]').click({ force: true });// Click on the checkout date button
      cy.get('.c1nkokj4').click() //click on search button
  
      //assertion
      cy.get('div.v1v28j4b').eq(0).should('have.text', CheckinDate);  //grab and confirm the checkindate slected in calender 
      cy.get('div.v1v28j4b').eq(1).should('have.text', CheckoutDate); //graba nd confirm the checkout date selected in calender
  
  
/*
//finding cheapest room
cy.get('._hb913q').then(($prices) => {
  let minPrice = Infinity;
  let cheapestRoomIndex = -1;

  // Loop through all prices to find the cheapest
  $prices.each((index, el) => {
    const priceText = el.innerText.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
    const price = parseFloat(priceText); // Convert to number
    cy.log(price + "")
    // Update the cheapest room if a new lower price is found
    if (price < minPrice) {
      minPrice = price;
      cheapestRoomIndex = index;
    }
  });

  // Select the room corresponding to the cheapest price
  cy.get('[data-testid="card-container"]').eq(cheapestRoomIndex).click();

  // Log the result
  cy.log(`Cheapest room selected with price: ${minPrice}`);

});



*/


cy.get('[data-testid="category-item--Top cities--unchecked"] > .c1ozl2w2').click() //selcet top cities

cy.wait(5000)
//select citites with minimum distance
/*
const distances: Array<{ distance: number; element: Cypress.Chainable }> = [];


cy.get('.cy5jw6o > div.lxq01kf > div.g1qv1ctd > div.fb4nyux > span > span')
  .each(($element) => {
    
    const text = $element.text().trim();

    // Step 2: Only consider elements containing kilometers (ignore non-distance text)
    if (text.includes('kilometers') && !text.includes('-')) {
      // Step 3: Extract the numeric part of the distance (remove any non-numeric characters)
      const distance = parseInt(text.replace(/[^\d]/g, ''), 10);

      // Store the distance and the wrapped element for later use
      distances.push({
        distance: distance,
        element: cy.wrap($element)
      });
    }
  })
  .then(() => {
    // Step 4: Find the city with the minimum distance
    let minDistance = Infinity;
    let minElement: Cypress.Chainable | undefined; // Type it as Cypress.Chainable or undefined

    distances.forEach(({ distance, element }) => {
      // Find the minimum distance
      if (distance < minDistance) {
        minDistance = distance;
        minElement = element; // Save the corresponding element with the minimum distance
      }
    });

    // Step 5: Interact with the element (click the city with minimum distance)
    if (minElement) {
      minElement.click({ force: true });
      cy.log(`Selected the city with the minimum distance: ${minDistance} kilometers`);
    } else {
      cy.log('No valid city element found.');
    }
  });

*/








const distances: Array<{ distance: number; element: Cypress.Chainable }> = [];

cy.get('.t1jojoys')  // Select all city elements
  .each(($city, index) => {
    // For each city, get its respective distance
    cy.get('.cy5jw6o > div.lxq01kf > div.g1qv1ctd > div.fb4nyux > span > span')
      .eq(index) // Match the distance element by the index
      .then(($distanceElement) => {
        const text = $distanceElement.text().trim();

        // Only consider elements containing kilometers (ignore non-distance text)
        if (text.includes('kilometers') && !text.includes('-')) {
          // Extract the numeric part of the distance (remove any non-numeric characters)
          const distance = parseInt(text.replace(/[^\d]/g, ''), 10);

          // Store the distance and the wrapped city element for later use
          distances.push({
            distance: distance,
            element: cy.wrap($city)
          });
        }
      });
  })
  .then(() => {
    // Step 2: Find the city with the minimum distance
    let minDistance = Infinity;
    let minElement: Cypress.Chainable | undefined;

    // Iterate over all distances and find the minimum one
    distances.forEach(({ distance, element }) => {
      if (distance < minDistance) {
        minDistance = distance;
        minElement = element; // Save the corresponding element with the minimum distance
      }
    });

    // Step 3: If a valid element is found, click it; otherwise, log an error
    
      // Step 4: Perform assertions after clicking
      cy.log(`Selected the city with the minimum distance: ${minDistance} kilometers`);

      // Assert that the minimum distance is displayed correctly
      cy.get('.cy5jw6o > div.lxq01kf > div.g1qv1ctd > div.fb4nyux > span > span')
        .contains(`${minDistance} kilometers`) // Check if the distance is displayed on the UI (modify selector as per UI structure)
        .should('be.visible');

      // Additional assertion: Verify if the clicked city has a specific class or ID (for example, if the city has a class indicating it's selected)
      cy.get('.t1jojoys')
        .filter(':contains("City Name")')  // Replace with actual city name logic if required
        .should('have.class', 'selected'); // Replace 'selected' with the class or status that indicates the city was selected
   
  });

  


  })})