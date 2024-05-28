import { Navigate, useParams } from "react-router";
import { getHeroById } from "../helpers";

export const HeroPage = () => {
  //obtengo los segmentos de los query  params  //hero/dc-batman
  //custom  hook usePaarams
  const { id } = useParams();

  // const params = useParams();
  // console.log("params", params);

  // const { id, ...rest } = useParams();
  // console.log({ id }, { rest });

  const hero = getHeroById(id);
  //información del hero
  //console.log(hero);

  //si el id no existe retorna undefined, vamos a intervenir antes de generar errores
  if (!hero) {
    //lo envio a una pagina que si existe
    return <Navigate to="/marvel" />;
  }

  return (
    <>
      <h1>Hero Page</h1>
    </>
  );
};
