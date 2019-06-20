function mapInit() {
  
  ymaps.ready(() => {
    console.log("111");

    let map = new ymaps.Map("map", {
      center: [55.76, 37.48], // Moscow
      zoom: 7
    })
  })
}

export {
  mapInit
}
