import "./App.css";
import React, { useState, useEffect } from "react";

import Video from "./Video";

const baseUrl = process.env.PORT ? "here app URL" : "http://localhost:5000/";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);
  return (
    <>
      <header>
        <h1>Video recommendation system</h1>
      </header>
      {videos.map((el) => (
        <Video key={el.id} {...el} />
      ))}
    </>
  );
}

export default App;
