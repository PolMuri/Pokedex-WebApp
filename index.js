const api = {
    //la url de la api, des d'on n'extrec les dades
    //he posat pokemon perquè faré un buscador per filtrar pokemons individualment
    url: "https://pokeapi.co/api/v2/pokemon/"
}
//EL DOM és l'html un cop ja renderitzat, el que veig al navegador

//aquí busco sempre amb ID (necessito tenir ID a l'html)
//i al CSS el defineixo amb class(per definir per classe)
//per això a l'html tinc id i class
const card = document.getElementById("card");
const img = document.getElementById("pokemon-img");
const namePoke = document.getElementById("pokemon-name");
const height = document.getElementById("pokemon-height");
const weight = document.getElementById("pokemon-weight");
const typePoke = document.getElementById("pokemon-type");
const hp = document.getElementById("pokemon-hp");
const attack = document.getElementById("pokemon-attack");
const defense = document.getElementById("pokemon-defense");
//li passem l'id de search form i el guardem a una variable
const searchform = document.getElementById("search-form");
//li passem l'id de searchboxi el guardem a una variable
const searchbox = document.getElementById("searchbox");

//El mètode addEventListener() enllaça un controlador d'esdeveniments a un document.
//aAaquest form quan hi ha un event i hi farem anar una funció, la onSubmit, quan fem intro ens busca el que hem posat
//L'event submit s'activa quan s'envia un <form>(el tinc a l'html), quan l'usuari fa clic en un botó d'enviament ( <button> o <input type="submit")
//Si és true, l'oient rep esdeveniments sintètics enviats pel contingut web (el valor predeterminat és fals per a Chrome i true per a pàgines web normals).
searchform.addEventListener("submit", onSubmit, true);

//Creem la funcio de OnSubmit que rep un event
//Un event HTML pot ser quelcom que fa el navegador o un usuari.
function onSubmit(event) {
    //important el preventDefault perquè no faci una 
    //redenderització de la pàgina quan perdem el submit
    event.preventDefault();
    //posem la informació de dins el searchbox, és a dir, si escric un pokemon i apreto intro, sortirà aquest pokemon
    //la funció toLowerCase és perquè a la api els noms dels pokémons estan en minúscules
    //llavors, si algú fa una cerca posant la primera lletra del pokémon en majúscula o tot en majñuscules
    //no funcionaria la cerca, per això un cop s'ha escrit al searchbox ho passo tot a minúscules, per poder realitzar la cerca
    searchPokemon(searchbox.value.toLowerCase());
}

//per natejar el nom del buscador cada vegada que hem buscat un pokémon
const clearName = () => {
    searchbox.value = "";
}

//rep el valor de l'html, ja que hi ha posat this a l'html a dins de la funció
//al carregar la pàgina té el fons de pantalla que hi ha al CSS a .body a background-color
//ja que al carregar la pàgina no s'ha seleccionat encara el color amb el botó select i seria blanc 
//si l'style no tingués background color
function changeBgColor(valorQueRep) {
    //mètode de depuració, a la Console del navegador veure com escriu el color
    //seleccionat, ja que escriu el valor de la variable que la funció
    //rep del fitxer html
    console.log(valorQueRep.value);
    //a la variable que creo body hi va el que rebo de l'id body
    //del fitxer html
    let body = document.getElementById("body");
    //A dins de l'style del body hi ha el background color, és a dir, a l'html
    //és així encara que no es vegi: style="background-color", llavors
    //faig que la variable valorQueRep, que és el valor que rep la funció en froma de variable
    //la qual he anomenat així, doncs la variable valorQueRep.value (que vol dir el valor, el que hi ha a dins d'aquesta variable)
    //es guardi a dins del body.style.backgroundColor, així quan aquesta funció rebi un valor en forma de variable de l'html,
    //l'utilitzarà per pintar el fons del body amb aquest valor en forma de variable que ha rebut, 
    //ja sigui en format de nom(groc) o en format de codi de color(#e6d784) el value de l'html
    
    body.style.backgroundColor = valorQueRep.value;
}

function getRandom() {
    //genero un número random entre 1 i els pokemons que hi ha
    //poso un número més dels pokémon que hi ha, ja que el random sempre torna un número menys
    return Math.floor(Math.random() * 900) + 1;
  }
//funcio per obtenir els diferents tipus del pokemon que estan en un array, tipusPokemon representa una posició de l'array
function getPokemonTypes(tipusPokemon){
    //creo un array nou buit
    let tipus = [];
    //creo la constant pokemonType, on hi guardarem el .type.name de cada tipusPokemon (pokeData.types[i una posició])
    //de l'array original que rebem que ens retorna els noms dels tipus així: pokeData.types[0].type.name
    for (const pokemonType of tipusPokemon) {
        //de tipusPokemon(al ser un for, cada posició de l'array que rebem) pokeData.types[i una posició]
        //posem a l'array buit creat que es diu tipus el .type.name de cada posició de l'array que recorrem fent voltes amb el for
        tipus.push(pokemonType.type.name)
      }
      // retornem l'array tipus que haviem creat buit i ja hem omplert

      //si no poso join m'ho separa per comes, i si poso join sense especificar la separació també hi posa comes
      //sense el join no torna un string, retorna un array, el join es per convertir un array a string, és el mètode que ho fa
      //quan el apsso per comes li puc posar el que vulgui
    return tipus.join(' / ');
}

