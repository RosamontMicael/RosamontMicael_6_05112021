//CREATION MODEL USER
// // Installation environnements et packs necessaires*
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// // Schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// // UTILISATION DU PACK VALIDATOR
userSchema.plugin(uniqueValidator);

// // Export du schema
module.exports = mongoose.model("User", userSchema);
