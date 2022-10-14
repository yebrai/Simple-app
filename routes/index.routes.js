const router = require("express").Router();
const Pokemon = require("../models/Pokemon.model")
const capitalized = require("../utils/capitalized.js")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// ruta para renderizar todos los nombres de los pokemon
router.get("/pokemon", (req, res, next) => {

  Pokemon.find()
  .select({name: 1})
  .then((response) => {
    console.log(response)

// antes de enviar la data tenemos que capitalizar
    const responseClone = JSON.parse(JSON.stringify(response)) // hacer deep clone
    responseClone.forEach((eachPokemon) => {
      eachPokemon.name = capitalized(eachPokemon.name)
    })
    

    res.render("pokemon/all-pokemon.hbs", {
      pokemonList: responseClone
    })

  })
  .catch((err) => {
    next(err)
  })

  router.get("/pokemon/search", (req, res, next) => {

    console.log(req.query)

    const { pokeName } = req.query
    
    Pokemon.findOne({name: pokeName})
    .then((response) => {
      res.render("pokemon/poke-search.hbs", {
        details: response
      })
    })
    .catch((err) => {
      next(err)
    })

  })
  

  router.get("/pokemon/:pokeId", (req, res, next) => {
    const { pokeId } = req.params

    Pokemon.findById({"_id": pokeId})
    .then((response) => {
      console.log(response)
      res.render("pokemon/pokemon-details.hbs", {
        details: response
      })
    })
    .catch((err) => {
      next(err)
    })
  })

})
// ruta para renderizar los detalles de un pokemon

// ruta para renderizar una pagina donde busca pokemon



module.exports = router;
