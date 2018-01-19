const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//Using body-parser
app.use(bodyParser.urlencoded({ extended: false}));

//Using cookie-parser
app.use(cookieParser());

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
	res.render("hello",{
		username: req.cookies.username
	});
});

app.post("/hello", (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect("/hello");
});

app.listen(3000, () => {
	console.log("Conectado al puerto 3000");
});