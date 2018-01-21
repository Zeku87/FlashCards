/*
	Al usar rutas modulares, el nombre del fichero ya indica el dominio de la ruta
	Es decir este fichero se cards por lo tanto todas las rutas que se indican a continuación
	tienen prefijadas "/cards"

	La primera ruta hemos indicado "/" por lo tanto su ruta será "/cards/"
*/

const express = require("express");
const router = express.Router();

//Ruta donde se visualizan todas las cards
router.get("/", (req, res) => {
	res.locals.prompt = "hola soy una futura flash card"; 
	res.locals.hint = "Aqui va la pista"; 
	res.render("card");
});

module.exports = router;