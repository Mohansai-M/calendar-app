import './CalendarHeader.css'
type CalendarHeaderProps = {
  selectedDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
};

export default function CalendarHeader({selectedDate, onPrev,  onNext,  onYearChange}: CalendarHeaderProps) {
  const currentYear = selectedDate.getFullYear();

  // Calculationg the year range once
  const years = [];
  for (let i = 1900; i <= 2100; i++) years.push(i);

  return (
    <div
      className="calendar-header"
      role="group"
      aria-label="Calendar navigation"
    >
      <button className="nav-btn" onClick={onPrev}
        aria-label="Go to previous month"
      >
        Prev
      </button>

      <span className="month-name" aria-live="polite">
        {selectedDate.toLocaleString("default", { month: "long" })}
      </span>

      <select
        className="year-select"
        value={currentYear}
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        aria-label="Select year"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button className="nav-btn" onClick={onNext}
        aria-label="Go to next month"
      >
        Next
      </button>
    </div>
  );
}
