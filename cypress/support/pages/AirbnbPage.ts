class AirbnbPage {



  // Elements for Login
  private socialAuthButtonEmail = '[data-testid="social-auth-button-email"]';
  private emailInput = '[data-testid="email-login-email"]';
  private submitButton = '.t1dqvypu'; // You might need to adjust this selector
  private passwordInput = '[data-testid="email-signup-password"]';



  // Elements
  private locationInput = '#bigsearch-query-location-input';
  private locationSuggestion = '#bigsearch-query-location-suggestion-0'
  private checkinDateButton = 'button[aria-label="26, Wednesday, March 2025. Available. Select as check-in date."]';
  private checkoutDateButton = 'button[aria-label="30, Sunday, March 2025. Available. Select as checkout date."]';
  private checkoutCalendarVisible = 'div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr';
  private searchButton = '.c1nkokj4';
  private checkinDateElement = 'div.v1v28j4b';
  private checkoutDateElement = 'div.v1v28j4b';
  private roomPriceSelector = '._hb913q'; // price class for rooms
  private roomContainerSelector = '[data-testid="card-container"]'; // room container class
  private verifyLocation = '.f16sug5q';
  private roomTitleSelector = '.t1jojoys'; // room title selector
  private roomInfoSelector = '.t6mzqp7'; // room info selector
  private favoriteButtonSelector = '.ckqgked'; // favorite button selector

  // Methods to interact with elements on the page
  
  public login(email: string, password: string) {
    cy.get(this.socialAuthButtonEmail).click();
    cy.get(this.emailInput).type(email);
    cy.get(this.submitButton).click(); // Click to submit email
    cy.get(this.passwordInput).type(password); // Enter password
    cy.get(this.submitButton).click(); // Submit the password
  }

  public searchLocation(location: string) {
    cy.wait(4000)
    cy.get(this.locationInput).should('be.visible').type(location, { force: true });
    cy.wait(2000)
    cy.get(this.locationSuggestion).each(($e1) => {
      if ($e1.text() === location) {
        cy.wrap($e1).click({ force: true });
      }
    });
  }

  public assertLocation(checkLoc: string) {
    cy.get(this.verifyLocation).eq(0).should('have.text', checkLoc);
  
  }

  public selectCheckinDate() {
    cy.get(this.checkinDateButton).click({ force: true });
    cy.wait(4000)
  }

  public selectCheckoutDate() {
    cy.get(this.checkoutDateButton).click({ force: true });
  }

  public verifyCheckoutCalendarVisible() {
    cy.get(this.checkoutCalendarVisible).eq(1).should('be.visible');
  }

  public submitSearch() {
    cy.get(this.searchButton).click({ force: true });
  }

  public verifySelectedDates(checkinDate: string, checkoutDate: string) {
    cy.get(this.checkinDateElement).eq(0).should('have.text', checkinDate); // assert check-in date
    cy.get(this.checkoutDateElement).eq(1).should('have.text', checkoutDate); // assert check-out date
  }

 
  // find the cheapest room and click on it 

  public selectCheapestRoom() {
    let roomTitle: string, roomInfo: string; // declare the variables with 'string' type

    
    cy.get(this.roomTitleSelector)
      .invoke('text')
      .then((text1) => {
        roomTitle = text1.trim(); // store the text from '.t1jojoys'
      });

    
    cy.get(this.roomInfoSelector)
      .invoke('text')
      .then((text2) => {
        roomInfo = text2.trim(); // store the text from '.t6mzqp7'
      });

    //extract prices
    cy.get(this.roomPriceSelector).then(($prices) => {
      let minPrice = Infinity;
      let cheapestRoomIndex = -1;

      // Llop through all prices to find the cheapest
      $prices.each((index, el) => {
        const priceText = el.innerText.replace(/[^\d.-]/g, ''); // remove non-numeric characters
        const price = parseFloat(priceText); // convert to number

        // update the cheapest roomn
        if (price < minPrice) {
          minPrice = price;
          cheapestRoomIndex = index;
        }
      });

      ///mark as cheapest
      cy.get(this.favoriteButtonSelector).eq(cheapestRoomIndex).click() // click the favorite button for the cheapest room
      // log the result
      cy.log(`Cheapest room marked as favorite with price: $${minPrice}`);
     // cy.log('Room Information: ' + roomTitle + ' | ' + roomInfo);

      // assertion 
      cy.get(this.roomContainerSelector)
        .eq(cheapestRoomIndex)
        .find(this.roomPriceSelector)
        .should(($el) => {
          expect($el.text().trim()).to.equal(`$${minPrice}`) ;
          
        });
       

        cy.wait(8000);  // Optional wait for the transition/animation to finish (if needed)

        // Ensure the popup modal with class '.b98pgng' is visible
        cy.get('.b98pgng').should('be.visible');
    
        // Now, ensure the wishlist card is visible inside the modal and click it
        cy.get('[data-testid="save-to-list-modal-wishlist-card"] > [data-testid="card-container"] > .l1ovpqvx')
          .should('be.visible')  // Ensure the wishlist card is visible
          .click(); // Click the wishlis



    });
  }




  
}

