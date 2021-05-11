import { useRef } from "react";

const NavBar = ({ setSearch, setOrder }) => {
  const searchBar = useRef();

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
    console.log(e.target.value);
    console.log(e.target.lastElementChild.className);
  };
  return (
    <nav>
      <input
        type="text"
        ref={searchBar}
        placeholder="search video"
        onChange={resetSearch}
      ></input>
      <button onClick={() => setSearch(searchBar.current.value.toLowerCase())}>
        Search
      </button>
      <button value="title" onClick={toggleSorting}>
        Sort by title <i className=""></i>
      </button>
      <button value="rating" onClick={toggleSorting}>
        Sort by rating <i className="fa fa-angle-double-down"></i>
      </button>
    </nav>
  );
};

export default NavBar;
