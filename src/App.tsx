import { useState } from "react";
import Calender from "./components/Calender";
import CalendarInput from "./components/CalenderInput";

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2025-01-11");

  return (
    <>
      <CalendarInput
        onSubmit={(date) => setSelectedDate(date)}
      />

      <Calender date={selectedDate} />
    </>
  );
}
