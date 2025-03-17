describe('My First Test', () => {
    it('Airbnb website', () => {
      //cy.visit('https://www.airbnb.com/login');
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent the error from failing the test
        if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
          return false; // Prevents the test from failing
        }
      });
      cy.wait(1000)
      cy.get('[data-testid="social-auth-button-email"]').click()
      cy.get('[data-testid="email-login-email"]').type('farhan1232025@gmail.com') 
      cy.get('.t1dqvypu').click()    
      cy.get('[data-testid="email-signup-password"]').type('!A12345678')
      cy.get('.t1dqvypu').click()
  
      const CheckinDate = "Mar 19";
      const CheckoutDate = "Mar 30";
      
  
      //cy.visit('https://www.airbnb.com/');  // Visit Airbnb's homepage
  
      cy.wait(8000)
      cy.get('#bigsearch-query-location-input').type('Lahore', { force: true });
  cy.wait(4000)
      cy.get('#bigsearch-query-location-suggestion-0').each(($e1, index, $list) => {         
  
        if ($e1.text() === 'Lahore') {
          cy.wrap($e1).click({ force: true });
        }
      }
      )
      cy.get('[aria-label="19, Wednesday, March 2025. Available. Select as check-in date."]').click({ force: true })   //slect the checkin date from checkin calender
      cy.get('div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr').eq(1).should('be.visible'); // Check if cursor is moved to CheckoutDate and calender is visible
      cy.get('button[aria-label="30, Sunday, March 2025. Available. Select as checkout date."]').click({ force: true });// Click on the checkout date button
      cy.get('.c1nkokj4').click() //click on search button
  
      //assertion
      cy.get('div.v1v28j4b').eq(0).should('have.text', CheckinDate);  //grab and confirm the checkindate slected in calender 
      cy.get('div.v1v28j4b').eq(1).should('have.text', CheckoutDate); //graba nd confirm the checkout date selected in calender


      cy.wait(4000)

      let roomTitle: string, roomInfo: string; // Declare the variables with 'string' type

      // Step 1: Read room information from '.t1jojoys'
      cy.get('.t1jojoys') // grab elements with class 't1jojoys'
        .invoke('text') // get the text inside the element
        .then((text1) => {
          roomTitle = text1.trim(); // Store the text from '.t1jojoys'
          //cy.log('Room Information from t1jojoys: ' + roomTitle);
        });
      
      // Step 2: Read room information from '.t6mzqp7'
      cy.get('.t6mzqp7') // grab elements with class 't6mzqp7'
        .invoke('text') // get the text inside the element
        .then((text2) => {
          roomInfo = text2.trim(); // Store the text from '.t6mzqp7'
          //cy.log('Room Information from t6mzqp7: ' + roomInfo);
        });
      
      // Step 3: Extract price information from elements with class '._hb913q'
      cy.get('._hb913q').then(($prices) => {
        let minPrice = 5000;
        let cheapestRoomIndex = -1;
      
        // Loop through all prices to find the cheapest
        $prices.each((index, el) => {
          const priceText = el.innerText.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
          const price = parseFloat(priceText); // Convert to number
          cy.log('Price: ' + price); // Log the price
      
          // Update the cheapest room if a new lower price is found
          if (price < minPrice) {
            minPrice = price;
            cheapestRoomIndex = index;
          }
        });
      
        // Step 4: Select the room corresponding to the cheapest price
        cy.get('.ckqgked').eq(cheapestRoomIndex).click(); // Click the favorite button for the cheapest room
      
        // Log the result
        cy.log(`Cheapest room selected with price: ${minPrice}`);
        cy.log('Room Information: ' + roomTitle + ' | ' + roomInfo);
        cy.wait(8000);  // Optional wait for the transition/animation to finish (if needed)

    // Ensure the popup modal with class '.b98pgng' is visible
    cy.get('.b98pgng').should('be.visible');

    // Now, ensure the wishlist card is visible inside the modal and click it
    cy.get('[data-testid="save-to-list-modal-wishlist-card"] > [data-testid="card-container"] > .l1ovpqvx')
      .should('be.visible')  // Ensure the wishlist card is visible
      .click(); // Click the wishlis
        
      });
      















  })})