//FUNCIÓ QUE CRIDAREM PER OBTENIR UN POKÉMON ALEATÒRI
async function aleatoriPokemon() {
    try {
        //fetch per obtenir la informació
        //agafem la url per buscar, la q per buscar el pais o ciutat i a 
        //part li passem la clau de l'api i el llenguatge que és espanyol, el fetch pot ser amb la url de la api només
        //li passo la query, que és el nom del pokemon que buscarem, si ens hi fixem 
        //api.url + query és:https://pokeapi.co/api/v2/pokemon/+ nom pokemon que busquem
        const response = await fetch(`${api.url}${getRandom()}`);
        //per obtenir la data
        const pokeData = await response.json();
        //anem a remplaçar les dades que tenim per les que ens dona la api
        //innerHTML és per p, a, span i link, quna volem que es vegi algo a la pantalla a nivell de text
        img.src = pokeData.sprites.front_default || "https://www.elnacional.cat/uploads/s1/18/23/44/74/3852649_2_302x302.jpeg";
        namePoke.innerHTML = pokeData.species.name;
        height.innerHTML = `Alçada: ${pokeData.height/10} met.`;
        weight.innerHTML = `Pes: ${pokeData.weight/10} Kg`; 
        //accedeixo a types que és un array, indico la posició de l'array on vull entrar
        //que és la 0, on hi ha el type i el name, amb stats faig el mateix
         //crido la funció per obtenir els tipus del pokemon, que es troben a un array
        typePoke.innerHTML = `Tipus: ${getPokemonTypes(pokeData.types)}`; //pokeData.types[0].type.name aquí hi ha el nom del tipus per cada posició de l'array
        hp.innerHTML = `Vida: ${pokeData.stats[0].base_stat}`;
        attack.innerHTML = `Atac: ${pokeData.stats[1].base_stat}`;
        defense.innerHTML = `Defensa: ${pokeData.stats[2].base_stat}`;

        //id de pokemon card de l'html. La propietat flex estableix o 
        //retorna la longitud de l'element, en relació amb la resta d'elements flexibles dins del mateix contenidor.
        card.style.display = "flex";

        //natejem el nom de la ciutat buscada amb aquesta funció
        clearName();
    } catch (err) {
        console.log(err);
        alert("BUSCA UN POKÉMON VÀLID")
    }
}

//la funció amb la qual cridem la api, la funcio fetch, que porta un input on hi passarem la url
//rep la informacuó de dins de search pokemon i la extreu
//valorSearchBox és el searchbox value, és a dir el nom (pokémon si s'ha fet bé) que hem posat al searchbox
//el valor de dins el searchbox
//FUNCIÓ PER BUSCAR POKËMON PER NOM
async function searchPokemon(valorSearchBox) {
    try {
        //fetch per obtenir la informació
        //agafem la url per buscar, la q per buscar el pais o ciutat i a 
        //part li passem la clau de l'api i el llenguatge que és espanyol, el fetch pot ser amb la url de la api només
        //li passo la query, que és el nom del pokemon que buscarem, si ens hi fixem 
        //api.url + query és:https://pokeapi.co/api/v2/pokemon/+ nom pokemon que busquem
        const response = await fetch(`${api.url}${valorSearchBox}`);
        //per obtenir la data
        const pokeData = await response.json();

        //per assegurarnos que les dades està sent passades
        //anem a remplaçar les dades que tenim per les que ens dona la api
        //innerHTML és per p, a, span i link, quna volem que es vegi algo a la pantalla a nivell de text
        img.src = pokeData.sprites.front_default || "https://www.elnacional.cat/uploads/s1/18/23/44/74/3852649_2_302x302.jpeg";
        namePoke.innerHTML = pokeData.species.name;
        height.innerHTML = `Alçada: ${pokeData.height/10} met.`;
        weight.innerHTML = `Pes: ${pokeData.weight/10} Kg`; 
        //accedeixo a types que és un array, indico la posició de l'array on vull entrar
        //que és la 0, on hi ha el type i el name, amb stats faig el mateix
        //crido la funció per obtenir els tipus del pokemon, que es troben a un array
        typePoke.innerHTML = `Tipus: ${getPokemonTypes(pokeData.types)}`;
        hp.innerHTML = `Vida: ${pokeData.stats[0].base_stat}`;
        attack.innerHTML = `Atac: ${pokeData.stats[1].base_stat}`;
        defense.innerHTML = `Defensa: ${pokeData.stats[2].base_stat}`;

        //id de pokemon card de l'html. La propietat flex estableix o 
        //retorna la longitud de l'element, en relació amb la resta d'elements flexibles dins del mateix contenidor.
        card.style.display = "flex";

        //natejem el nom de la ciutat buscada amb aquesta funció
        clearName();
    } catch (err) {
        console.log(err);
        alert("BUSCA UN POKÉMON VÀLID")
    }
}
