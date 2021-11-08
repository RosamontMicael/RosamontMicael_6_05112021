//2_ DEFINITION ET OPTIONS DE LAPPLICATION
  // // Installation environnements et packs necessaires*
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

  // // Import des routes neccessaires a l'application
const sauceRoutes = require("./routes/sauce"); // A- ROUTE CRUD
const userRoutes = require("./routes/user"); // B- ROUTE SECURITE

  // // Connection a BASE MongoDB
mongoose
  .connect(
    "mongodb+srv://webDevsauceP6:FguvuR3mHuATQ1BD@cluster0.rpsib.mongodb.net/saucePiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  // // Lancement de l'application
const app = express();

  // // Modification des Headers pour les acces: CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// // Installation environnements et packs necessaires
app.use(bodyParser.json());

// // 3 OPTIONS DE LAPPLICATION
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes); // OPTION A-CRUD
app.use("/api/auth", userRoutes); // OPTION B-SECURITE

// // MISE A DISPOSITION DE LAPPLICATION POUR LE SERVER
module.exports = app;
