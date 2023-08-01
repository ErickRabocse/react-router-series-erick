import React from "react";
import "./showDetails.css";
//Hook manipulates the dynamic routes &stores vars declared in Index.js(react-router)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();

  const [show, setShows] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [chars, setChars] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => setChars(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then((res) => res.json())
      .then((data) => setSeasons(data))
      .catch((err) => console.error(err));
  });

  let cleanText = show?.summary.replace(/<\/?[^>]+(>|$)/g, "");

  // const handleShow = () => {
  //   const [showResult, setShowResult] = useState(false);
  //   const onClick = () => setShowResult(true);
  //   return (
  //     <div>
  //       <input type="submit" onClick={onClick} />
  //       {showResult
  //         ? div.episodes - container.style.display("block")
  //         : div.episodes - container.style.display("none")}
  //     </div>
  //   );
  // };

  return (
    <div className="container text-center mt-3">
      {/* * * * * * FIRST ROW * * * * * */}
      <div className="row">
        {/* HERE GOES THE POSTER */}
        <div className="col-lg-3 col-md-12">
          <img src={show?.image?.medium} alt="show poster" />
        </div>
        {/* HERE GOES THE SUMMARY */}
        <div className="col-lg-9 col-md-12 d-flex flex-column y-axis justify-content-center align-items-center bg-light text-dark">
          <h4 className="text-primary">{show?.name}</h4>
          <br />
          {cleanText}
          <br />
          <br />
          <strong>Official site:</strong>
          <Link to={show?.officialSite} target="_blank">
            {" "}
            {show?.officialSite}
          </Link>
        </div>
      </div>
      {/* * * * * * SECOND ROW * * * * * */}
      <div className="row mt-3">
        {/* HERE GO THE CHARACTERS */}
        <div className="col-lg-3 col-md-12 overflow-auto my-4 characters-container">
          <h4 className="text-primary">Characters</h4>
          {chars.map((person) => (
            <div key={person?.person?.id}>
              <p className="mt-3" key={person.person.id}>
                {person?.person?.name} <strong>as</strong>{" "}
                {person?.character?.name}
              </p>
              <img
                className="image-actor"
                src={person?.person?.image?.medium}
                alt=""
              />
            </div>
          ))}
        </div>
        {/* HERE GO THE SEASONS / EPISODES */}
        <div className="col-lg-9 col-md-12 overflow-auto my-4 characters-container">
          <h4 className="text-primary">Episodes</h4>
          {seasons.map((el) => (
            <>
              <div>
                <h5 className="p-3 mb-2 bg-dark text-white">
                  Season {el.number}
                </h5>
              </div>
              <div className="episodes-container">
                {episodes
                  .filter((ep) => ep.season == `${el.number}`)
                  .map((ep) => (
                    <p key={ep?.id}>
                      <strong>{ep?.number}</strong> - {ep?.name}{" "}
                      <em>(Air date: {ep?.airdate})</em>
                    </p>
                  ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
