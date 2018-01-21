const express = require('express');
const router = express.Router();

//Root route
//Redirecciona si el usuario no ha introducido nombre
router.get("/", (req, res) => {
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
router.post("/bye-bye", (req, res) => {
	res.clearCookie('username');
	res.redirect('/hello');
});


//ruta Hello
//si el usuario no ha introducido su nombre lo introduce y le redirecciona a la pag principal
//Si el usuario ya ha introducido su nombre se redirecciona a la pagina principal
router.get("/hello", (req, res) => {
	const username = req.cookies.username;
	if(typeof(username) == 'undefined'){
		res.render("hello");
	}
	else {
		res.redirect("/");
	}
});

router.post("/hello", (req, res) => {
		res.cookie('username', req.body.username);
		res.redirect("/");
});

module.exports = router;