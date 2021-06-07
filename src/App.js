import "./App.css";
import React, { useState, useEffect } from "react";

import Video from "./Video";
import NavBar from "./NavBar";

const baseUrl =
  process.env.REACT_APP_MODE === "prod"
    ? "https://video-recommendation-backend.cbaggini.repl.co"
    : "http://localhost:5000";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc_rating");

  const getVideos = () => {
    let url = baseUrl + `?order=${order}`;
    if (search !== "") {
      url += `&title=${search}`;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": baseUrl,
      },
    })
      .then((res) => res.json())
      .then((data) => setVideos(data));
  };

  const deleteVideo = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": baseUrl,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          getVideos();
          alert("Video successfully deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Could not delete video");
      });
  };

  useEffect(getVideos, [search, order]);

  return (
    <>
      <NavBar
        setSearch={setSearch}
        setOrder={setOrder}
        baseUrl={baseUrl}
        getVideos={getVideos}
      />
      <section>
        {videos.length > 0 ? (
          videos.map((el) => (
            <Video
              key={el.id}
              {...el}
              deleteVideo={deleteVideo}
              baseUrl={baseUrl}
            />
          ))
        ) : (
          <h3>No videos found for your search term</h3>
        )}
      </section>
    </>
  );
}

export default App;
