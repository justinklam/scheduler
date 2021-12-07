import React from "react";
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/

import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, 
  getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } 
  from "@testing-library/react";
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

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    // console.log(prettyDOM(appointment));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
    // console.log(prettyDOM(day));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
        
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining"));

  
    // 3. Click the "Add" button on the first empty appointment.
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // 5. Click the first interviewer in the list.
    // 6. Click the "Save" button on that same appointment.
    // 7. Check that the element with the text "Saving" is displayed.
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining"));

    // console.log(prettyDOM(container));
    // console.log(prettyDOM(debug));

  // 1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Delete" button on the booked appointment.
  // 4. Check that the confirmation message is shown.
  // 5. Click the "Confirm" button on the confirmation.
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Alyx Vance" }
    });
    
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // console.log(prettyDOM(container));
    await waitForElement(() => getByAltText(appointment, "Close"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining"));

  // 1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Edit" button on the booked appointment.
  // 4. Enter the name "Alyx Vance" into the input with the placeholder "Enter Student Name".
  // 5. Click the "Save" button on the confirmation.
  // 6. Check that the element with the text "Saving" is displayed.
  // 7. Wait until the element with the "Close" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" has the same "1 spot remaining"
  });

  it("shows the save error when failing to save an appointment", async() => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Alyx Vance" }
      });
      
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Interviewer must be selected")).toBeInTheDocument();

    // console.log(prettyDOM(container));

  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Error"));

    expect(getByText(container, "Error deleting appointment")).toBeInTheDocument();

    console.log(prettyDOM(container));

    // await waitForElement(() => getByText(appointment, "Error"));
    // expect(getByText(appointment, "There was an error deleting your interview.")).toBeInTheDocument();

  });

});