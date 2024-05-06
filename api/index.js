const express = require("express");
const dataBaseConection = require("../src/db/dbConnection");
const routes = require("../src/routes/index")
const cors = require("cors")
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
);

routes(app);

async function connectToDatabase() {
  const database = await dataBaseConection();

  database.once("open", () => {
      console.log("Connected to database");
    });
  
  
  database.on("error", (erro) => {
      console.error("Erro when trying to connect with database", erro);
    });

}
connectToDatabase()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
