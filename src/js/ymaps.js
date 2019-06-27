import render from "../templates/comment.hbs"
import render1 from "../templates/popup.hbs"
// import render2 from "../templates/cluster.hbs"
import { getData } from './date';

var date = getData();

var pop = document.getElementById('pop');

function mapInit() {

    ymaps.ready(() => {

        var map = new ymaps.Map("map", {
          center: [55.73367, 37.587874],
          zoom: 10.2,
          propagateEvents: true
        })

        var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h2 class=ballon_header>{{ properties.balloonContentHeader }}</h2>' +
            '<div id="ref" class=ballon_body><a>{{ properties.balloonContentBody[0] | raw}}</a></br>{{ properties.balloonContentBody[1] | raw}}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter | raw}}</div>'
        );

        var clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 300,
            clusterBalloonContentLayoutHeight: 200,
            clusterBalloonPagerSize: 5,
            minClusterSize: 2     
        });
    
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

                    obj.x = mouseX;

                    obj.y = mouseY;

                    obj.coords = coords;

                    popup(map, obj, clusterer);
                });  
        });
    });
}

function popup(map, obj, clusterer) {
    pop.innerHTML = render1();

    var header = document.getElementById('header');

    header.innerHTML = obj.adress;

    if (obj.x + pop.offsetWidth > window.innerWidth) {
        pop.style.left = `${window.innerWidth - pop.offsetWidth - 20}px`;
    } else if (window.innerWidth - obj.x < 382) {
        pop.style.left = `${window.innerWidth - 402}px`;
    } else {
        pop.style.left = `${obj.x}px`;
    } 

    if (obj.y + pop.offsetHeight > window.innerHeight) {
        pop.style.top = `${window.innerHeight - pop.offsetHeight - 20}px`;
    } else if (window.innerHeight - obj.y < 532) {
        pop.style.top = `${window.innerHeight - 552}px`;
    } else {
        pop.style.top = `${obj.y}px`;
    } 

    pop.style.display = 'block';

    const comBox = document.querySelector('#com-box');

    comBox.innerHTML = render(obj.comments);
    
    addComment(map, obj, comBox, clusterer);

    closeButt();
}



function createPlacemark(map, obj, clusterer) {
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.comments,
        balloonContentHeader: obj.comments.list[obj.comments.list.length - 1].place,
        balloonContentBody: [obj.adress, obj.comments.list[obj.comments.list.length - 1].comment],
        balloonContentFooter: obj.comments.list[obj.comments.list.length - 1].timestamp
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false,
        hasBalloon: false
    });

    clusterer.add(myPlacemark);

    map.geoObjects.add(clusterer);

    document.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            obj.x = e.pageX;
            obj.y = e.pageY;
            popup(map, obj, clusterer);
        }
    })

    clusterer.events.add('click', e => {
        pop.style = "display: none"
    })

    myPlacemark.events.add('click', e => {
        const marker = e.get('target');

        obj.comments = marker.properties._data.hintContent;
       
        popup(map, obj, clusterer);
    });

}

function addComment(map, obj, comBox, clusterer) {
    var but = document.querySelector('#addButton');

    but.addEventListener('click', e => {
        var comm = {};

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

        comBox.innerHTML = render(obj.comments);

        createPlacemark(map, obj, clusterer);              
    });
}

function closeButt() {
    var cross = document.querySelector('#cross');
    cross.addEventListener('click', e => {
        var pop = document.querySelector('#pop')
        pop.style = "display: none";
    })
}

export {
  mapInit
}