import AirbnbPage from '../../support/pages/AirbnbPage';
describe('My First Test', () => {
  let CheckinDate: string;
  let CheckoutDate: string;
  let CityIs:string

  // Load fixture data before the test runs
  before(() => {
    cy.fixture('example.json').then((data) => {
      CheckinDate = data.checkinDate;
      CheckoutDate = data.checkoutDate;
      CityIs = data.city;
    });
  });

  it('Airbnb website', () => {
    const airbnbPage = new AirbnbPage();  // create an object instance for class Airbnb

    // airbnbPage.visit();  
    cy.wait(4000);

    airbnbPage.searchLocation('Lahore');  //grab search bar and type lahore

    airbnbPage.selectCheckinDate();  // select the check-in date

    airbnbPage.verifyCheckoutCalendarVisible();  // verify that checkout calendar is visible
    airbnbPage.selectCheckoutDate();  // select the checkout date
    airbnbPage.submitSearch();  // click on the search button

    // Assertions
    airbnbPage.verifySelectedDates(CheckinDate, CheckoutDate);
    cy.wait(4000);
    airbnbPage.assertLocation(CityIs);  // assert that location 

  // select the cheapest room
  airbnbPage.selectCheapestRoom();


  

});
});



























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






 


