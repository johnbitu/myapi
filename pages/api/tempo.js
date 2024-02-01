// tempo.js

import fetch from 'node-fetch';

export default async function tempo(request, response) {
    const dynamicDate = new Date();

    // Randomizando os pokemons
    const pokemonId = Math.floor(Math.random() * 905) + 1;
    console.log(pokemonId);

    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

        if (!pokemon.ok) {
            throw new Error(`Erro na requisição: ${pokemon.status} ${pokemon.statusText}`);
        }

        const pokeData = await pokemon.json();
        const pokeNome = pokeData.name;

        response.json({
            data: dynamicDate.toGMTString(),
            pokemon: {
                pokemonId: pokemonId,
                name: pokeNome
            }
        });
    } catch (error) {
        console.error('Erro ao acessar a API:', error.message);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }

    // Agende a próxima atualização após 3 segundos (3000 milissegundos)
    setTimeout(() => atualizarAPI(response), 3000);
}

function atualizarAPI(response) {
    // Faça a chamada à API aqui
    tempo(null, response);

    console.log(response.json)
    console.log('API atualizada!');
}
