const apiUrl = 'http://localhost:3000/api/tempo'

const fetchData = () => {
    fetch(apiUrl)
        .then(response => {
            // Verifica se a resposta foi bem-sucedida (status code 200)
            if (response.ok) {
                return response.json(); // Converte a resposta para JSON
            }
            throw new Error('Erro ao obter os dados.'); // Lança um erro se a resposta não for bem-sucedida
        })
        .then(data => {
            // Manipula os dados recebidos da API
            console.log(data.data); 
            let tempo =  document.querySelector('.nome-pokemon')
            tempo.innerText = data.data;
            // Aqui você pode fazer o que quiser com os dados, como exibir em uma página HTML
        })
        .catch(error => {
            console.error('Erro ao obter os dados:', error); // Exibe erros no console
        });
};

// Chamada da função para buscar os dados
document.body.addEventListener('click',fetchData)
