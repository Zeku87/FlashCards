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

//Routes, dado que el fichero se llama index.js, no es necesario indicarlo
const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardRoutes);

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