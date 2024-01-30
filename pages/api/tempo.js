async function tempo(request, response) {
    const dynamicDate = new Date();

    // Randomizando os pokemons
    const pokemonId = Math.floor(Math.random() * 905) + 1;
    console.log(pokemonId);
    
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokeData = await pokemon.json();
    const pokeNome = pokeData.name;


    setInterval(() => {
        response.json({
            data: dynamicDate.toGMTString(),
            pokemon: {
                pokemonId: pokemonId,
                name: pokeNome
              }
        })
    })
    
}

export default tempo;