function mapInit() {
  
    ymaps.ready(() => {

        let map = new ymaps.Map("map", {
          center: [55.73367, 37.587874], // Moscow
          zoom: 10.2,
          propagateEvents: true
        })



      
        map.events.add('click', function (e) {
      
            var myPlacemark;
            var dat = {name: 'alex', lastName: 'peter'};
            var dat2 = {name: 'alex', lastName: 'peter', comment: 'aaasdfasdfadf'}
        	var coords = e.get('coords');
            myPlacemark = createPlacemark(coords, dat);
            map.geoObjects.add(myPlacemark);

            myPlacemark.events.add('click', (e) => {
            const marker = e.get('target');
                console.log(marker.properties.get('hintContent'));
                function change() {
                    marker.properties
                        .set({
                            hintContent: dat2
                        });
                    console.log(e.get('target').properties.get('hintContent'))
                }
                setTimeout(change, 2000);      
            })

            // map.geoObjects.events.add('click', e => {
            //     const marker = e.get('target').properties.get('hintContent');
            //     console.log(marker);
            // });
        document.getElementById('pos').style.left = coords[0];
        document.getElementById('pos').style.top = coords[1];
        document.getElementById('pos').style.display='block';
                        
                    
        console.log(coords);
        console.log(document.getElementById('pos').style)
        
        });



        function createPlacemark(coords, data) {
            return new ymaps.Placemark(coords, {
                hintContent: data
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: false,
                openHintOnHover: false
            });
        }


      
        
    });
}




export {
  mapInit
}
