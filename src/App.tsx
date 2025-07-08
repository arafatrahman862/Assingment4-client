

import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;