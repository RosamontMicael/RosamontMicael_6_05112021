//3B_ CREATION DU ROUTEUR SEURITE
// // Installation environnements et packs necessaires
const express = require("express");

  // // Routeur
const router = express.Router();

  // // Import de regexFilter
const regexEmail = require("../middleware/regexfilter");

// Controleur: contient lensembles des instructions pour chaque cas du routeur
const userCtrl = require("../controllers/user");

// Option du controller
    //  //Le router oriente sur le bon choix
router.post("/signup", regexEmail, userCtrl.signup);
router.post("/login", userCtrl.login);

    //  //Export du Routeur
module.exports = router;
