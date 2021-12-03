import React from "react";
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
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

describe("Appointment", () => {

  // it("renders Application without crashing", () => {
  //   render(<Application />);
  // });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

});
