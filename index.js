const express = require( 'express');
const bodyParser = require('body-parser');
const  mongoose =  require( 'mongoose');
const cors =require( 'cors');

const moviesRoutes =require ('./Routes/Movies.js');
const userRoutes = require ('./Routes/users.js');

const dotenv = require  ( 'dotenv');

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/movies', moviesRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Bookmyshow API')
})
//const CONNECTION_URL = "mongodb+srv://sai123:sai123@cluster0.w5gouug.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)),
  )
  .catch((error) => console.log(error))