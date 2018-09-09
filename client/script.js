ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', 
    {
        center: [55.831903, 37.411961],
        zoom: 13,

        //Добавление кнопки "Геолокация"
        controls: ['geolocationControl']
    },

    {
        searchControlProvider: 'yandex#search'
    });

    var loadingObjectManager = new ymaps.LoadingObjectManager('http://localhost:3000/tile?bbox=%b', 
    {   
            // Включаем кластеризацию.
        clusterize: true,
            // Зададим опции кластерам.
            // Опции кластеров задаются с префиксом cluster.
        clusterHasBalloon: false,
            // Опции объектов задаются с префиксом geoObject.
        geoObjectOpenBalloonOnClick: false,
        paddingTemplate: 'myCallback_%b'

    });

    myMap.geoObjects.add(loadingObjectManager);

};
