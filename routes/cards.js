/*
	Al usar rutas modulares, el nombre del fichero ya indica el dominio de la ruta
	Es decir este fichero se cards por lo tanto todas las rutas que se indican a continuación
	tienen prefijadas "/cards"

	La primera ruta hemos indicado "/" por lo tanto su ruta será "/cards/"
*/

const express = require("express");
const router = express.Router();

const {data} = require("../data/flashcards.json"); // equivale a data = require(...).data
const {cards} = data; // equivale a cards = data.cards

//Ruta donde se visualizan todas las cards
router.get("/:id", (req, res) => {
//http://example.com/resource?building=42&age=40&color=salmon
	
	let cardDataTemplate = {};
	const {id} = req.params;
	const {side} = req.query; //side puede contener "question" o "answer" o undefined
	
	if( side )
	{	
		const text = cards[id][side];
		const hint = cards[id]["hint"];
	
		if(side === 'question')
			cardDataTemplate = { id, text, hint};
		if(side === 'answer')
			cardDataTemplate = { id, text };
	}
	else{
		const text = cards[id]["question"];
		const hint = cards[id]["hint"];
		cardDataTemplate = {id, text, hint};
	}

	res.render("card", cardDataTemplate);
});


//Ruta /cards saca un numero aleatorio(una card aleatoria) y redireccionamos
router.get("/", (req, res) => {
		const cardId = Math.floor(Math.random() * cards.length);
		res.redirect(`/cards/${cardId}?side=question`);
});



module.exports = router;