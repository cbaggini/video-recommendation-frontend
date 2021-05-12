import { useState, useRef } from "react";

const NavBar = ({ setSearch, setOrder, baseUrl, getVideos }) => {
  const searchBar = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [newVideo, setNewVideo] = useState({});

  const handleChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(baseUrl + "/", {
      method: "POST",
      headers: {
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
      });
  };

  const resetSearch = () => {
    searchBar.current.value === "" && setSearch("");
  };

  const toggleSorting = (e) => {
    if (
      e.target.value === "title" &&
      e.target.lastElementChild.className === "fa fa-angle-double-down"
    ) {
      setOrder("desc");
      e.target.lastElementChild.className = "fa fa-angle-double-up";
    } else if (e.target.value === "title") {
      setOrder("asc");
      e.target.lastElementChild.className = "fa fa-angle-double-down";
    } else if (
      e.target.value === "rating" &&
      e.target.lastElementChild.className === "fa fa-angle-double-down"
    ) {
      setOrder("asc_rating");
      e.target.lastElementChild.className = "fa fa-angle-double-up";
    } else {
      setOrder("desc_rating");
      e.target.lastElementChild.className = "fa fa-angle-double-down";
    }
  };
  return (
    <nav>
      <input
        type="text"
        ref={searchBar}
        placeholder="search video"
        onChange={resetSearch}
      ></input>
      <button type="button" onClick={() => setSearch(searchBar.current.value)}>
        Search
      </button>
      <button type="button" value="title" onClick={toggleSorting}>
        Sort by title <i className=""></i>
      </button>
      <button type="button" value="rating" onClick={toggleSorting}>
        Sort by rating <i className="fa fa-angle-double-down"></i>
      </button>
      <button
        type="button"
        onClick={() => setIsVisible((isVisible) => !isVisible)}
      >
        Add video
      </button>
      {isVisible && (
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
          <button type="submit">Submit</button>
        </form>
      )}
    </nav>
  );
};

export default NavBar;
