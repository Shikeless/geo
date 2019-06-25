import render from "../templates/comment.hbs"
import render1 from "../templates/popup.hbs"
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
    var pop = document.getElementById('pos');

    pop.innerHTML = render1();

    var header = document.getElementById('header');

    header.innerHTML = obj.adress;

    document.getElementById('pos').style.left = `${x}px`;

    document.getElementById('pos').style.top = `${y}px`;

    document.getElementById('pos').style.display = 'block';
    
    addComment(map, x, y, obj);
}



function createPlacemark(map, x, y, obj, comBox) {
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.comments
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false
    });

    map.geoObjects.add(myPlacemark);

    myPlacemark.events.add('click', e => {
        const marker = e.get('target');

        console.log(marker.properties._data.hintContent);

        obj.comments = marker.properties._data.hintContent;
       
        popup(map, x, y, obj);
    });

}

function addComment(map, x, y, obj) {
    var but = document.querySelector('#addButton');

    but.addEventListener('click', e => {
        var comm = {};

        var cord = obj.coords;

        var name = document.querySelector('#name');

        var place = document.querySelector('#place');

        var comment  = document.querySelector('#comment');

        const comBox = document.querySelector('#com-box');

        comm.name = name.value;

        comm.place = place.value;

        comm.comment = comment.value;

        comm.timestamp = date;

        name.value = '';

        place.value = '';

        comment.value = '';

        obj.comments.list.push(comm);

        createPlacemark(map, x, y, obj); 

        comBox.innerHTML = render(obj.comments);
    });
}

export {
  mapInit
}
