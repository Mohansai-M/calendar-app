import "./App.css";
import Calender from "./components/Calender";
function App() {
  const somedate = "2025-01-11";
  return (
    <>
      <Calender date={somedate} />
    </>
  );
}

export default App;
