const express = require("express")

const {connection, MovieModel }= require("./index.js")
const app = express();

app.use(express.json())


app.get("/", (req,res) => {
    res.send("Home Page")
})

app.get("/movies", async (req,res) => {
     const results = await MovieModel.find({},{_id:0, __v:0})
    res.send(results)
})

//for creating data.
app.post("/movies/create", async (req,res) =>{
      const movie = await MovieModel.insertMany([req.body])
      res.send("movies saved")

})

// updateing
app.patch("/movies/update", async (req,res) =>{
    const {movie_name, rating} = req.body
    const updating = await MovieModel.updateOne({movie_name},{$set:{rating: rating}})
    res.send("movies updated")
   console.log(movie_name)
})


// deleting.
app.delete("/movies/delete", async (req,res) =>{
    const {movie_name, rating, id} = req.body
    const deleting = await MovieModel.deleteOne({id})
    res.send("movies deleted")
   console.log(movie_name)
})

// filter title
app.get("/movies/filter", async (req,res) =>{
    const {movie_name, rating} = req.body
    const filter = await MovieModel.find({movie_name})
    res.send(filter)

})

// sort by
app.get("/movies/sortby", async (req,res) =>{
  console.log(req.query)
 let value ;
  const {rating} = req.query
 
  if(rating=="asc"){
    console.log("a")
    value = 1
  }
  else if(rating == "desc"){
    console.log("b")
    value = -1
  }
    const filter = await MovieModel.find().sort({rating: value})
    res.send(filter)

})


   
app.listen(8080, async () => {
    try{
        await connection
        console.log("connected to DB sucessfully")
    }
    catch{
        console.log("Error connecting to DB")
    }
    
    console.log("listning on port 8080")
})