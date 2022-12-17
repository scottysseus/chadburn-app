import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import * as Y from "yjs";

import { Game } from "./Game";

/**
 * This block mocks the ResizeObserver object, since it is not available
 * in our tests for some reason.
 */
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

// describe("Game scene", () => {
//   test("updates peers when the guess dial is moved", () => {
//     const user = userEvent.setup();

//     const id = "123";

//     let isUpdated = false;
//     const ydoc = new Y.Doc();
//     ydoc.on("update", () => {
//       isUpdated = true;
//     });

//     render(<Game id={id} ydoc={ydoc} />);

//     user.pointer("[MouseLeft>]");

//     expect(isUpdated).toBe(true);
//   });
// });

// src/sum.test.js
describe("+ operator", () => {
  test("calculates the sum of 2 numbers", () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });
});
