//4A_ OPTION A DU CONTROLLER
// // Environnement*?
const fs = require("fs");

// // Import du model Thing (cf Ctrl Create)
const Sauce = require("../models/sauce");

// // Export Ctrl Create
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: ["test "],
    usersDisliked: ["test "],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// // Export Ctrl GetOne
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// // Export Ctrl Modify
exports.modifySauce = (req, res, next) => {
  // const thing = new Thing({
  //   _id: req.params.id,
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   userId: req.body.userId,
  // });
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// // Export Ctrl Delete
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// // Export Ctrl GetAll
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeDislikeSauce = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "J'aime" }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Je n'aime pas " }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: `Jannule mon like` }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() =>
                res.status(200).json({ message: `Jannule mon dislike` })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;
  }
};

// NE FONCTIONNE PAS AVEC JAVASCRIPT
// exports.likeDislikeSauce = (req, res, next) => {
//   let singleLiker=[];
//   let singleDisliker=[];
// Pour veriier dans quel tableau se trouve le like ou le dislike
// Sauce.findOne({ _id: req.params.id }).then((sauce) => {
// console.log("sauce selectionnée:", sauce);
// console.log("id du liker ou disliker :", req.body.userId);
// console.log("valeur du like", req.body.like);

// singleLiker = sauce.usersLiked.filter((el) => {
//   el == req.body.userId;
// });
// singleDisliker = sauce.usersDisliked.filter((el) => {
//   el == req.body.userId;
// });

// console.log("filtre: Existe til deja ds le tableau liker int109 ?", singleLiker);
// console.log(
//   "filtre: Existe til deja ds le tableau Disliker int111 ?",
//   singleDisliker
// );
// console.log("Longueur de singleLiker", singleLiker.length);
// console.log("Tableau des like de la sauce", sauce.usersLiked);
// console.log(
//   "Longueur du Tableau des like de la sauce",
//   sauce.usersLiked.length
// );

//  console.log("filtre:Existe til deja ds le tableau DISliker ?", singleDisliker);
// console.log("Longueur de singleDISLiker", singleDisliker.length);
// console.log("Tableau des DISlike de la sauce", sauce.usersDisliked);
// console.log(
//   "Longueur Tableau des Dislike de la sauce",
//   sauce.usersDisliked.length
// );

// console.log(
//   "filtre:Existe til deja ds le tableau DISliker ?",
//   singleDisliker
// );
//  console.log("filtre: Existe til deja ds le tableau liker ?", singleLiker);
// });
//   console.log(
//     "filtre: Existe til deja ds le tableau liker ext136 ?",
//     singleLiker
//   );
//   console.log(
//     "filtre: Existe til deja ds le tableau Disliker ext140 ?",
//     singleDisliker
//   );

//     console.log("body 145", req.body);

//   switch (req.body.like) {
//     case 1:
// if (singleLiker[0] == undefined) {
// Sauce.updateOne(
//   { _id: req.params.id },
//   { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } }
// )
//   .then(() => res.status(200).json({ message: "J'aime" }))
//   .catch((error) => res.status(400).json({ error }));

// console.log(
//   "filtre: Existe til deja ds le tableau liker ext159 apres like ?",
//   singleLiker[0]
// );

// break;
// } else {
//   res.status(420).json({
//     message: "vous ne pouvez liker qu'une seule fois",
//   });
//   break;
// }

// case -1:
// if (singleDisliker[0] == undefined) {
// Sauce.updateOne(
//   { _id: req.params.id },
//   { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } }
// )
//   .then(() => res.status(200).json({ message: "Je n'aime pas " }))
//   .catch((error) => res.status(400).json({ error }));

// break;
// } else {
//   res.status(420).json({
//     message: "vous ne pouvez liker qu'une seule fois",
//   });
//   break;
// }

//   case 0:
//     Sauce.findOne({ _id: req.params.id })
//       .then((sauce) => {
//         if (sauce.usersLiked.includes(req.body.userId)) {
//           Sauce.updateOne(
//             { _id: req.params.id },
//             { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
//           )
//             .then(() => res.status(200).json({ message: `Neutre` }))
//             .catch((error) => res.status(400).json({ error }));
//         }
//         if (sauce.usersDisliked.includes(req.body.userId)) {
//           Sauce.updateOne(
//             { _id: req.params.id },
//             {
//               $pull: { usersDisliked: req.body.userId },
//               $inc: { dislikes: -1 },
//             }
//           )
//             .then(() => res.status(200).json({ message: `Neutre` }))
//             .catch((error) => res.status(400).json({ error }));
//         }
//       })
//       .catch((error) => res.status(404).json({ error }));
//     break;
// }
//  console.log("filtre: Existe til deja ds le tableau liker ?", singleLiker);
//  console.log(
//    "filtre: Existe til deja ds le tableau Disliker ?",
//    singleDisliker
//  );

// };
