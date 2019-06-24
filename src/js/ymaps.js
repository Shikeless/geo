import render from "/home/shikeless/Projects/LOFTSCHOOL/geo/src/templates/comment.hbs"
import { getData } from './date';

var but = document.querySelector('#addButton');

var date = getData();

function mapInit() {

    ymaps.ready(() => {

        let map = new ymaps.Map("map", {
          center: [55.73367, 37.587874],
          zoom: 10.2,
          propagateEvents: true
        })
    
        map.events.add('click', function (e) {
            var coords = e.get('coords');
            console.log(coords);

            var mouseX = e.get('domEvent').get('pageX');

            var mouseY = e.get('domEvent').get('pageY');
            console.log(mouseY);

            let geoCoords = ymaps.geocode(coords);

            geoCoords
                .then(code => {
                    let obj = {};
                    console.log(obj);

                    obj.adress = code.geoObjects.get(0).properties.get('text');

                    obj.comments = {
                        list:[]
                    };

                    obj.coords = coords;

                    popup(mouseX, mouseY, obj.coords, obj.adress, obj.comments);
                });

            
        });

        function popup(x, y, coords, geo, comms) {
            console.log(geo);
            console.log(coords);
            console.log(geo);

            var header = document.getElementById('header');

            header.innerHTML = geo;

            document.getElementById('pos').style.left = `${x}px`;

            document.getElementById('pos').style.top = `${y}px`;

            document.getElementById('pos').style.display='block';

            but.addEventListener('click', e => {
                var comm = {};

                var name = document.querySelector('#name');

                var place = document.querySelector('#place');

                var comment  = document.querySelector('#comment');

                comm.name = name.value;

                comm.place = place.value;

                comm.comment = comment.value;

                comm.timestamp = date;

                name.value = '';

                place.value = '';

                comment.value = '';

                comms.list.push(comm);

                var myPlacemark = createPlacemark(coords, comms); 

                map.geoObjects.add(myPlacemark);
            });


        }
    });


}




  function createPlacemark(coords, data) {
            return new ymaps.Placemark(coords, {
                hintContent: data
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: false,
                openHintOnHover: false
            });
        }


export {
  mapInit
}
