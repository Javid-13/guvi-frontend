import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const logout = () => {
    return <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/:id" element={<Home />} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;

