describe("appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {

    cy.get("[alt=Add]")
    // finds the first Add on page, [0] is in use
      .first()
      .click();

    cy.get("[data-testid='student-name-input']")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid='student-name-input']").clear()
      .type("Alyx Vance");

    cy.get("[alt='Tori Malcolm']")
      .click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Alyx Vance");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  // find the add button in the second appointment slot.
  // click the add button in the second appointment through alt tag

});