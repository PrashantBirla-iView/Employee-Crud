import { useEffect, useState } from "react";
import "./App.css";
import Crud from "./CRUD/Crud";
import ClipLoader from "react-spinners/ClipLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import PageScrollInfinite from "./Component/PageScrollInfinite";

function App() {
  const [loading, setloading] = useState(false);
  const [navproduct, setnavproduct] = useState("");

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
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <Navbar setnavproduct={setnavproduct} />
            <Routes>
              <Route
                path="/product-infinite-loading"
                element={<PageScrollInfinite />}
              />
              <Route path="/" element={<Crud navproduct={navproduct} />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
