import { useEffect, useState } from "react";
import { useCalendar, type CalendarDay } from "../hooks/useCalender";
import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";
type CalendarProps = {
  date: Date | string;
};

export default function Calendar({ date }: CalendarProps) {
  // Converting and validating the date and chaning it to Date object
  const initialDate = typeof date === "string" ? new Date(date) : date;
  const [selected, setSelected] = useState<Date>(initialDate);

  // below useeffect is to update the date w.r.t to input field
  useEffect(() => {
    setSelected(new Date(date));
  }, [date]);

  const weeks = useCalendar(selected);
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleClick = (day: Date) => {
    setSelected(day);
  };

  const prevMonth = () => {
    const newDate = new Date(selected);
    newDate.setMonth(selected.getMonth() - 1);
    setSelected(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selected);
    newDate.setMonth(selected.getMonth() + 1);
    setSelected(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(selected);
    newDate.setMonth(month);
    setSelected(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(selected);
    newDate.setFullYear(year);
    setSelected(newDate);
  };

  // Keyboard Navigation
  const handleKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const newDate = new Date(selected);

    switch (e.key) {
      case "ArrowLeft":
        newDate.setDate(selected.getDate() - 1);
        break;
      case "ArrowRight":
        newDate.setDate(selected.getDate() + 1);
        break;
      case "ArrowUp":
        newDate.setDate(selected.getDate() - 7);
        break;
      case "ArrowDown":
        newDate.setDate(selected.getDate() + 7);
        break;
      default:
        return;
    }

    e.preventDefault();
    setSelected(newDate);
  };

  return (
    <div
      className="calendar-container"
      tabIndex={0}
      onKeyDown={handleKeys}
      aria-label="Calendar Interface"
    >
      <CalendarHeader
        selectedDate={selected}
        onPrev={prevMonth}
        onNext={nextMonth}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
      <table
        className="calendar-table"
        role="grid"
        aria-label={`${selected.toLocaleString("default", {
          month: "long",
        })} ${selected.getFullYear()} Calendar`}
      >
        <thead>
          <tr className="calender-days">
            {WEEKDAYS.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((dayObj: CalendarDay, colIndex) => (
                <td
                  role="gridcell"
                  aria-selected={dayObj.isSelected ? "true" : "false"}
                  key={colIndex}
                  className={`calendar-cell
                    ${dayObj.isCurrentMonth ? "" : "other-month"}
                    ${dayObj.isToday ? "today" : ""}
                    ${dayObj.isSelected ? "selected" : ""}
                  `}
                  onClick={() => handleClick(dayObj.day)}
                >
                  {dayObj.day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="selected-date">
        {selected.getDate()} &nbsp;
        {selected.toLocaleString("default", { month: "long" })}&nbsp;
        {selected.getFullYear()} is selected
      </p>
    </div>
  );
}
