# Anime - Atividade SuperHeroe

Usando a estrutura fornecida para realização da atividade:

``` tsx
export function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Dados recebidos com sucesso!");
      callback(xhr.response);
    } else {
      console.log("Problema ao conectar com a API: " + xhr.status);
    }
  };
  xhr.send();
}

export function getHeroes(BASE_URL, code, callback) {
  var url = BASE_URL + code;
  getJSON(url, callback);
}
```

Usamos ele como o unico componente "api.js"
<br>


Na home criamos duas variaveis para o armazenamento de informaçoes
IDs de animes são definidos no array animeIds.
Os dados dos animes são armazenados no estado animes com o hook useState.

``` tsx
export default function Home() {
  const [animes, setAnimes] = useState([]);
  const animeIds = [20, 5231, 1735, 23]; // ID dos animes
```
<br>

  <h1>Busca de Dados</h1>
A função fetchAnimeData é uma função assíncrona que será executada sempre que o componente for montado. Ela faz as requisições à API para obter os dados dos animes.

Dentro da função fetchAnimeData, a lógica de busca de dados segue os seguintes passos:
Mapeamento dos IDs para URLs de requisição: O método map é usado para iterar sobre o array animeIds, criando uma requisição para cada ID de anime. A requisição é feita com fetch, passando a URL da API para obter os dados do anime completo

``` tsx
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
```

<h1>Renderização</h1>
 O animes.map Itera sobre o array animes e renderiza um <article> para cada anime.
  Estrutura renderizada para cada anime:
  key={anime.mal_id}: Identificador único necessário para elementos em listas no React.
  Exibe título, nota (score), ranking, número de episódios e uma imagem do anime.
  A imagem é exibida com o atributo src apontando para anime.images.jpg.large_image_url.

``` tsx
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
```
RESULTADO 
![Captura de tela 2024-11-24 205919](https://github.com/user-attachments/assets/96a55cad-c74c-4d52-b367-fc198cfb6797)
