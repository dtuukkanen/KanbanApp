import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
