import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [catImage, setCatImage] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/cats/random")
      .then((res) => res.json())
      .then((data) => setCatImage(data[0].url))
      .catch(setError);

    fetch("/cats/random")
      .then((res) => res.json())
      .then((data) => setCatImage(data[0].url))
      .catch(setError);
  }, []);

  return (
    <div className="App">
      <img src={catImage} alt="" />
      {JSON.stringify(error)}
    </div>
  );
}

export default App;
