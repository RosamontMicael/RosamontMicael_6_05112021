//3A_ CREATION DU ROUTEUR STUFF
    // // Installation environnements et packs necessaires
const express = require("express");

  // // Routeur
const router = express.Router();

  // // Import middleware authentication
const auth = require("../middleware/auth");

  // // Import middleware Multer
const multer = require("../middleware/multer-config");

  // // Import middleware Input
const input = require("../middleware/input");

  // // Import middleware Inputcreate
const inputcreate = require("../middleware/inputcreate");

  // // Import Controleur: contient lensembles des instructions pour chaque cas du routeur
const sauceCtrl = require("../controllers/sauce");

// Option du controller
    //  //Le router oriente sur le bon choix
    //  //le middleware auth fais dabord sa verif dauthentification
router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/", auth,  multer, inputcreate, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, input, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

    //  //Export du Routeur
module.exports = router;
