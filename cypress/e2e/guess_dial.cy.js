/// <reference types="Cypress" />

describe("guess dial", () => {
  it("can be rotated", () => {
    cy.visit("/");
    cy.get('img[src="assets/guess.svg"]').should(
      "have.css",
      "transform",
      "rotate(0deg)"
    );
    // cy.get('img[src="assets/guess.svg"]').then(($guessDial) => {
    //   const offset = $guessDial.offset();
    //   console.log(offset);
    //   const downX = $guessDial.width() / 2 + offset.left;
    //   const downY = $guessDial.height() / 2 + offset.top;
    //   console.log(`x: ${downX}, y: ${downY}`);

    //   cy.wrap($guessDial)
    //     .trigger("mousedown", { clientX: downX, clientY: downY, which: 1 })
    //     .trigger("mousemove", {
    //       clientX: downX - 100,
    //       clientY: downY,
    //       which: 1,
    //     })
    //     .trigger("mouseup");
    // });

    // cy.get('img[src="assets/guess.svg"]').should(
    //   "have.css",
    //   "transform",
    //   "rotate(-20deg)"
    // );
  });
});
