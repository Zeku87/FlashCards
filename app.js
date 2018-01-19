const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Using body-parser
app.use(bodyParser.urlencoded({ extended: false}));

//Set template engine
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

//ruta Hello
app.get("/hello", (req, res) => {
	res.render("hello");
});

app.post("/hello", (req, res) => {
	console.log(req.body.username);
	res.render("hello", {
		username: req.body.username
	})
});

app.listen(3000, () => {
	console.log("Conectado al puerto 3000");
});