import React from "react";
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/

import { render, cleanup } from "@testing-library/react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import Application from "components/Application";
import Appointment from "components/Appointment";

/*
  We import the component that we are testing
*/
afterEach(cleanup);

// xit to skip a test instead of it

describe("Appointment", () => {

  it("renders Application without crashing", () => {
    render(<Application />);
  });

  it("renders Appointment without crashing", () => {
    render(<Appointment />);
  });

});
