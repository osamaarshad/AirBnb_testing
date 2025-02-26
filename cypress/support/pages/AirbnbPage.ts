class AirbnbPage {
  // Elements
  private locationInput = '#bigsearch-query-location-input';
  private locationSuggestion = '#bigsearch-query-location-suggestion-0';
  private checkinDateButton = 'button[aria-label="28, Friday, February 2025. Available. Select as check-in date."]';
  private checkoutDateButton = 'button[aria-label="12, Wednesday, March 2025. Available. Select as checkout date."]';
  private checkoutCalendarVisible = 'div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr';
  private searchButton = '.c1nkokj4';
  private checkinDateElement = 'div.v1v28j4b';
  private checkoutDateElement = 'div.v1v28j4b';
  private roomPriceSelector = '._hb913q'; // price class for rooms
  private roomContainerSelector = '[data-testid="card-container"]'; // room container class
  private verifyLocation='.f16sug5q';
  // Methods to interact with elements on the page
  

  public searchLocation(location: string) {
    cy.get(this.locationInput).type(location, { force: true });
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
    cy.get(this.searchButton).click();
  }

  public verifySelectedDates(checkinDate: string, checkoutDate: string) {
    cy.get(this.checkinDateElement).eq(0).should('have.text', checkinDate);  // assert check-in date
    cy.get(this.checkoutDateElement).eq(1).should('have.text', checkoutDate); // assert check-out date
  }


// find the cheapest room and click on it
public selectCheapestRoom() {
  cy.get(this.roomPriceSelector).then(($prices) => {
    let minPrice = Infinity;    //infinity is set because any max value will be less than infinity
    let cheapestRoomIndex = -1;

    // loop through all over list to find the cheapest
    $prices.each((index, el) => {
      const priceText = el.innerText.replace(/[^\d.-]/g, ''); // removing non-numeric characters,means it will remove signs like $,£,# etc
      const price = parseFloat(priceText); // convert text to number
      cy.log(priceText, "")   //log the whole list prices

      // update the cheapest room 
      if (price < minPrice) {
        minPrice = price;
        cheapestRoomIndex = index;
      }
    });

    // select the room with cheapest price
    cy.get(this.roomContainerSelector).eq(cheapestRoomIndex).click();

    // log result
    cy.log(`Cheapest room selected with price $: ${minPrice}`);

    
   //assertion
cy.get(this.roomContainerSelector).eq(cheapestRoomIndex).find('._hb913q').should(($el) => {
  expect($el.text().trim()).to.equal(`$${minPrice}`);  
});



  });





}


}

export default AirbnbPage;  // Ensure you're exporting the class