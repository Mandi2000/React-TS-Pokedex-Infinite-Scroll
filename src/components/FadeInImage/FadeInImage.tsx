import { useState, useEffect, CSSProperties } from "react";
import { IPokemon } from "../../interfaces/interfaces";

interface Props {
  pokemon: IPokemon;
  uri: string;
  style: CSSProperties;
}

export const FadeInImage = ({ pokemon, uri, style }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
          <>
            <img
              src={
               uri
              }
              alt={pokemon?.name}
              style={{
                ...style,
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out"
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </>
  );
};
