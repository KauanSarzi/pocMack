"use client";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const animeIds = [20, 5231, 1735, 23]; // ID dos animes

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        // Fazendo as requisições para os IDs dos animes
        const fetchPromises = animeIds.map((id) =>
          fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((response) =>
            response.json()
          )
        );

        // Aguardando todas as requisições serem completadas
        const results = await Promise.all(fetchPromises);

        // Extraindo os dados relevantes
        const animeData = results.map((result) => result.data);
        setAnimes(animeData);
      } catch (error) {
        console.error("Erro ao buscar dados de animes:", error);
      }
    };

    fetchAnimeData();
  }, []);

  if (animes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div id="anime" className="AnimeList">
      {animes.map((anime) => (
        <article key={anime.mal_id} className="Anime">
          <h2>{anime.title}</h2>
          <p>Score: {anime.score}</p>
          <p>Ranking: {anime.rank}</p>
          <p>Episodes: {anime.episodes}</p>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="AnimeImages"
          />
        </article>
      ))}
    </div>
  );
}