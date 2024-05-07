import { MetaFunction, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Movie API" }, { name: "description", content: "Movie API" }];
};

interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const loader: LoaderFunction = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.MOVIE_DB_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return json(await response.json());
};

export default function Index() {
  const data = useLoaderData<{ results: Movie[] }>();
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Top Trending Movies</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((movie: Movie) => (
            <div className="flex flex-col overflow-hidden rounded-lg border-2 border-indigo-500 bg-white" key={movie.id}>
              <Link prefetch="intent" className="group relative block overflow-hidden h-[30rem] bg-gray-100 md:h-96" to={`/movie/${movie.id}/comments`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:scale-110" />
              </Link>
              <div className="flex flex-1 flex-col md:p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800 text-center">
                  <Link prefetch="intent" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600" to={`/movie/${movie.id}/comments`}>
                    {movie.title}
                  </Link>
                </h2>
                <p className="text-gray-500 line-clamp-3 text-justify">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
