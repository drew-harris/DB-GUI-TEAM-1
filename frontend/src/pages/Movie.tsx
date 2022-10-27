import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { createMovieSchema } from "schemas";

export const MoviePage = () => {
  const initialMovies = useLoaderData() as Movie;
  const {
    data: movie,
    status,
    error,
  } = useQuery(["movie", { id: initialMovies.id }], {
    initialData: initialMovies,
  });
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <img
          className="w-80 shrink rounded-xl"
          src={movie.backdropImageUrl}
        ></img>
        <div>
          <div className="font-bold mt-4 text-3xl">{movie.title}</div>
          <div className="italic">{movie.tagline}</div>
          <div className="flex gap-4">
            <div>{movie.genre}</div>
            <div>{movie.runTime} min.</div>
            <div>{new Date(movie.releaseDate).toLocaleDateString()}</div>
          </div>
          <div className="mt-4">{movie.description}</div>
        </div>
      </div>
    </div>
  );
};