context("Add new user and log to his account ", () => {
  beforeEach(() => {
    cy.visit("authentication");
  });

  it("add random user and connect to it", () => {
    function generateRandomUser() {
      const randomId = Math.floor(Math.random() * 100000);
      const user = {
        firstname: `user${randomId}`,
        lastname: `user${randomId}`,
        nickname: `user${randomId}`,
        email: `user${randomId}@example.com`,
        password: `password${randomId}`,
      };
      return user;
    }
    const user = generateRandomUser();
    // add a random user
    cy.get('[data-cy="signup-page"]').click();
    cy.get('[data-cy="signup-firstname"]')
      .should("be.visible")
      .click()
      .type(user.firstname);
    cy.get('[data-cy="signup-lastname"]').click().type(user.lastname);
    cy.get('[data-cy="signup-nickname"]').click().type(user.nickname);
    cy.get('[data-cy="signup-email"]').click().type(user.email);
    cy.get('[data-cy="signup-password"]').click().type(user.password);
    cy.get('[data-cy="signup-confirmpassword"]').click().type(user.password);
    cy.get('[data-cy="signup-registerbutton"]').click();

    // login with the random user
    cy.get('[data-cy="signin-connectionbutton"]', { timeout: 10000 }).click();
    cy.get('[data-cy="signin-email"]').click().type(user.email);
    cy.get('[data-cy="signin-password"]').click().type(user.password);
    cy.get('[data-cy="signin-loginbutton"]').click();

    // check if the user is connected
    cy.contains("VOS TAGS");
  });
});

export {};
