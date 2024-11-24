Anime Info Fetcher (POC)
Este projeto é uma Prova de Conceito (POC) que utiliza React e a API Jikan para buscar e exibir informações sobre animes. Ele demonstra como consumir dados de uma API, processar os resultados e renderizá-los dinamicamente em uma interface.

Recursos do Projeto
Consulta à API pública do Jikan (baseada no MyAnimeList) para obter detalhes sobre animes específicos.
Renderização dinâmica de informações, incluindo título, pontuação, ranking, número de episódios e uma imagem de capa.
Tratamento básico de erros e mensagens de carregamento.
Tecnologias Utilizadas
React (com Hooks): useEffect para operações assíncronas e useState para gerenciamento de estado.
CSS: Para estilização básica (importado de globals.css).
Jikan API: API externa para obter dados sobre animes.
Instalação
Clone o repositório:

bash
Copiar código
git clone <url-do-repositorio>
cd <nome-do-diretorio>
Instale as dependências: Certifique-se de que você tenha o Node.js instalado. Em seguida, execute:

bash
Copiar código
npm install
Inicie o projeto:

bash
Copiar código
npm run dev
Acesse no navegador: Abra o navegador e vá para http://localhost:3000.

Arquitetura do Código
Componente Principal
O componente Home é o núcleo do projeto. Ele executa as seguintes etapas:

Busca de Dados:

IDs de animes são definidos no array animeIds.
A função fetchAnimeData realiza requisições assíncronas à API Jikan para obter informações detalhadas sobre cada anime.
Gerenciamento de Estado:

Os dados dos animes são armazenados no estado animes com o hook useState.
Durante a busca, uma mensagem de "Loading..." é exibida.
Renderização:

Cada anime é exibido em um <article> com título, pontuação, ranking, número de episódios e uma imagem de capa.
Trechos Relevantes do Código
1. Busca de Dados
javascript
Copiar código
useEffect(() => {
  const fetchAnimeData = async () => {
    try {
      const fetchPromises = animeIds.map((id) =>
        fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((response) =>
          response.json()
        )
      );
      const results = await Promise.all(fetchPromises);
      const animeData = results.map((result) => result.data);
      setAnimes(animeData);
    } catch (error) {
      console.error("Erro ao buscar dados de animes:", error);
    }
  };

  fetchAnimeData();
}, []);
2. Renderização Condicional
javascript
Copiar código
if (animes.length === 0) {
  return <div>Loading...</div>;
}
3. Exibição dos Dados
javascript
Copiar código
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




