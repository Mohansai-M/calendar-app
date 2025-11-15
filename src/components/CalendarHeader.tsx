type CalendarHeaderProps = {
  selectedDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
};

export default function CalendarHeader({selectedDate, onPrev,  onNext,  onYearChange}: CalendarHeaderProps) {

  const years = [];
  for (let i = 1900; i <= 2100; i++) years.push(i);

  return (
    <div className="calendar-header">
      <button onClick={onPrev}>Prev</button>
      <span className="month-name">
        {selectedDate.toLocaleString("default", { month: "long" })}
      </span>
      <select
        value={selectedDate.getFullYear()}
        onChange={(e) => onYearChange(parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
