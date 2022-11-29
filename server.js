const swaggerUi = require('swagger-ui-express')
 const docs = require( './docs.json' )

const express = require('express')
const app = express()
const axios = require('axios')

const PORT = process.env.PORT || 8000

const basePokemonURL = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

const swaggerServe= swaggerUi.serve
const swaggerSetup = (document) => swaggerUi.setup(document)


app.use('/docs', swaggerServe)

app.get('/docs', swaggerSetup(docs))

app.get("/pokemon/:name", async  (req,res) =>{
  try{
    const pokemonName = req.params.name
    const response = await axios.get(basePokemonURL(pokemonName))
    const {id, name, abilities} = response.data
    res.json({id,name, abilities})
  }catch(error){
    res.status(500)
    res.json({message: `Error!\n ${JSON.stringify(error)}`})
  }
})

app.get("/", (req, res)=>{
  res.json("DUMMY API")
})

app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`)
})