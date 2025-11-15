import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calender";

describe("Calendar Component", () => {
  const testDate = new Date("2025-01-11");

  it("renders the calendar with the correct month and year", () => {
    render(<Calendar date={testDate} />);

    // Month and year should be appear based on the passed date
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025")).toBeInTheDocument();
  });

  it("shows all weekday headers", () => {
    render(<Calendar date={testDate} />);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekdays.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("highlights the initially selected date", () => {
    render(<Calendar date={testDate} />);

    const selected = screen.getByText("11");
    expect(selected).toHaveClass("selected");
  });

  it("moves to the next month when clicking the Next button", () => {
    render(<Calendar date={testDate} />);

    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("February")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025")).toBeInTheDocument();
  });

  it("moves to the previous month when clicking the Prev button", () => {
    render(<Calendar date={testDate} />);

    fireEvent.click(screen.getByText("Prev"));

    expect(screen.getByText("December")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024")).toBeInTheDocument();
  });

  it("updates the selected date when a date cell is clicked", () => {
    render(<Calendar date={testDate} />);

    const dayCell = screen.getByText("15");
    fireEvent.click(dayCell);

    expect(dayCell).toHaveClass("selected");
  });
});
