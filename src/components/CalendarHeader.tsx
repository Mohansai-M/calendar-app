type CalendarHeaderProps = {
  selectedDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
};

export default function CalendarHeader({selectedDate, onPrev,  onNext,  onYearChange}: CalendarHeaderProps) {
  const currentYear = selectedDate.getFullYear();

  const years = [];
  for (let i = 1900; i <= 2100; i++) years.push(i);

  return (
    <div className="calendar-header">
      <button className="nav-btn" onClick={onPrev}>
        Prev
      </button>

      <span className="month-name">
        {selectedDate.toLocaleString("default", { month: "long" })}
      </span>

      <select
        className="year-select"
        value={currentYear}
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button className="nav-btn" onClick={onNext}>
        Next
      </button>
    </div>
  );
}
