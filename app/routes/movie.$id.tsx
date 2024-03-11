import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

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
  homepage: string;
  production_companies: ProductionCompany[];
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
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

export default function MovieId() {
  const data = useLoaderData<Movie>();

  return (
    <div className="min-h-screen p-10">
      <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt={data.title} className="h-[40vh] object-cover w-full rounded-lg" />
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
      <div className="flex mt-10">
        <div className="w-1/2 pr-10">
          <h1>
            <span className="underline">Homepage: </span>
            <Link to={data.homepage} target="_blank" rel="noreferrer">
              Link
            </Link>
          </h1>
          <h1>
            <span className="underline">Original Language: </span>
            {data.original_language}
          </h1>
          <h1 className="text-justify">Production Companies:</h1>
          <div className="flex flex-wrap">
            {data.production_companies.map((company) => (
              <div key={company.id} className="text-center p-2">
                <img src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt={company.name} className="h-20 w-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="underline">Overview:</h1>
          <p className="text-justify">{data.overview}</p>
        </div>
      </div>
    </div>
  );
}
