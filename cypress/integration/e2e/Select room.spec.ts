 import AirbnbPage from '../../support/pages/AirbnbPage';

describe('My First Test', () => {
  let CheckinDate: string;
  let CheckoutDate: string;
  let CityIs: string;

  // Load fixture data before the test run
  before(() => {
    cy.fixture('example.json').then((data) => {
      CheckinDate = data.checkinDate;
      CheckoutDate = data.checkoutDate;
      CityIs = data.city;
    });
  });

  it('Airbnb website', () => {
    const airbnbPage = new AirbnbPage();  // create an object instance for class Airbnb

    cy.wait(6000);

    // Call login method here
   airbnbPage.login('farhan1232025@gmail.com', '!A12345678'); 

    airbnbPage.searchLocation('Lahore');  
    airbnbPage.selectCheckinDate();  
    airbnbPage.verifyCheckoutCalendarVisible();  // Verify that checkout calendar is visible
    airbnbPage.selectCheckoutDate();  
    airbnbPage.submitSearch();  // Click on the search button

    // Assertions
    airbnbPage.verifySelectedDates(CheckinDate, CheckoutDate);
    cy.wait(4000);
    airbnbPage.assertLocation(CityIs);  // Assert that location 

    // Select the cheapest room
    airbnbPage.selectCheapestRoom();
  });
});



 


