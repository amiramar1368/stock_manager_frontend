import { createContext } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export const loadingContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <loadingContext.Provider value={{ loading,setLoading }}>
      <Header />
      <Sidebar />
      <Outlet />
    </loadingContext.Provider>
  );
}

export default App;
