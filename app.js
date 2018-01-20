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
//Redirecciona si el usuario no ha introducido nombre
app.get("/", (req, res) => {
	const username = req.cookies.username;
	if(typeof(username) == 'undefined'){
		res.redirect('/hello');
	}
	else{
		res.render("index",{
			username: username
		});
	}
});

//El usuario quiere salir de modo que borramos la cookie con su nombre
app.post("/bye-bye", (req, res) => {
	res.clearCookie('username');
	res.redirect('/hello');
});

//Ruta donde se visualizan todas las cards
app.get("/cards", (req, res) => {
	res.locals.prompt = "hola soy una futura flash card"; 
	res.locals.hint = "Aqui va la pista"; 
	res.render("card");
});

//ruta Hello
//si el usuario no ha introducido su nombre lo introduce y le redirecciona a la pag principal
//Si el usuario ya ha introducido su nombre se redirecciona a la pagina principal
app.get("/hello", (req, res) => {
	const username = req.cookies.username;
	if(typeof(username) == 'undefined'){
		res.render("hello");
	}
	else {
		res.redirect("/");
	}
});

app.post("/hello", (req, res) => {
		res.cookie('username', req.body.username);
		res.redirect("/");
});


///////////// 404 /////////////////////////

app.use((req, res, next) => {
	const err = new Error("¡¡Te has salido del tiesto!!");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(404);
	res.render('error');
});
////////////////////////////////////////////////


app.listen(3000, () => {
	console.log("Conectado al puerto 3000");
});