import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  getGenreOptionsAction,
  getCountryOptionsAction,
  getSearchFilmAction,
} from "../Tools/actions";
import AsyncSelect from "react-select/async";
import "../Styles/HomePage.css";
import FilmDetailModal from "./FilmDetailModal";
import { countries, genres } from "../Tools/constants.js";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [isCheckedNetflix, setIsCheckedNetflix] = useState(true);
  const [isCheckedAmazon, setIsCheckedAmazon] = useState(true);
  const [releaseYearTo, setReleaseYearTo] = useState();
  const [releaseYearFrom, setReleaseYearFrom] = useState();
  const [type, setType] = useState("0");
  // const [duration, setDuration] = useState("");

  const [filmInfo, setFilmInfo] = useState();
  const [durationArr, setDurationArr] = useState();
  const [genreArr, setGenreArr] = useState();
  const [countryArr, setCountryArr] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  const seasonDuration = [
    { value: "1", label: "1 season" },
    { value: "2-5", label: "2-5 season" },
    { value: "5-10", label: "5-10 season" },
    { value: "10", label: "+10 season" },
  ];

  const movieDuration = [
    { value: "0-30", label: "0-30 mins" },
    { value: "30-60", label: "30-60 mins" },
    { value: "60-90", label: "60-90 mins" },
    { value: "90-120", label: "90-120 mins" },
    { value: "120-150", label: "120-150 mins" },
    { value: "150", label: "+150 mins" },
  ];

  // const [genreOptions, setGenreOptions] = useState([]);
  // const [countryOptions, setCountryOptions] = useState([]);

  const handleOnChangeNetflix = () => {
    setIsCheckedNetflix(!isCheckedNetflix);
  };

  const handleOnChangeAmazon = () => {
    setIsCheckedAmazon(!isCheckedAmazon);
  };

  const animatedComponents = makeAnimated();

  const onSearch = async () => {
    let duration_small = "0";
    let duration_big = "2023";
    if (durationArr) {
      if (durationArr.value === "1") {
        duration_small = "1";
        duration_big = "1";
      } else if (durationArr.value === "2-5") {
        duration_small = "2";
        duration_big = "5";
      } else if (durationArr.value === "5-10") {
        duration_small = "5";
        duration_big = "10";
      } else if (durationArr.value === "10") {
        duration_small = "10";
        duration_big = "2023";
      } else if (durationArr.value === "0-30") {
        duration_small = "0";
        duration_big = "30";
      } else if (durationArr.value === "30-60") {
        duration_small = "30";
        duration_big = "60";
      } else if (durationArr.value === "60-90") {
        duration_small = "60";
        duration_big = "90";
      } else if (durationArr.value === "90-120") {
        duration_small = "90";
        duration_big = "120";
      } else if (durationArr.value === "120-150") {
        duration_small = "120";
        duration_big = "150";
      } else if (durationArr.value === "150") {
        duration_small = "150";
        duration_big = "2023";
      }
    }

    var countryValArr = [];
    countryArr?.forEach((element) => {
      countryValArr.push(element.value);
    });

    var genreValArr = [];
    genreArr?.forEach((element) => {
      genreValArr.push(element.value);
    });

    var jsonData = {
      data: [
        {
          title: title,
          year_small: releaseYearFrom ? releaseYearFrom : 0,
          year_big: releaseYearTo ? releaseYearTo : 2023,
          platform_netflix: isCheckedNetflix,
          platform_amazon: isCheckedAmazon,
          genres: genreArr ? genreValArr : "",
          type: type, // "0" -> TV Show / "1" -> Movie
          duration_small: duration_small,
          duration_big: duration_big,
          countries: countryArr ? countryValArr : "",
          directors: director,
          actors: actor,
        },
      ],
    };
    const result = await getSearchFilmAction(jsonData);
    setFilmInfo(result);
  };

  return (
    <div className="HomeLayout">
      <div
        className="HomeDiv2"
        style={{ "grid-row-start": "2", "font-size": 20, "line-height": "2" }}
      >
        <div>
          <h3>MOVINGOO</h3>
        </div>

        <form>
          <div
            className=""
            style={{ "align-self": "flex-start", "font-size": 20 }}
          >
            <label htmlFor="title" style={{ "font-size": 20 }}>
              Title:{" "}
            </label>
            <input
              class="form-control"
              type="text"
              name="title"
              id="title"
              style={{ "font-size": 20 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label
              htmlFor="actor"
              style={{ "font-size": 20, "margin-left": "10px" }}
            >
              Actor:{" "}
            </label>
            <input
              class="form-control"
              type="text"
              name="actor"
              id="actor"
              placeholder="Use comma to separate actors' names"
              style={{ "font-size": 20 }}
              value={actor}
              onChange={(e) => setActor(e.target.value)}
            />

            <label
              htmlFor="director"
              style={{ "font-size": 20, "margin-left": "10px" }}
            >
              Director:{" "}
            </label>
            <input
              class="form-control"
              type="text"
              name="director"
              id="director"
              placeholder="Use comma to separate directors' names"
              style={{ "font-size": 20 }}
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>

          <div
            className="innerForm"
            style={{
              "align-self": "flex-start",
              "font-size": 20,
              "margin-top": "20px",
            }}
          >
            <label htmlFor="releaseYearFrom" style={{ "font-size": 20 }}>
              From:{" "}
            </label>
            <input
              class="form-control"
              type="number"
              name="releaseYearFrom"
              id="releaseYearFrom"
              style={{ "font-size": 20 }}
              value={releaseYearFrom}
              onChange={(e) => setReleaseYearFrom(e.target.value)}
            />
            <label
              htmlFor="releaseYearTo"
              style={{ "font-size": 20, "margin-left": "10px" }}
            >
              To:{" "}
            </label>
            <input
              class="form-control"
              type="number"
              name="releaseYearTo"
              id="releaseYearTo"
              style={{ "font-size": 20 }}
              value={releaseYearTo}
              onChange={(e) => setReleaseYearTo(e.target.value)}
            />

            <div>
              <label htmlFor="netflix" style={{ "font-size": 20 }}>
                Netflix:{" "}
              </label>
              <input
                type="checkbox"
                id="netflix"
                name="netflix"
                value="Netflix"
                style={{ marginLeft: "10px" }}
                checked={isCheckedNetflix}
                onChange={handleOnChangeNetflix}
              />

              <label
                htmlFor="amazon"
                style={{ "font-size": 20, "margin-left": "20px" }}
              >
                Amazon:{" "}
              </label>
              <input
                type="checkbox"
                id="amazon"
                name="amazon"
                value="Amazon"
                style={{ marginLeft: "10px" }}
                checked={isCheckedAmazon}
                onChange={handleOnChangeAmazon}
              />
            </div>

            <div style={{ display: "flex" }}>
              Type:
              <div style={{ marginLeft: "20px" }}>
                <label>
                  <input
                    type="radio"
                    // name="letter"
                    value="0"
                    style={{ marginRight: "10px" }}
                    checked={type === "0"}
                    onChange={() => setType("0")}
                  />
                  TV Show
                  {/* </input> */}
                </label>
              </div>
              <div style={{ marginLeft: "30px" }}>
                <label>
                  <input
                    type="radio"
                    // name="letter"
                    value="1"
                    style={{ marginRight: "10px" }}
                    checked={type === "1"}
                    onChange={() => setType("1")}
                  />
                  Movie
                  {/* </input> */}
                </label>
              </div>
            </div>
          </div>

          <div
            className="innerForm"
            style={{
              "align-self": "flex-start",
              "font-size": 20,
              "align-items": "center",
              display: "flex",
              "justify-content": "center",
              "margin-top": "20px",
            }}
          >
            <label htmlFor="country" style={{ "font-size": 20 }}>
              Country:{" "}
            </label>
            <div
              style={{
                width: "300px",
                height: "auto",
                display: "inline-block",
                "margin-left": "10px",
              }}
            >
              <Select
                style={{
                  width: "10%",
                  "font-size": "20px",
                  "margin-left": "10px",
                }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={countryArr}
                onChange={(e) => setCountryArr(e)}
                options={countries}
              />
            </div>

            <label
              htmlFor="genre"
              style={{ "font-size": 20, "margin-left": "20px" }}
            >
              Genre:{" "}
            </label>
            <div
              style={{
                width: "300px",
                "font-size": "20px",
                height: "auto",
                display: "inline-block",
                "margin-left": "10px",
              }}
            >
              <Select
                style={{
                  width: "10%",
                  "font-size": "20px",
                  "margin-left": "10px",
                }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={genreArr}
                onChange={(e) => setGenreArr(e)}
                options={genres}
              />
            </div>

            <label
              htmlFor="duration"
              style={{ "font-size": 20, "margin-left": "20px" }}
            >
              Duration:{" "}
            </label>
            <div
              style={{
                width: "300px",
                height: "auto",
                display: "inline-block",
                "margin-left": "10px",
              }}
            >
              <Select
                // id="durationSelect"
                style={{ width: "10%", "margin-left": "10px" }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={durationArr}
                onChange={(e) => {
                  if (durationArr && durationArr.value === e.value) {
                    setDurationArr([]);
                  } else {
                    setDurationArr(e);
                  }
                }}
                options={type === "0" ? seasonDuration : movieDuration}
              />
            </div>
          </div>
        </form>
        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block"
          id="loginButton"
          style={{ "font-size": 20, "margin-top": "20px" }}
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      <div className="FilmList">
        {filmInfo &&
          filmInfo.map((element, index) => (
            <div className="FilmDivWrapper">
              <div
                className="FilmDiv"
                onClick={() => {
                  setSelected(element);
                  setShowModal(true);
                }}
              >
                {/* Title / Type / Duration / Platform ---
          Director / Actor  ---
          Year / Genre / Country / Rating */}
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
              <div
                type="button"
                className="FilmDivButton FilmDivWatchlistButton"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div
                type="button"
                className="FilmDivButton FilmDivWishlistButton"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          ))}
      </div>

      <FilmDetailModal
        show={showModal}
        selectedFilm={selected}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};
export default HomePage;
