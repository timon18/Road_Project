var express = require('express');
var app = express();
var DB = require('./../DB/data');
//---
var find = require('./../DB/data');
//---
var array_cords;

app.set('port' , process.env.PORT || 3000); //	Не знаю как но теперь "port" = 3000
app.set('jsonp callback name', 'callback');	//менят "название коллбека"


app.use('/', express.static('client')); //типо "рендерит" саму страницу

//---
find.test();
//---

// для того, что бы принимать координаты и записывать их в базу
//Возможно следует потом вывести его в отдельный файл
//Обозначения
//long - долгота
//lat - широта
//Пример GET запроса
//http://localhost:3000/coords?long=55.3589&lat=35.1563
app.get('/coords', function(req, res, next) {	
	
	var long = +req.query.long;
	var lat = +req.query.lat;

	DB.created_marker([long, lat]);

    next();
});

//преобразует координаты отправленные клиентов в массив чисел
app.get('/tile', function(req, res, next) {

	var cords = req.query.bbox;
	array_cords = cords.split(',');
	for (var i = 0; i < array_cords.length; i++)
	{
		array_cords[i] = Number(array_cords[i]);
	}
    next();
});


app.use('/', function(req, res, next) {
	console.log(array_cords);	//GET запрос от клиета в виде массива
	find.test(array_cords[0], array_cords[1], array_cords[2], array_cords[3]);	//отправляюся все координаты

	res.jsonp(
  {
"type": "FeatureCollection",
    "features": [
        {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}}
        ]
    }
    );
	next();

});



//Обобщенный обработчик 404 (Промежуточное ПО)
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

//Обработчик ошибки 500 (Промежуточное ПО)
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express запущен на http://localhost:'+ 
		app.get('port') + '; нажмите Crtl+C для завершения');
});