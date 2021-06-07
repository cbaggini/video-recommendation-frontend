import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NavBar = ({ setSearch, setOrder, baseUrl, getVideos }) => {
  const searchBar = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [newVideo, setNewVideo] = useState({});

  const handleChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newVideo.url &&
      newVideo.url.includes("www.youtube.com") &&
      newVideo.title
    ) {
      fetch(baseUrl + "/", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": baseUrl,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((response) => {
          if (response.status !== 200) {
            alert("Invalid input");
          }
          return response.json();
        })
        .then((data) => {
          getVideos();
          setNewVideo({});
          setIsVisible(false);
          alert("Video successfully added");
        });
    } else if (newVideo.title) {
      alert("Your URL is not a valid YouTube video");
    } else if (
      newVideo.url &&
      newVideo.url.includes("www.youtube.com/watch?v=")
    ) {
      alert("Title should not be empty");
    } else {
      alert(
        "Your URL is not a valid YouTube video and title should not be empty"
      );
    }
  };

  const resetSearch = () => {
    searchBar.current.value === "" && setSearch("");
  };

  const toggleSorting = (e) => {
    setOrder(e.target.value);
  };

  return (
    <>
      <header>
        <h1>Video recommendation system</h1>
        <div className="search">
          <input
            type="text"
            ref={searchBar}
            placeholder="search video"
            onChange={resetSearch}
          ></input>
          <button
            className="upper btn btn-primary"
            type="button"
            aria-label="search"
            onClick={() => setSearch(searchBar.current.value)}
          >
            Search
          </button>
        </div>
      </header>
      <nav>
        <select onChange={toggleSorting}>
          <option value="desc_rating">Rating - highest to lowest</option>
          <option value="asc_rating">Rating - lowest to highest</option>
          <option value="asc">Title - A to Z</option>
          <option value="desc">Title - Z to A</option>
        </select>

        <Button
          variant="primary"
          onClick={() => setIsVisible((isVisible) => !isVisible)}
        >
          Add video
        </Button>

        <Modal show={isVisible} onHide={() => setIsVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="add video title"
                onChange={handleChange}
              ></input>
              <input
                type="text"
                name="url"
                placeholder="add video link"
                onChange={handleChange}
              ></input>
              <button
                type="submit"
                className="upper btn btn-primary"
                aria-label="send-new-video"
              >
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </nav>
    </>
  );
};

export default NavBar;
