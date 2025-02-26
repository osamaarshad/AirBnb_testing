import TopCitiesPage from '../../support/pages/SelectCity'
describe('Test Top Cities and Minimum Distance', () => {
  const topCitiesPage = new TopCitiesPage(); // 

  it('should select the city with the minimum distance', () => {
    
    topCitiesPage.selectTopCities();

    
    topCitiesPage.cityMindist();


    cy.log('The minimum distance city has been selected');
  });
});