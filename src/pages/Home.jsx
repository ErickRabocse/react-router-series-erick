import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => setSeries(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setSeries(data);
      })
      .catch((err) => console.error(err));
  };

  // const filteredShows = series.filter((show) => {
  //   return show.name.toLowerCase().includes(search.toLowerCase());
  // });

  return (
    <>
      <div className="container">
        <form className="d-flex my-2" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleClick}
          >
            Search
          </button>
        </form>

        <div className="row">
          {series.map((show) => (
            <div
              className="col-sm-3 mainCardDiv"
              key={show.id || show?.show?.id}
            >
              <div className="card">
                <div className="card-body">
                  <img
                    src={show?.image?.medium || show?.show?.image?.medium}
                    alt="show poster"
                    className="card-img-top show_poster"
                  />
                  <p className="card-name">{show?.name || show?.show?.name}</p>
                  <p className="card-rating">
                    ⭐️ {show?.rating?.average || show?.show?.rating?.average}
                  </p>
                  <Link
                    to={`/show/${show.id || show?.show?.id}`}
                    className="btn btn-primary"
                  >
                    View more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
