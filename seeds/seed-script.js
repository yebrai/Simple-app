
// buscar la data a agregar
const pokemonArr = require("./pokemon.seed.json")

// conectar a la base de datos
require("../db")

// 2.5
const Pokemon = require("../models/Pokemon.model")


// agregar la data a la base de datos
Pokemon
.insertMany(pokemonArr)
.then(() => {
 console.log("todo bien, pokemons agregado")
})
.catch((error) => {
    console.log(error)
})