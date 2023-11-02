import React from "react";
import Button from "../../src/components/ButtonComponent";

describe("Tests pour divers composants react", () => {
  it("should show title and subtitle", () => {
    // Mount Button component, pass props to it and check if value is true
    cy.mount(<Button buttonShowText="Click on me"></Button>);
    cy.get("button").should("contains.text", "Click on me");
  });
});

export {};
