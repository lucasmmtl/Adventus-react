import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Posts from "./pages/Posts";
import Amizades from "./pages/Amizades";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/amizades" element={<Amizades />} />
      </Routes>
    </Router>
  );
}

export default App;
