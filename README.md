# Mini Calender App

This project is a reusable React calendar component built with TypeScript. It allows users to select dates, navigate months and years, and works seamlessly with keyboard and screen readers. It was designed with accessibility and edge cases in mind, including leap years and dynamic day validation.

## Features

- **Reusable Calendar Component** renders a calendar for any given date.
- **Keyboard Navigation**: Users can navigate dates with arrow keys (up/down/left/right).
- **Month & Year Navigation**: Easily move between months using buttons or dropdowns. Year selection spans 1900–2100.
- **Date Input**: Accepts `dd/mm/yyyy` input, validates date ranges dynamically based on month/year, and supports leap years.
- **Edge Case Handling**:  
  - Correct day range per month.  
  - Leap year February handling.  
  - Input validation prevents invalid dates like  

## Installation

```bash
npm install
npm start
```
**Testing**

- This project includes unit tests using React Testing Library to validate:

- Rendering correct month and year based on prop

- Correct highlighting of selected dates

- Navigation via buttons and keyboard

- Proper day-of-week headers

**Implementation Notes**
- Functional React components with hooks were used for state and memoization.
- useCalendar hook calculates the calendar grid efficiently.
- CSS modules handle styling, keeping layout clean and responsive.
- Focused on separating concerns: CalendarHeader, CalendarInput, and Calendar grid are independent components.
