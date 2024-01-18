import React from "react"; 
import { Routes, Route, BrowserRouter } from "react-router-dom";   
import ProjectOne from "./pages/ProjectOne";
import ProjectTwo from "./pages/ProjectTwo";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />   
        <Route exact path="/projectOne" element={<ProjectOne />} />   

        <Route exact path="/projectTwo" element={<ProjectTwo />} />   

      </Routes>
    </BrowserRouter>
  );
}
