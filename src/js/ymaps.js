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
                    let obj = {};
    
                    obj.adress = code.geoObjects.get(0).properties.get('text');;

                    obj.comments = {
                        list:[]
                    };

                    obj.coords = coords;

                    popup(map, mouseX, mouseY, obj);
                });   
        });
    });
}

function popup(map ,x, y, obj) {
    var header = document.getElementById('header');

    header.innerHTML = obj.adress;

    document.getElementById('pos').style.left = `${x}px`;

    document.getElementById('pos').style.top = `${y}px`;

    document.getElementById('pos').style.display='block';
    
    addComment(map, obj);
}

function createPlacemark(map ,obj) {
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.comments
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false
    });

    map.geoObjects.add(myPlacemark);
}

function addComment(map, obj) {
    var but = document.querySelector('#addButton');

    but.addEventListener('click', e => {
        var comm = {};
        console.log('click');

        var cord = obj.coords;

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

        obj.comments.list.push(comm);

        createPlacemark(map, obj); 
    });
}

export {
  mapInit
}
