// File: cypress/support/pages/AirbnbPage.ts

class AirbnbPage {
  // Elements
  private locationInput = '#bigsearch-query-location-input';
  private locationSuggestion = '#bigsearch-query-location-suggestion-0';
  private checkinDateButton = 'button[aria-label="15, Saturday, February 2025. Available. Select as check-in date."]';
  private checkoutDateButton = 'button[aria-label="12, Wednesday, March 2025. Available. Select as checkout date."]';
  private checkoutCalendarVisible = 'div.cz9siyu.atm_l8_srw7uq.atm_ks_15vqwwr.atm_mk_h2mmj6.atm_vv_1q9ccgz.atm_vy_1osqo2v.atm_wq_kb7nvz.dir.dir-ltr';
  private searchButton = '.c1nkokj4';
  private checkinDateElement = 'div.v1v28j4b';
  private checkoutDateElement = 'div.v1v28j4b';

  // Methods to interact with elements on the page
  public visit() {
    cy.visit('https://www.airbnb.com/');
  }

  public searchLocation(location: string) {
    cy.get(this.locationInput).type(location, { force: true });
    cy.get(this.locationSuggestion).each(($e1) => {
      if ($e1.text() === location) {
        cy.wrap($e1).click({ force: true });
      }
    });
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
    cy.get(this.checkinDateElement).eq(0).should('have.text', checkinDate);  // Assert check-in date
    cy.get(this.checkoutDateElement).eq(1).should('have.text', checkoutDate); // Assert check-out date
  }
}

export default AirbnbPage;  // Ensure you're exporting the class
