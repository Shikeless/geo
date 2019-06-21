function mapInit() {
  
    ymaps.ready(() => {

        let map = new ymaps.Map("map", {
          center: [55.73367, 37.587874], // Moscow
          zoom: 10.2
        })


        var myPlacemark;


       






        map.events.add('click', function (e) {
        	var coords = e.get('coords');
            myPlacemark = createPlacemark(coords);
            map.geoObjects.add(myPlacemark);
            myPlacemark.balloon.open();
        });

        function createPlacemark(coords) {
            console.log('placemark');
            return new ymaps.Placemark(coords, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: false
            }, {balloonLayout: MyBalloonLayout});

        }


  });
}




export {
  mapInit
}
