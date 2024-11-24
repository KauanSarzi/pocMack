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
  