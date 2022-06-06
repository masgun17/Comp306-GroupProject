import { useState, useContext, useEffect } from "react";
import "../Styles/HomePage.css";
import { getTopShowsAction } from "../Tools/actions";
import FilmDetailModal from "./FilmDetailModal";

const TopFilms = () => {
  const [topFilms, setTopFilms] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const a = getTopShowsAction().then((a) => {
        setTopFilms(a);
      });
      //   console.log(a);
    }, 10);
  }, []);

  return (
    // <h2>Top 20 Shows Rated by Users</h2>
    <div>
      <h2>Top 20 Shows Rated by Users</h2>
      <div>
        {topFilms &&
          topFilms.map((element, index) => (
            <div className="FilmDivWrapper">
              <div
                className="FilmDiv"
                onClick={() => {
                  setSelected(element);
                  setShowModal(true);
                }}
              >
                <div className="FilmDivFirstRow">
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Title:
                  </b>
                  {element.title}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Type:
                  </b>
                  {element.type}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Duration:
                  </b>
                  {element.duration}
                </div>
                <div className="FilmDivSecondRow">
                  {/* Director / Actor */}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Director:
                  </b>
                  {element.director}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Actor:
                  </b>
                  {element.actor}
                </div>
                <div className="FilmDivThirdRow">
                  {/* Year / Genre / Country / Rating */}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Platform:
                  </b>
                  {element.platform}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Year:
                  </b>
                  {element.year}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Genre:
                  </b>
                  {element.genre}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Country:
                  </b>
                  {element.country}
                  <b style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Rating:
                  </b>
                  {element.rating}
                </div>
              </div>
            </div>
          ))}
      </div>
      <FilmDetailModal
        show={showModal}
        modalShow={showModal}
        selectedFilm={selected}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};
export default TopFilms;
