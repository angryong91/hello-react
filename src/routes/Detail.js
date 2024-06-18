import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    return json.data.movie;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovie();
      setMovie(movieData);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>No movie found</div>;
  }

  return (
    <div>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description_intro}</p>
      <p>{movie.description_full}</p>
      <ul>
        {movie.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
