var mongoose = require('mongoose');

//	Объект  opts не обязателен, но она сделанна что бы задать опцию keepAlive
//	которая предотворит появление ошибок подклчения к базе данных
//	долго работающих приложений (таких как сайт)
var opts = {			
	server: {
		soketOption: {keepAlive: 1}
	}
};

//подключение к базе
mongoose.connect('mongodb://Timon:Timon18042000@ds020218.mlab.com:20218/road_project_db', opts);

//создаём схему
var pitSchema = mongoose.Schema({	
	 gps:      { type: [Number]}
});

//создаём модель на основе схемы
var Pit = mongoose.model('Pit', pitSchema); 

var created_marker = function(data) {      //для создания маркеров
    const note = new Pit({
        gps:    data,
    });

    return note.save();
};

var test = function(long1, lat1, long2, lat2)
{
	console.log(long1);

	//findOne выводит только одну. find должен выводить все по поиску. Нужно как то заменить.
	//спроси потом в стаковерфлоу как это сделать
	Pit.findOne({"__v": 0}, function(err, Pit)	//тут нужно используя координаты сделать выборку

	{
    console.log(err);  //returns Null
    //если написать  просто find- то не работает Pit.gps[1]
    //но это понятно, так как там должно быть куча жпс-ов 
    console.log(Pit.gps[1]);
	}

	);
};

exports.created_marker = created_marker;
exports.test = test;
