import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { useForm } from "../../hooks";
import { getHeroesByName } from "../helpers";
import { HeroCard } from "../components";

export const SearchPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  //console.log(location);

  //instalamos el paquete queryString
  // const query = queryString.parse(location.search);
  // console.log(query);

  const { q = "" } = queryString.parse(location.search);
  //console.log({ q });

  const heroes = getHeroesByName(q);

  //variables para controlar las clases de css //true false
  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    //if (searchText.trim().length <= 1) return;
    //console.log(searchText);
    //lo utilizamos para pasar el query param
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search Page</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>
          <div
            className="alert alert-danger animate__animated animate__fadeI"
            style={{ display: showError ? "" : "none" }}
          >
            No hero whih <b>{`${q}`}</b>
          </div>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
