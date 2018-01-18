const express = require('express');

const app = express();

app.set('view engine', 'pug');

//Root route
app.get("/", (req, res) => {
	res.render("index");
});

//Ruta donde se visualizan todas las cards
app.get("/cards", (req, res) => {
	res.locals.prompt = "hola soy una futura flash card"; 
	res.locals.hint = "Aqui va la pista"; 
	res.render("card");
});

//sandbox
//Nombres


app.listen(3000, () => {
	console.log("Conectado al puerto 3000");
});