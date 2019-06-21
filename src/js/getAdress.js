        // function getAddress(coords) {
        //     myPlacemark.properties.set('iconCaption', 'поиск...');
        //     ymaps.geocode(coords).then(function (res) {
        //         var firstGeoObject = res.geoObjects.get(0);

        //         myPlacemark.properties
        //             .set({
        //                 // Формируем строку с данными об объекте.
        //                 iconCaption: [
        //                     // Название населенного пункта или вышестоящее административно-территориальное образование.
        //                     firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
        //                     // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
        //                     firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        //                 ].filter(Boolean).join(', '),
        //                 // В качестве контента балуна задаем строку с адресом объекта.
        //                 balloonContent: firstGeoObject.getAddressLine()
        //             });
        //     });
        // }