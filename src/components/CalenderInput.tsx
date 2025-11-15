import { useState } from "react";
import './CalenderInput.css'

export default function CalendarInput({
  onSubmit,
}: {
  onSubmit: (date: string) => void;
}) {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    let day = input.slice(0, 2);
    let month = input.slice(2, 4);
    let year = input.slice(4, 8);

    if (month.length === 2) {
      let mm = parseInt(month, 10);
      if (mm < 1) month = "01";
      if (mm > 12) month = "12";
    }

    if (year.length === 4) {
      let y = parseInt(year, 10);
      if (y < 1900) year = "1900";
      if (y > 2100) year = "2100";
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
      onSubmit(`${y}-${m}-${d}`);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="calendar-input-wrapper">
      <label htmlFor="date-field" className="sr-only">
        Enter a date in dd/mm/yyyy format
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