export default AirbnbPage; // Ensure you're exporting the class


















//mark this code written on march 15 
/*
class AirbnbPage {
  // Elements for Login
  private socialAuthButtonEmail = '[data-testid="social-auth-button-email"]';
  private emailInput = '[data-testid="email-login-email"]';
  private submitButton = '.t1dqvypu'; // You might need to adjust this selector
  private passwordInput = '[data-testid="email-signup-password"]';

  // Other elements
  private locationInput = '#bigsearch-query-location-input';
  private locationSuggestion = '#bigsearch-query-location-suggestion-0';
  private checkinDateButton = 'button[aria-label="19, Wednesday, March 2025. Available. Select as check-in date."]';
  private checkoutDateButton = 'button[aria-label="30, Sunday, March 2025. Available. Select as checkout date."]';
  private checkoutCalendarVisible = 'div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr';
  private searchButton = '.c1nkokj4';
  private checkinDateElement = 'div.v1v28j4b';
  private checkoutDateElement = 'div.v1v28j4b';
  private roomPriceSelector = '._hb913q'; // price class for rooms
  private roomContainerSelector = '[data-testid="card-container"]'; // room container class
  private verifyLocation = '.f16sug5q';

  // Methods to interact with elements on the page
  
  public login(email: string, password: string) {
    cy.get(this.socialAuthButtonEmail).click();
    cy.get(this.emailInput).type(email);
    cy.get(this.submitButton).click(); // Click to submit email
    cy.get(this.passwordInput).type(password); // Enter password
    cy.get(this.submitButton).click(); // Submit the password
  }

  public searchLocation(location: string) {
    cy.get(this.locationInput).should('be.visible').type(location, { force: true });
    cy.get(this.locationSuggestion).each(($e1) => {
      if ($e1.text() === location) {
        cy.wrap($e1).click({ force: true });
      }
    });
  }

  public assertLocation(checkLoc: string) {
    cy.get(this.verifyLocation).eq(0).should('have.text', checkLoc);
  }

  public selectCheckinDate() {
    cy.get(this.checkinDateButton).click({ force: true });
  }

  public selectCheckoutDate() {
    cy.get(this.checkoutDateButton).click({ force: true });
  }

  public verifyCheckoutCalendarVisible() {
    cy.get(this.checkoutCalendarVisible).eq(1).should('be.visible');
  }

  public submitSearch() {
    cy.get(this.searchButton).click({ force: true });
  }

  public verifySelectedDates(checkinDate: string, checkoutDate: string) {
    cy.get(this.checkinDateElement).eq(0).should('have.text', checkinDate); // assert check-in date
    cy.get(this.checkoutDateElement).eq(1).should('have.text', checkoutDate); // assert check-out date
  }
  
  // find the cheapest room and click on it 
  public selectCheapestRoom() {
    cy.get(this.roomPriceSelector).then(($prices) => {
      let minPrice = Infinity;
      let cheapestRoomIndex = -1;

      // Loop through all prices to find the cheapest
      $prices.each((index, el) => {
        const priceText = el.innerText.replace(/[^\d.-]/g, ''); // remove non-numeric characters
        const price = parseFloat(priceText); // convert to number

        // Update the cheapest room
        if (price < minPrice) {
          minPrice = price;
          cheapestRoomIndex = index;
        }
      });

      // Select the room corresponding to the cheapest price
      cy.get(this.roomContainerSelector).eq(cheapestRoomIndex).click();

      // Log the result
      cy.log(`Cheapest room selected with price: ${minPrice}`);
    });
  }
}

export default AirbnbPage;





*/

