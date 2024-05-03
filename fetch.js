const BASE_URL = 'https://pokeapi.co/api/v2/';
 
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}
 
const renderPokemonCard = (pokemon) => {
    let card = document.getElementById('pokemon-card');
 
    // Guardar la información del Pokémon en el localStorage
    localStorage.setItem('currentPokemon', JSON.stringify(pokemon));
 
    if (!card) {
        const cardContainer = document.getElementById('pokemon-card-container');
        card = document.createElement('div');
        card.id = 'pokemon-card';
        card.classList.add('pokemon-card');
        cardContainer.appendChild(card);
    }
 
    card.innerHTML = '';
 
    const nameElement = document.createElement('h3');
    nameElement.textContent = `Nombre: ${pokemon.name}`;
 
    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${pokemon.id}`;
 
    const weightElement = document.createElement('p');
    weightElement.textContent = `Peso: ${pokemon.weight} kg`;
 
    const typeElement = document.createElement('p');
    typeElement.textContent = `Tipo: ${pokemon.types[0].type.name}`;
 
    const imageElement = document.createElement('img');
    imageElement.src = pokemon.sprites.front_default;
    imageElement.alt = pokemon.name;
 
    card.appendChild(nameElement);
    card.appendChild(idElement);
    card.appendChild(weightElement);
    card.appendChild(typeElement);
    card.appendChild(imageElement);
 
    const cardContainer = document.getElementById('pokemon-card-container');
    cardContainer.appendChild(card);
}
 
document.addEventListener('DOMContentLoaded', async () => {
    const storedPokemon = localStorage.getItem('currentPokemon');
    if (storedPokemon) {
        const pokemon = JSON.parse(storedPokemon);
        renderPokemonCard(pokemon);
    }
});
 
document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem('currentPokeId', pokemon.id);
    console.log(pokemon.name);
 
    renderPokemonCard(pokemon);
});
 
document.getElementById('previous-btn').addEventListener('click', async () => {
    let currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId - 1);
    if (newId !== currentPokeId) {
        currentPokeId = newId;
        localStorage.setItem('currentPokeId', currentPokeId);
        const pokemon = await fetchPokemon(currentPokeId);
        console.log(pokemon.name);
        renderPokemonCard(pokemon);
    }
});
 
document.getElementById('next-btn').addEventListener('click', async () => {
    let currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId + 1);
    if (newId !== currentPokeId) {
        currentPokeId = newId;
        localStorage.setItem('currentPokeId', currentPokeId);
        const pokemon = await fetchPokemon(currentPokeId);
        console.log(pokemon.name);
        renderPokemonCard(pokemon);
    }
});
 
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json));