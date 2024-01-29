async function tempo(request, response) {
    const dynamicDate = new Date();

    // Randomizando os pokemons
    const pokemonId = Math.floor(Math.random() * 905) + 1;

    const imageUrl = 'https://pokeapi.co/api/v2/pokemon/${pokemonId}/sprites';

    const response = await fetch(imageUrl);

    const imageData = response.blob();

    const imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(imageData);
    document.body.appendChild(imageElement);

    response.json({
        data: dynamicDate.toGMTString()
    })
}

export default tempo;