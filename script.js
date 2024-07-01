async function handleSubmit(event) {
    event.preventDefault();
    
    // grab the selected Pokémon from the dropdown or the search input
    const selectedPokemon = event.target['pokemon-select'].value.toLowerCase();
    const searchPokemon = event.target.search.value.toLowerCase();
    let pokemon = selectedPokemon || searchPokemon;
    
    if (!pokemon) {
        alert('Please select a Pokémon or enter a name/ID to search.');
        return;
    }
    
    console.log(pokemon);
    
    try {
        const pokemonData = await fetchPokemonData(pokemon);
        console.log(pokemonData);
        displayPokemon(pokemonData);
    } catch (error) {
        console.error(error);
    }
}

// Making a GET Request to the PokeAPI
async function fetchPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.ok) {
        return await response.json();
    } else {
        alert('Pokémon not found');
        throw new Error('Pokémon not found');
    }
}

// Display Cards
function displayPokemon(pokemon) {
    const id = Math.floor(Math.random() * 100000); // id creation
    const html = `<div class="card bg-dark border rounded shadow text-white p-4 mx-auto">
                        <div class="d-md-flex">
                        <div class="border rounded" id="image">
                            <img src=${pokemon.sprites.front_default} class="img-fluid" alt=${pokemon.name}>
                        </div>
                        <div class="mt-3 mt-md-0 ms-md-3" id="text">
                            <h1>${pokemon.name}</h1>
                            <p>Height: ${pokemon.height}</p>
                            <p>Weight: ${pokemon.weight}</p>
                            <p>Types: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
                            <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
                            <button onclick="deletePokemon(${id})" class="btn btn-outline-info">Delete</button>
                        </div>
                        </div>
                    </div>`;
    // creating a new object to append to our document
    const card = document.createElement('div');
    card.setAttribute('id', id);
    card.innerHTML = html;
    
    // appending to parent
    const display = document.getElementById("pokemon-display");
    display.appendChild(card);
}

// Function to delete a Pokémon card
function deletePokemon(id) {
    const card = document.getElementById(id);
    card.remove();
}
