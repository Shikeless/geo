import render from "/home/shikeless/Projects/LOFTSCHOOL/geo/src/templates/comment.hbs"

function mapInit() {

    ymaps.ready(() => {

        let map = new ymaps.Map("map", {
          center: [55.73367, 37.587874], // Moscow
          zoom: 10.2,
          propagateEvents: true
        })
    
        var obj = {};

        var but = document.querySelector('#addButton');

        var comBox = document.querySelector('#com-box');

        map.events.add('click', function (e) {

            obj = {};

            var coords = e.get('coords');

            let dat1 = {
                    list: []  
                };
            console.log('dat1', dat1);

            let data = {
                    list: []
                };
            console.log('data', data);

            var myPlacemark = createPlacemark(coords, data); 
            console.log('до размещения', myPlacemark);

            var mouseX = e.get('domEvent').get('pageX');

            var mouseY = e.get('domEvent').get('pageY');

            comBox.innerHTML = '';

            let geoCoords = ymaps.geocode(coords);
            geoCoords
                .then(code => {
                    addPopup(mouseX, mouseY, code, obj);
                })

            but.addEventListener('click', e => {
                var name = document.querySelector('#name');

                var place = document.querySelector('#place');

                var comment  = document.querySelector('#comment');

                obj.name = name.value;

                obj.place = place.value;

                obj.comment = comment.value;

                obj.timestamp = GetFormattedDate();

                name.value = '';

                place.value = '';

                comment.value = '';

                map.geoObjects.add(myPlacemark);
                // console.log('после размещения', myPlacemark);
                myPlacemark.properties._data.hintContent.list.push(obj);
                // console.log(myPlacemark.properties._data.hintContent);
                dat1.list.push(obj);

                obj = {};

                geoCoords
                    .then(code => {
                        addPopup(mouseX, mouseY, code, dat1);
                    })

            });

            map.geoObjects.events.add('click', e => {
                const marker = e.get('target');
                console.log(marker);

                var mouseX = e.get('domEvent').get('pageX');

                var mouseY = e.get('domEvent').get('pageY');

                if (marker.properties._data.hintContent) {
                let geoCoords = ymaps.geocode(coords);
                    geoCoords
                        .then(code => {
                            addPopup(mouseX, mouseY, code, marker.properties._data.hintContent);
                        })
                }
            });
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

        function addPopup(x, y, geo, data) {
            var header = document.getElementById('header')
            header.innerHTML = geo.geoObjects.get(0).properties.get('text');

            if (Object.entries(data).length !== 0 && data.constructor === Object) {
                const comBox = document.querySelector('#com-box')
                comBox.innerHTML = render(data);
            }

            document.getElementById('pos').style.left = `${x}px`;

            document.getElementById('pos').style.top = `${y}px`;

            document.getElementById('pos').style.display='block';
        }

        function GetFormattedDate() {
            var todayTime = new Date();

            var month = todayTime .getMonth() + 1;

            var day = todayTime .getDate();

            var year = todayTime .getFullYear();

            var hour = todayTime .getHours();

            var minute = todayTime .getMinutes();

            return year + "/" + month + "/" + day + "-" + hour + "." + minute;
        }    
    });
}

export {
  mapInit
}
