import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
