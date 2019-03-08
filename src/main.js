let pokemons = [];

window.onload = function () {
    pokemons = POKEMON.pokemon;
    showPokemons();
}

function showPokemons() {
    document.getElementById("pokemons").innerHTML = `${pokemons.map(pokemon => `
        <div class="each-pokemon">
        <img src="${pokemon.img}" class="pokemon-img" data-name="${pokemon.name}"/>
        <div class="text-name">
            <h3 class="pokemon-name">${pokemon.name}</h3>
        </div>
        </div>
   `).join('')}`
    getPokemonOnClick()
}

function showPercent() {
    let number = pokemons.length / 151 * 100;
    document.getElementById("math-pokemons").innerHTML =
        `<div class="math"> ${Math.round(number)}% 
    </div>
`
}

const selectTypeElement = document.getElementById("select-type");
const selectWeaknessesElement = document.getElementById("select-weaknesses");
const filterButtonElement = document.getElementById("filter")
filterButtonElement.addEventListener("click", callFilter)

function callFilter() {
    let type = selectTypeElement.value;
    let weaknesses = selectWeaknessesElement.value;
    pokemons = POKEMON.pokemon.filter(pokemon => {
        if (type != "" && weaknesses != "") {
            return (pokemon.weaknesses.includes(weaknesses) && pokemon.type.includes(type));
        }
        if (type != "") {
            return (pokemon.type.includes(type));
        }
        if (weaknesses != "") {
            return (pokemon.weaknesses.includes(weaknesses));
        }
    })
    showPercent();
    showPokemons();
    resetSelectElement();
}

function resetSelectElement() {
    selectTypeElement.selectedIndex = 0; 
    selectWeaknessesElement.selectedIndex = 0; 
}

const pokeSearchElement = document.getElementById("poke-search");
pokeSearchElement.addEventListener("keyup", pokemonSearch);

function pokemonSearch() {
    let searchUpper = pokeSearchElement.value.toUpperCase();
    pokemons = POKEMON.pokemon.filter(pokemon => {
        let nameUpper = pokemon.name.toUpperCase();
        return (nameUpper.includes(searchUpper));
    })
    showPokemons();
    document.getElementById("math-pokemons").style.display = "none";
}

function getPokemonOnClick() {
    let pokemonList = document.querySelectorAll('.pokemon-img');

    for (let pokemonName of pokemonList) {
        pokemonName.addEventListener('click', function() {
            console.log()
            pokemons = POKEMON.pokemon.filter(pokemon => {
                return (pokemon.name.includes(pokemonName.textContent));
            })
            const nome = pokemonName.dataset.name;
            showFullPokemon(nome);
        })
    }
}

const AZButton = document.getElementById("aToZ");
AZButton.addEventListener("click", orderAZ);

function orderAZ() {
    pokemons = pokemons.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
    showPokemons();
}

// Modal:
function showFullPokemon(nome) {
    console.log(nome)
    const pokemonAchei = POKEMON.pokemon.find(pokemon => pokemon.name === nome)
    console.log(pokemonAchei)
    document.getElementById("pokemons").innerHTML = `
    <div class="each-full-pokemon">
    <img src="${pokemonAchei.img}" class="pokemon-img"/>
    <div class="text-name">
        <h3 class="pokemon-number">${pokemonAchei.num}</h3>
        <h3 class="pokemon-name">${pokemonAchei.name}</h3>
        <p><strong>Tipo:</strong> ${pokemonAchei.type}</p>
        <p><strong>Fraquezas:</strong> ${pokemonAchei.weaknesses}</p>
        <p><strong>Horário:</strong> ${pokemonAchei.spawn_time}</p>     
        <p><strong>Altura:</strong> ${pokemonAchei.height}</p>
        <p><strong>Peso:</strong> ${pokemonAchei.weight}</p>        
    </div>
    </div>
    `
}

// const modal = document.getElementById("my-modal");
// const close = document.getElementById("close");

// function modalPokemon(){
//     modal.style.display = "block";
// }

// // close.onclick = function(){
// //     modal.style.display = "none";
// // }

// // window.onclick = function(event){
// //     if (event.target == modal) {
// //         modal.style.display = "none";
// //     }
// // }