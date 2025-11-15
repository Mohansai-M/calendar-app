import { useMemo } from "react";

export interface CalendarDay {
  day: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

export function useCalendar( selectedDate: Date, rows: number = 6,  cols: number = 7 ): CalendarDay[][] {

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  return useMemo(() => {
    const today = new Date();
    const startOfMonth = new Date(selectedYear, selectedMonth, 1);

    const gridStartDate = new Date(startOfMonth);
    gridStartDate.setDate(gridStartDate.getDate() - startOfMonth.getDay());

    const calendarDays: CalendarDay[] = [];

    for (let i = 0; i < rows * cols; i++) {
      const current = new Date(gridStartDate);
      current.setDate(gridStartDate.getDate() + i);

      calendarDays.push({
        day: current,
        isCurrentMonth: current.getMonth() === selectedMonth,
        isSelected:
          current.getFullYear() === selectedDate.getFullYear() &&
          current.getMonth() === selectedDate.getMonth() &&
          current.getDate() === selectedDate.getDate(),
        isToday:
          current.getFullYear() === today.getFullYear() &&
          current.getMonth() === today.getMonth() &&
          current.getDate() === today.getDate(),
      });
    }

    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < rows; i++) {
      weeks.push(calendarDays.slice(i * cols, i * cols + cols));
    }

    return weeks;
  }, [selectedDate, rows, cols, selectedMonth, selectedYear]);
}
