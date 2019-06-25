import render from "../templates/comment.hbs"
import { getData } from './date';

var date = getData();

function mapInit() {

    ymaps.ready(() => {

        var map = new ymaps.Map("map", {
          center: [55.73367, 37.587874],
          zoom: 10.2,
          propagateEvents: true
        })
    
        map.events.add('click', function (e) {
            var coords = e.get('coords');

            var mouseX = e.get('domEvent').get('pageX');

            var mouseY = e.get('domEvent').get('pageY');

            let geoCoords = ymaps.geocode(coords);

            geoCoords
                .then(code => {
                    var code = 123;
                    console.log(code);

                    let obj = {};
                    console.log(obj);
    
                    obj.adress = code;

                    obj.comments = {
                        list:[]
                    };

                    obj.coords = coords;

                    popup(map, mouseX, mouseY, obj.coords, obj.adress, obj.comments);
                });   
        });
    });
}

function popup(map ,x, y, coords, geo, comms) {
    var header = document.getElementById('header');

    header.innerHTML = geo;

    document.getElementById('pos').style.left = `${x}px`;

    document.getElementById('pos').style.top = `${y}px`;

    document.getElementById('pos').style.display='block';

    var but = document.querySelector('#addButton');

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

        createPlacemark(map, coords, comms); 
    });
}

function createPlacemark(map ,coords, data) {
    var myPlacemark = new ymaps.Placemark(coords, {
        hintContent: data
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false
    });

    map.geoObjects.add(myPlacemark);
}

export {
  mapInit
}
