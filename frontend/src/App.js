import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFunnel from "./pages/QuizFunnel";
import DirectBooking from "./pages/DirectBooking";
import QuizFlow from "./components/quiz/QuizFlow";
import QuizResults from "./components/quiz/QuizResults";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import ThankYou from "./pages/ThankYou";

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
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
