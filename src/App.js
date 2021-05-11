import "./App.css";
import React, { useState, useEffect } from "react";

import Video from "./Video";
import NavBar from "./NavBar";

const baseUrl = process.env.PORT ? "here app URL" : "http://localhost:5000";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc_rating");

  const deleteVideo = (id) => {
    // send delete request, then reset search
  };

  useEffect(() => {
    let url = baseUrl + `?order=${order}`;
    if (search !== "") {
      url += `&title=${search}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, [search, order]);

  return (
    <>
      <header>
        <h1>Video recommendation system</h1>
      </header>
      <NavBar setSearch={setSearch} setOrder={setOrder} />
      {videos.map((el) => (
        <Video key={el.id} {...el} deleteVideo={deleteVideo} />
      ))}
    </>
  );
}

export default App;
