import React from "react";
import CategoryCardComponent from "../../src/components/CategoryCardComponent";
import { BrowserRouter } from "react-router-dom";

describe("Tests for CategoryCardComponent", () => {
  it("should display title and banner if bannerBoolean is true", () => {
    const mockBanner = "path/to/banner.jpg";
    const mockTitle = "Test Title";

    // Mount the component with mockBanner and mockTitle
    cy.mount(
      <BrowserRouter>
        <CategoryCardComponent
          banner={mockBanner}
          title={mockTitle}
          id={1}
          bgColor="#FFF"
          bannerBoolean={true}
          categoryBoolean={false}
        />
      </BrowserRouter>
    );

    // Check that the image and title are present
    cy.get(".category-card img").should("have.attr", "src", mockBanner);
    cy.get(".category-card h3").should("have.text", mockTitle);
  });

  it("should not display the banner if bannerBoolean is false", () => {
    const mockTitle = "Test Title";

    // Mount the component without a banner
    cy.mount(
      <BrowserRouter>
        <CategoryCardComponent
          title={mockTitle}
          id={1}
          bgColor="#FFF"
          bannerBoolean={false}
          categoryBoolean={false}
        />
      </BrowserRouter>
    );

    // Check that the image is not present
    cy.get(".category-card img").should("not.exist");
    cy.get(".category-card h3").should("have.text", mockTitle);
  });
});
