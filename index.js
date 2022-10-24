const express = require('express')
const app = express()
const axios = require('axios')

const PORT = process.env.port || PORT

const basePokemonURL = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

app.get("/pokemon/:name", async  (req,res) =>{

  const pokemonName = req.params.name
  const response = await axios.get(basePokemonURL(pokemonName))
  const {id, name, abilities} = response.data
  res.json({id,name, abilities})
})

app.get("/", (req, res)=>{
  res.json("DUMMY API")
})

app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`)
})