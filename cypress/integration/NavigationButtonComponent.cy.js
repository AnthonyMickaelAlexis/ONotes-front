import React from "react";
import NavigationButtonComponent from "../../src/components/NavigationButtonComponent";
import { MemoryRouter } from "react-router-dom";

describe("Tests for NavigationButtonComponent", () => {
  it("should display icon if icon prop is provided", () => {
    const mockIcon = "path/to/icon.png";

    // Mount the component with icon
    cy.mount(
      <MemoryRouter>
        <NavigationButtonComponent
          text="Button"
          icon={mockIcon}
          textColor="#FFFFFF"
          bgColor="#000000"
          link="/some-page"
        />
      </MemoryRouter>
    );

    // Check if the icon is displayed
    cy.get(".navigation-button-content img").should(
      "have.attr",
      "src",
      mockIcon
    );
  });
});
