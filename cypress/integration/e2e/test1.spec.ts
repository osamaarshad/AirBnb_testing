// File: cypress/integration/test.spec.ts
import AirbnbPage from '../../support/pages/AirbnbPage'; 
describe('My First Test', () => {
  let CheckinDate: string;
  let CheckoutDate: string;

  // Load fixture data before the test runs
  before(() => {
    cy.fixture('example.json').then((data) => {
      CheckinDate = data.checkinDate;
      CheckoutDate = data.checkoutDate;
    });
  });

  it('Airbnb website', () => {
    const airbnbPage = new AirbnbPage();  // create an object instance for class Airbnb

    airbnbPage.visit();  
    cy.wait(4000);  

    airbnbPage.searchLocation('Lahore');  //grab search bar and type lahore
    airbnbPage.selectCheckinDate();  // select the check-in date

    airbnbPage.verifyCheckoutCalendarVisible();  // verify that checkout calendar is visible
    airbnbPage.selectCheckoutDate();  // select the checkout date
    airbnbPage.submitSearch();  // click on the search button

    // Assertions
    airbnbPage.verifySelectedDates(CheckinDate, CheckoutDate);  // dynamically asserting checkin,checkout date
  });
});
