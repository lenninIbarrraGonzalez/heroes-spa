import { Navigate, useNavigate, useParams } from "react-router";
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {
  //obtengo los segmentos de los query  params  //hero/dc-batman
  //custom  hook usePaarams
  const { id } = useParams();

  // const params = useParams();
  // console.log("params", params);

  // const { id, ...rest } = useParams();
  // console.log({ id }, { rest });

  const hero = useMemo(() => getHeroById(id), [id]);
  //información del hero
  //console.log(hero);

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  //si el id no existe retorna undefined, vamos a intervenir antes de generar errores
  if (!hero) {
    //lo envio a una pagina que si existe
    return <Navigate to="/marvel" />;
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${hero.id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>publisher</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance</b> {hero.first_appearance}
          </li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>
        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
