import React from "react";
import ImageUpload from "../../src/components/ImageUpload";

describe("Tests for ImageUpload component", () => {
  it("should render correctly with initial props", () => {
    const mockGetImage = cy.stub();
    const mockText = "Upload Image";
    const mockWidth = "200px";
    const mockHeight = "200px";

    // Mount the component with initial props
    cy.mount(
      <ImageUpload
        index={0}
        width={mockWidth}
        height={mockHeight}
        text={mockText}
        getImage={mockGetImage}
        deleteImage={0}
      />
    );

    // Check if the component is rendered correctly
    cy.get(".image-upload-form").should("exist");
    cy.get(".image-upload-text").should("have.text", mockText);
    cy.get(".image-upload-input").should("exist");
  });

  it("should change to drag active state when dragging over", () => {
    // Mount the component
    cy.mount(<ImageUpload />);

    // Simulate dragging over the drop area
    cy.get(".image-upload-label").trigger("dragenter");

    // Check if the drag active state is applied
    cy.get(".image-upload-label").should(
      "have.class",
      "image-upload-label-drag-active"
    );
  });

  it("should clear the image when deleteImage prop changes", () => {
    const setImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    const deleteImage = 1;

    // Mount the component with setImage and deleteImage
    cy.mount(<ImageUpload setImage={setImage} deleteImage={deleteImage} />);

    // Check if the image is cleared when deleteImage prop changes
    cy.get(".image-upload-image").should("have.attr", "src", "");
  });
});
