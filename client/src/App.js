import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [catImage, setCatImage] = useState("");

  useEffect(() => {
    fetch("/cats/random")
      .then((res) => res.json())
      .then((data) => setCatImage(data[0].url));
  }, []);

  return (
    <div className="App">
      <img src={catImage} alt="" />
    </div>
  );
}

export default App;
