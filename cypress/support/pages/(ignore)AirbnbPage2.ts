import moment from 'moment';

class AirbnbPage {
  // Elements
  private locationInput = '#bigsearch-query-location-input';
  private locationSuggestion = '#bigsearch-query-location-suggestion-0';
  private checkinDateButton = 'button[aria-label="check-in date"]';  
  private checkoutDateButton = 'button[aria-label="check-out date"]';
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

  // Improved date selection method
  public selectCheckinDate(checkinDate: string) {
    const formattedCheckinDate = moment(checkinDate).format('D MMM YYYY'); // Format: "19 Feb 2025"
    // Use the formatted date to find the button
    cy.get(`button[aria-label*="${formattedCheckinDate}"]`, { timeout: 10000 })  // Match part of the aria-label
      .click({ force: true })
      .then(() => {
        cy.log(`Clicked on the check-in date: ${formattedCheckinDate}`);
      });
  }

  public selectCheckoutDate(checkoutDate: string) {
    const formattedCheckoutDate = moment(checkoutDate).format('D MMM YYYY');  // Format: "20 Feb 2025"
    // Use the formatted date to find the button
    cy.get(`button[aria-label*="${formattedCheckoutDate}"]`, { timeout: 10000 })  // Match part of the aria-label
      .click({ force: true })
      .then(() => {
        cy.log(`Clicked on the checkout date: ${formattedCheckoutDate}`);
      });
  }

  public verifyCheckoutCalendarVisible() {
    cy.get(this.checkoutCalendarVisible).should('be.visible');
  }

  public submitSearch() {
    cy.get(this.searchButton).click();
  }

  public verifySelectedDates(checkinDate: string, checkoutDate: string) {
    // Format the check-in and check-out dates for comparison (without the year)
    const formattedCheckinDate = moment(checkinDate).format('MMM D'); // Format: "Feb 19"
    const formattedCheckoutDate = moment(checkoutDate).format('MMM D'); // Format: "Feb 20"
    
    // Adjust the assertion to match the format the UI is displaying (e.g., "Feb 19")
    cy.get(this.checkinDateElement).eq(0).should('have.text', formattedCheckinDate);  // Assert check-in date
    cy.get(this.checkoutDateElement).eq(1).should('have.text', formattedCheckoutDate); // Assert check-out date
  }
}

export default AirbnbPage;
