import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`,
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  // async await -> 비동기 문법

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.map((movieList) => (
            <Movie
              key={movieList.id}
              id={movieList.id}
              coverImg={movieList.medium_cover_image}
              title={movieList.title}
              summary={movieList.summary}
              genres={movieList.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
