import "./CalendarHeader.css";

type CalendarHeaderProps = {
  selectedDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
};

export default function CalendarHeader({selectedDate, onPrev,  onNext,  onYearChange, onMonthChange}: CalendarHeaderProps) {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  // Calculationg the year range once
  const years = [];
  for (let i = 1900; i <= 2100; i++) years.push(i);

  // Month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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


      <select
        className="month-select"
        value={currentMonth}
        onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
        aria-label="Select month"
      >
        {months.map((monthName, index) => (
          <option key={index} value={index}>
            {monthName}
          </option>
        ))}
      </select>

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
