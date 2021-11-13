// CREATION MIDDLEWARE POUR PROTECTION AUTHENTIFICATION
// //Envionnement*

// // Export du middleware Inputcreate
module.exports = (req, res, next) => {
  let regexFilter = (name, description, manufacturer, mainPepper) => {
    let regexInput = /^[a-zA-Z0-9éèêôïà' _.+-]+$/;
    //let regexInput = /^[a-zA-Z]+$/;
    let nameValid = regexInput.test(name);
    let descriptionValid = regexInput.test(description);
    let manufacturerValid = regexInput.test(manufacturer);
    let mainPepperValid = regexInput.test(mainPepper);

    nameValid && descriptionValid && manufacturerValid && mainPepperValid ? next() : res.status(400).json({ message: "syntaxe incorrecte" });
    console.log("name", nameValid);
    console.log("manufacturer", manufacturerValid);
    console.log("description", descriptionValid);
    console.log("mainpepper", mainPepperValid);
  };

  regexFilter(
    JSON.parse(req.body.sauce).name,
    JSON.parse(req.body.sauce).description,
    JSON.parse(req.body.sauce).manufacturer,
    JSON.parse(req.body.sauce).mainPepper
  );
  console.log("re.name", JSON.parse(req.body.sauce).name);
};
