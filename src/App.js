import { useEffect, useState } from "react";
import "./App.css";
import Crud from "./CRUD/Crud";
import DotLoader from "react-spinners/DotLoader";

function App() {
  const [loading, setloading] = useState(false);
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
      {loading ? (
        <DotLoader
          color={"#36d7b7"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Crud />
      )}
    </>
  );
}

export default App;
