/*import AirbnbPage from '../../support/pages/AirbnbPage';  // Ensure this path is correct
import moment from 'moment';

describe('Airbnb Date Selection Test', () => {
  it('should select dynamic check-in and check-out dates', () => {
    const airbnbPage = new AirbnbPage();  // Create an object instance for the AirbnbPage class

    // Visit the Airbnb website
    airbnbPage.visit();  
    cy.wait(4000);  // Wait for the page to load and elements to be available

    // Search for location (Lahore in this case)
    airbnbPage.searchLocation('Lahore');  

    // Dynamically generate check-in and check-out dates using moment
    const checkinDate = moment().format('D, dddd, MMMM YYYY');  // Format: "19, Wednesday, February 2025"
    const checkoutDate = moment().add(10, 'days').format('D, dddd, MMMM YYYY');  // Format: "29, Sunday, February 2025"

    // Log to check the generated dates
    cy.log(`Check-in Date: ${checkinDate}`);
    cy.log(`Checkout Date: ${checkoutDate}`);

    // Pass the dynamically generated dates to the methods for date selection
    airbnbPage.selectCheckinDate(checkinDate);  
    airbnbPage.verifyCheckoutCalendarVisible();  // Verify that the checkout calendar is visible after selecting check-in date
    airbnbPage.selectCheckoutDate(checkoutDate);  // Select checkout date

    // Submit the search with the selected dates
    airbnbPage.submitSearch();  

    // Verify that the selected dates are correctly displayed (assert without year and in format "Feb 19")
    airbnbPage.verifySelectedDates(checkinDate, checkoutDate);  // Assert that the selected dates match
  });
});
*/