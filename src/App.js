import { useEffect, useState } from "react";
import "./App.css";
import Crud from "./CRUD/Crud";
import ClipLoader from "react-spinners/ClipLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Home from "./pages/Home/Home";
import Footer from "./Component/Footer/Footer";

function App() {
  const [loading, setloading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("email");

  const override = {
    position: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
  };

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/Product" element={<Crud />} />
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
