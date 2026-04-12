import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFunnel from "./pages/QuizFunnel";
import DirectBooking from "./pages/DirectBooking";
import QuizFlow from "./components/quiz/QuizFlow";
import QuizResults from "./components/quiz/QuizResults";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizFunnel />} />
          <Route path="/quiz" element={<QuizFlow />} />
          <Route path="/results" element={<QuizResults />} />
          <Route path="/book" element={<DirectBooking />} />
          <Route path="/session" element={<DirectBooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
