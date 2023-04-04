import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

function Loader() {
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
      <DotLoader
        color={"#36d7b7"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}

export default Loader;
