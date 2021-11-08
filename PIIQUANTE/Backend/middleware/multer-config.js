// CONFIGURATION DE MULTER : TELECHARGEMENT DE FICHIER
    // // Environnement*
const multer = require("multer");

    // // Biblioteques
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

    // // Middleware de configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

    // // Export du middleware de config de Multer
module.exports = multer({ storage: storage }).single("image");
