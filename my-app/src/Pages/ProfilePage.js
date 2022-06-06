import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  getGenreOptionsAction,
  getCountryOptionsAction,
  getSearchFilmAction,
  addToListAction,
  searchFromWatchWishListAction,
} from "../Tools/actions";
import AsyncSelect from "react-select/async";
import "../Styles/HomePage.css";
import FilmDetailModal from "./FilmDetailModal";
import { countries, genres } from "../Tools/constants.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ProfilePage.css";
import "../Styles/HomePage.css";

const ProfilePage = () => {
  let userLogged = sessionStorage.getItem("isLogin");
  let uid = sessionStorage.getItem("uid");
  let uName = sessionStorage.getItem("username");
  toast.configure();

  const [title, setTitle] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [isCheckedNetflix, setIsCheckedNetflix] = useState(true);
  const [isCheckedAmazon, setIsCheckedAmazon] = useState(true);
  const [releaseYearTo, setReleaseYearTo] = useState();
  const [releaseYearFrom, setReleaseYearFrom] = useState();
  const [type, setType] = useState("0");
  const [filmInfo, setFilmInfo] = useState("first");

  const [watchedListInfo, setWatchedListInfo] = useState([""]);
  const [wishlistInfo, setWishlistInfo] = useState([""]);

  const [durationArr, setDurationArr] = useState();
  const [genreArr, setGenreArr] = useState();
  const [countryArr, setCountryArr] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");

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

  useEffect(() => {
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
    setTimeout(() => {
      var jsonData1 = {
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
            flag: 0,
            uid: parseInt(uid),
          },
        ],
      };

      const result1 = searchFromWatchWishListAction(jsonData1).then((a) =>
        setWatchedListInfo(a)
      );
      console.log(result1);

      //   setWatchedListInfo(result1);
    }, 200);

    setTimeout(() => {
      var jsonData2 = {
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
            flag: 1,
            uid: parseInt(uid),
          },
        ],
      };
      const result2 = searchFromWatchWishListAction(jsonData2).then((r) =>
        setWishlistInfo(r)
      );
      //   setWishlistInfo(result2);
    }, 500);
  }, []);

  useEffect(() => {
    console.log(watchedListInfo, "watched");
    console.log(wishlistInfo, "wish");
  }, [watchedListInfo, wishlistInfo]);

  // const [genreOptions, setGenreOptions] = useState([]);
  // const [countryOptions, setCountryOptions] = useState([]);

  const handleOnChangeNetflix = () => {
    setIsCheckedNetflix(!isCheckedNetflix);
  };

  const handleOnChangeAmazon = () => {
    setIsCheckedAmazon(!isCheckedAmazon);
  };

  const animatedComponents = makeAnimated();

  const addToWishList = async (sid, uid) => {
    var jsonData = {
      data: [
        {
          sid: sid,
          uid: uid,
          flag: 1,
        },
      ],
    };
    const result = await addToListAction(jsonData);
    if (result === "Movie removed from your list") {
      toast.success("Movie removed from your wish list", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (result === "Movie added successfully.") {
      toast.success("Movie added to your wish successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (result === "Movie is already in your list.") {
      toast.warning("Movie is already in your list.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    window.location.reload(false);

    console.log(result);
  };

  const addToWatchList = async (sid, uid) => {
    var jsonData = {
      data: [
        {
          sid: sid,
          uid: uid,
          flag: 0,
        },
      ],
    };
    const result = await addToListAction(jsonData);
    if (result === "Movie removed from your list") {
      toast.success("Movie removed from your watch list", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (result === "Movie added successfully.") {
      toast.success("Movie added to your watch successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (result === "Movie is already in your list.") {
      toast.warning("Movie is already in your list.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    window.location.reload(false);

    console.log(result);
  };

  const onFilterWatched = async () => {
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
          flag: 0,
          uid: uid
        },
      ],
    };
    const result = await searchFromWatchWishListAction(jsonData);
    setWatchedListInfo(result);
  }

  const onFilterWish = async () => {
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
          flag: 1,
          uid: uid
        },
      ],
    };
    const result = await searchFromWatchWishListAction(jsonData);
    setWishlistInfo(result);
};

    const onFilterBoth =  () => {
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
        setTimeout(() => {
          var jsonData1 = {
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
                flag: 0,
                uid: parseInt(uid),
              },
            ],
          };
    
          const result1 = searchFromWatchWishListAction(jsonData1).then((a) =>
            setWatchedListInfo(a)
          );
          console.log(result1);
    
          //   setWatchedListInfo(result1);
        }, 200);
    
        setTimeout(() => {
          var jsonData2 = {
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
                flag: 1,
                uid: parseInt(uid),
              },
            ],
          };
          const result2 = searchFromWatchWishListAction(jsonData2).then((r) =>
            setWishlistInfo(r)
          );
          //   setWishlistInfo(result2);
        }, 500);
  }
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
    // <h2>Profile</h2>
    <div className="profileWrapper">
      <h3 className="welcomeText">{`WELCOME! ${uName.toUpperCase()}`}</h3>
      <hr />
      <br />

      <div className="filterPartWrapper">
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

        {/* button div */}
        <div className="buttonsWrapper">
          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            id="filterWatched"
            style={{ "font-size": 20, "margin-top": "20px" }}
            onClick={onFilterWatched()}
            className="filterButton"
          >
            Filter your Watched List
          </button>

          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            id="filterWish"
            style={{ "font-size": 20, "margin-top": "20px" }}
            onClick={onFilterWish()}
            value
            className="filterButton"
          >
            Filter your Wishlist
          </button>

          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            id="filterBoth"
            style={{ "font-size": 20, "margin-top": "20px" }}
            onClick={onFilterBoth()}
            className="filterButton"
          >
            Filter Both
          </button>
        </div>
      </div>

      <div className="listWrapper">
        <div className="watchedListWrapper">
          <h5>Your Watched List</h5>

          {watchedListInfo &&
            watchedListInfo.map((element, index) => (
              <div className="FilmDivWrapper2">
                <div
                  className="FilmDiv"
                  onClick={() => {
                    setSelected(element);
                    setShowModal(true);
                  }}
                >
                  <div className="FilmDivFirstRow2">
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
                {userLogged === "true" ? (
                  <>
                    <div
                      type="button"
                      className="FilmDivButton FilmDivWatchlistButton"
                      onClick={() => {
                        addToWatchList(element.id, uid);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div
                      type="button"
                      className="FilmDivButton FilmDivWishlistButton"
                      onClick={() => {
                        addToWishList(element.id, uid);
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ width: "30px", height: "30px" }}
                        icon={faHeart}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            ))}
            <FilmDetailModal
        show={showModal}
        modalShow={showModal}
        selectedFilm={selected}
        onHide={() => setShowModal(false)}
      />
        </div>
        <div className="wishlistWrapper">
          <h5>Your Wishlist</h5>
          <div>
            {wishlistInfo &&
              wishlistInfo.map((element, index) => (
                <div className="FilmDivWrapper2">
                  <div
                    className="FilmDiv"
                    onClick={() => {
                      setSelected(element);
                      setShowModal(true);
                    }}
                  >
                    <div className="FilmDivFirstRow2">
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
                  {userLogged === "true" ? (
                    <>
                      <div
                        type="button"
                        className="FilmDivButton FilmDivWatchlistButton"
                        onClick={() => {
                          addToWatchList(element.id, uid);
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                      <div
                        type="button"
                        className="FilmDivButton FilmDivWishlistButton"
                        onClick={() => {
                          addToWishList(element.id, uid);
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ width: "30px", height: "30px" }}
                          icon={faHeart}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
              <FilmDetailModal
        show={showModal}
        modalShow={showModal}
        selectedFilm={selected}
        onHide={() => setShowModal(false)}
      />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
