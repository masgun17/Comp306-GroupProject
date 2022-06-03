import { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getGenreOptionsAction } from "../Tools/actions";
import AsyncSelect from 'react-select/async';

const HomePage = () => {
  const [keyword, setKeyword] = useState(0);
  const [actor, setActor] = useState(0);
  const [director, setDirector] = useState(0);
  const [isCheckedNetflix, setIsCheckedNetflix] = useState(true);
  const [isCheckedAmazon, setIsCheckedAmazon] = useState(true);
  const [genreOptions, setGenreOptions] = useState([]);
  const [releaseYearTo, setReleaseYearTo] = useState(0);
  const [releaseYearFrom, setReleaseYearFrom] = useState(0);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const handleOnChangeNetflix = () => {
    setIsCheckedNetflix(!isCheckedNetflix);
  };

  const handleOnChangeAmazon = () => {
    setIsCheckedAmazon(!isCheckedAmazon);
  };

  const animatedComponents = makeAnimated();

  const getCountries = async () => {
      let result = await getGenreOptionsAction();
      console.log(result);
      setGenreOptions(result);
  };

  useEffect(async () => {
    await getCountries();
  }, []);

  return (
    <div className="HomeLayout">
      <div className="HomeDiv2" style={{ "grid-row-start": "2", "font-size": 20, "line-height": "2" }}>
        <form className="form">
          <div className="innerForm" style={{ "align-self": "flex-start", "font-size": 20 }}>
            <label htmlFor="keyword" style={{ "font-size": 20 }}>Keyword: </label>
            <input class="form-control" type="text" name="keyword" id="keyword" style={{ "font-size": 20 }} onChange={(e) => setKeyword(e.target.value)} />

            <label htmlFor="actor" style={{ "font-size": 20, "margin-left": "10px" }}>Actor: </label>
            <input class="form-control" type="text" name="actor" id="actor" style={{ "font-size": 20 }} onChange={(e) => setActor(e.target.value)} />

            <label htmlFor="director" style={{ "font-size": 20, "margin-left": "10px" }}>Director: </label>
            <input class="form-control" type="text" name="director" id="director" style={{ "font-size": 20 }} onChange={(e) => setDirector(e.target.value)} />


          </div>

          <div className="innerForm" style={{ "align-self": "flex-start", "font-size": 20, "margin-top": "20px" }}>

            <label htmlFor="releaseYearFrom" style={{ "font-size": 20 }}>From: </label>
            <input class="form-control" type="number" name="releaseYearFrom" id="releaseYearFrom" style={{ "font-size": 20 }} onChange={(e) => setReleaseYearFrom(e.target.value)} />
            <label htmlFor="releaseYearTo" style={{ "font-size": 20, "margin-left": "10px" }}>To: </label>
            <input class="form-control" type="number" name="releaseYearTo" id="releaseYearTo" style={{ "font-size": 20 }} onChange={(e) => setReleaseYearTo(e.target.value)} />

            <label htmlFor="netflix" style={{ "font-size": 20, "margin-left": "60px" }}>Netflix: </label>
            <input
              type="checkbox"
              id="netflix"
              name="netflix"
              value="Netflix"
              checked={isCheckedNetflix}
              onChange={handleOnChangeNetflix}
            />

            <label htmlFor="amazon" style={{ "font-size": 20, "margin-left": "10px" }}>Amazon: </label>
            <input
              type="checkbox"
              id="amazon"
              name="amazon"
              value="Amazon"
              checked={isCheckedAmazon}
              onChange={handleOnChangeAmazon}
            />

          </div>

          <div className="innerForm" style={{ "align-self": "flex-start", "font-size": 20, "align-items": "center", "display": "flex", "justify-content": "center", "margin-top": "20px" }}>
            <label htmlFor="country" style={{ "font-size": 20 }}>Country: </label>
            <div style={{ width: '300px', "height": "auto", "display": "inline-block", "margin-left": "10px" }}>

              <AsyncSelect
                style={{ "width": "10%", "margin-left": "10px" }}
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={genreOptions}
              />
            </div>


            <label htmlFor="genre" style={{ "font-size": 20, "margin-left": "20px" }}>Genre: </label>
            <div style={{ width: '300px', "font-size": "20px", "height": "auto", "display": "inline-block", "margin-left": "10px" }}>

              <Select
                style={{ "width": "10%", "font-size": "20px", "margin-left": "10px" }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
              />
            </div>

            <label htmlFor="duration" style={{ "font-size": 20, "margin-left": "20px" }}>Duration: </label>
            <div style={{ width: '300px', "height": "auto", "display": "inline-block", "margin-left": "10px" }}>

              <Select
                style={{ "width": "10%", "margin-left": "10px" }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
              />
            </div>


          </div>


        </form>
        <button type="submit" class="btn btn-primary btn-lg btn-block" id="loginButton" style={{ "font-size": 20, "margin-top": "20px" }}
        >Search
        </button>
      </div>
    </div>

  );
};
export default HomePage;
