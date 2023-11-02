import React from "react";
import TagCardComponent from "../../src/components/TagCardComponent";
import { BrowserRouter } from "react-router-dom";
import { mount } from "@cypress/react";

describe("Tests for TagCardComponent", () => {
  const mockTag = {
    id: 1,
    name: "Technology",
    logo: "logo.jpg",
    bg_color: "#FF5733",
  };

  it("should render with tag information", () => {
    // Mount the component with a mock tag
    mount(
      <BrowserRouter>
        <TagCardComponent tag={mockTag} />
      </BrowserRouter>
    );

    // Check if the tag name and logo are displayed
    cy.get(".tag-name").should("have.text", mockTag.name.toUpperCase());
    cy.get(".tag-symbol img").should("have.attr", "src", mockTag.logo);
    cy.get(".tag-symbol img").should("have.attr", "alt", mockTag.name);
  });
});
