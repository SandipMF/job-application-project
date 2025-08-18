import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom"; //, Outlet
import Login from "./components/screens/Login/Login";
import Dashboard from "./components/screens/Dashboard/index";
import Registration from "./components/screens/Registration/Registration";
import { LOCAL_STORAGE_KEY_TOKEN } from "./storage";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
    </Routes>
  );
};
//
export default App;
