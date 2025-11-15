import { useState } from "react";
import './CalenderInput.css'

export default function CalendarInput({
  onSubmit,
}: {
  onSubmit: (date: string) => void;
}) {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);

  const getDaysInMonth = (month: number, year: number) => {
    if (month === 2) {
      // February month check for leap year
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }
    // Months with 30 days
    if ([4, 6, 9, 11].includes(month)) return 30;
    // All other months have 31 days
    return 31;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    // Splitting the input into day,month and year
    let day = input.slice(0, 2);
    let month = input.slice(2, 4);
    let year = input.slice(4, 8);

    //verifying the month
    if (month.length === 2) {
      let monthNumber = parseInt(month, 10);

      if (monthNumber < 1) {
        monthNumber = 1;
      }
      if (monthNumber > 12) {
        monthNumber = 12;
      }
      month = monthNumber.toString().padStart(2, "0");
    }

    //verifying the year
    if (year.length === 4) {
      let yearNumber = parseInt(year, 10);

      if (yearNumber < 1900) {
        yearNumber = 1900;
      }
      if (yearNumber > 2100) {
        yearNumber = 2100;
      }
      year = yearNumber.toString();
    }

    //verifying the day
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      let dayNumber = parseInt(day, 10);
      const monthNumber = parseInt(month, 10);
      const yearNumber = parseInt(year, 10);
      const maxDay = getDaysInMonth(monthNumber, yearNumber); 

      if (dayNumber < 1) {
        dayNumber = 1;
      }
      if (dayNumber > maxDay) {
        dayNumber = maxDay;
      }
      day = dayNumber.toString().padStart(2, "0");
    }

    let formatted = day;
    if (month) formatted += "/" + month;
    if (year) formatted += "/" + year;

    setValue(formatted);
    setShowError(false);
  };

  const handleSubmit = () => {
    const [d, m, y] = value.split("/");
    if (d && m && y && y.length === 4) {
      const dayNum = parseInt(d, 10);
      const monthNum = parseInt(m, 10);
      const yearNum = parseInt(y, 10);

      const maxDay = getDaysInMonth(monthNum, yearNum);
      if (dayNum >= 1 && dayNum <= maxDay) {
        onSubmit(`${y}-${m}-${d}`);
        return;
      }
    }

    setShowError(true);
  };

  return (
    <div className="calendar-input-wrapper">
      <label htmlFor="date-field" className="sr-only">
        Enter a date (dd/mm/yyyy)
      </label>

      <input
        id="date-field"
        className="input-text-calender"
        type="text"
        maxLength={10}
        placeholder="dd/mm/yyyy"
        value={value}
        onChange={handleChange}
        aria-invalid={showError}
        aria-describedby={showError ? "date-error" : undefined}
      />

      <button className="input-calender-button" onClick={handleSubmit}>
        Submit
      </button>

      {showError && (
        <p id="date-error" className="error-text" role="alert">
          Please enter a valid date (dd/mm/yyyy).
        </p>
      )}
    </div>
  );
}
