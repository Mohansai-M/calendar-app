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
  it("lets you navigate dates using arrow keys", () => {
    render(<Calendar date={testDate} />);
    const calendar = screen.getByLabelText("Calendar Interface");

    // move right and 12 should be selected
    fireEvent.keyDown(calendar, { key: "ArrowRight" });
    expect(screen.getByText("12")).toHaveClass("selected");

    // move left and go back to 11th
    fireEvent.keyDown(calendar, { key: "ArrowLeft" });
    expect(screen.getByText("11")).toHaveClass("selected");

    // move up and go  7 days back, should be 4th
    fireEvent.keyDown(calendar, { key: "ArrowUp" });
    const selectedUp = screen
      .getAllByText("4")
      .find((cell) => cell.classList.contains("selected"));
    expect(selectedUp).toBeTruthy();

    // move down and go   7 days forward, back to 11th
    fireEvent.keyDown(calendar, { key: "ArrowDown" });
    expect(screen.getByText("11")).toHaveClass("selected");
  });

  it("updates year when user selects a different one", () => {
    render(<Calendar date={testDate} />);
    const yearSelect = screen.getByDisplayValue("2025");

    // change year to  2030
    fireEvent.change(yearSelect, { target: { value: "2030" } });
    expect(screen.getByDisplayValue("2030")).toBeInTheDocument();
  });

  it("highlights today's date if it's in the visible month", () => {
    const today = new Date();
    render(<Calendar date={today} />);

    // today's date should have the 'today' class
    const todayCell = screen.getByText(today.getDate().toString());
    expect(todayCell).toHaveClass("today");
  });

  it("handles year rollover correctly when navigating months", () => {
    render(<Calendar date={new Date("2025-12-15")} />);

    // next month shoould be January of next year
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026")).toBeInTheDocument();

    // previous month twice should back to November
    fireEvent.click(screen.getByText("Prev"));
    fireEvent.click(screen.getByText("Prev"));
    expect(screen.getByText("November")).toBeInTheDocument();
  });

  it("renders dates from other months as muted", () => {
    render(<Calendar date={new Date("2025-01-01")} />);

    // look for '31' which belongs to December 2024
    const extraDates = screen.getAllByText("31");
    const isOtherMonth = extraDates.some((cell) =>
      cell.classList.contains("other-month")
    );
    expect(isOtherMonth).toBe(true);
  });

  it("has correct ARIA label for accessibility", () => {
    render(<Calendar date={testDate} />);
    const calendar = screen.getByLabelText("Calendar Interface");
    expect(calendar).toBeInTheDocument();
  });
});
