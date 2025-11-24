import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Principal from "./pages/Principal";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Posts from "./pages/Posts";
import Amizades from "./pages/Amizades";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import EncontrarPessoas from "./pages/EncontrarPessoas";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route
            path="/amizades"
            element={
              <ProtectedRoute>
                <Amizades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/encontrar-pessoas"
            element={
              <ProtectedRoute>
                <EncontrarPessoas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
