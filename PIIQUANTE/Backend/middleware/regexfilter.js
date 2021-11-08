// CREATION MIDDLEWARE POUR PROTECTION AUTHENTIFICATION
// //Envionnement*


// // Export du middleware regexFilter
module.exports = (req, res, next) => {
    let regexFilter = (email,password)=> {
      let regexEmail= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      let regexPassword = /^[a-zA-Z0-9_.+-]+$/;
      let emailValid = regexEmail.test(email);
      let passwordValid = regexPassword.test(password);
      emailValid && passwordValid ? next() : res.status(400).json({ message: "mail ou password invalide" });
    }
    regexFilter(req.body.email,req.body.password);
};

