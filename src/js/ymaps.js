function mapInit() {
  
  ymaps.ready(() => {
    console.log("111");

    let map = new ymaps.Map("map", {
      center: [55.73367, 37.587874], // Moscow
      zoom: 10.2
    })
  })
}

export {
  mapInit
}
