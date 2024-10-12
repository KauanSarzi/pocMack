const chave = "5d1daac6bb38b1c21f44619b1b3a7a1a" //CHAVE API


//SELECIONANDO ELEMENTOS
const botaoBuscarIP = document.getElementById('buscarIP');
const endereco = document.getElementById('enderecoIP');
const cidade = document.getElementById('cidade');
const pais = document.getElementById('pais');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

//FUNÇAO PARTA BUSCAR ENDE IP
async function buscarEnderecoIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;  // FAZ VOLTAR O ENDEREÇO DE QUEM VISITOU
    } catch (error) {
        console.error('Erro ao buscar o endereço IP:', error);
        return null;
    }
}


async function buscarLocalizacao() {
    try {
        const enderecoIP = await buscarEnderecoIP();  //PEGA O IP
        if (enderecoIP) {
            const response = await fetch(`https://api.ipstack.com/${enderecoIP}?access_key=${chave}`);
            const data = await response.json();

            // ATUALIZA OS DADOS
            endereco.textContent = `Endereço IP: ${data.ip}`;
            cidade.textContent = `Cidade: ${data.city}`;
            pais.textContent = `País: ${data.country_name}`;
            latitude.textContent = `Latitude: ${data.latitude}`;
            longitude.textContent = `Longitude: ${data.longitude}`;
        } else {
            console.log("Endereço IP não encontrado.");
        }
    } catch (error) {
        console.error('Erro ao buscar a geolocalização:', error);
    }
}

// ADCIONANDO EVENTO
botaoBuscarIP.addEventListener('click', buscarLocalizacao);
