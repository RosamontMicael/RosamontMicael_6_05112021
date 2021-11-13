// CREATION MIDDLEWARE POUR PROTECTION AUTHENTIFICATION
// //Envionnement*

// // Export du middleware Input
module.exports = (req, res, next) => {
  let regexFilter = (name,description,manufacturer,mainPepper ) => {
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
    req.body.name,
    req.body.description,
    req.body.manufacturer,
    req.body.mainPepper
  );
  console.log("re.name", req.body.sauce);
};
