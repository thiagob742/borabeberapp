
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";
var promo = [];


var urlbar = "http://www.mocky.io/v2/59ff56222e00003b0fca5969";
var bares = [];

var heroku = "http://borabeber-api.herokuapp.com/api/promocao";

function sincronizar() {
  fetch(url)
    .then((response) => {
      response.json()
        .then( (elementos) =>{
          elementos.forEach((elemento) => {
            promo.push(elemento);
          });
        })
    })

  // fetch(heroku)
  //   .then((response) => {
  //     response.json()
  //       .then( (elementos) =>{
  //         elementos.forEach((elemento) => {
  //           console.log(elemento);
  //         });
  //       })
  //   })
}

function sincronizarBares() {
  openPage('localizacao', function () {
    //carregar os paranaie
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    var m1 = new google.maps.Marker({
      position: {lat: -34.397, lng: 150.644},
      map: map,
      title: 'Hello World!'
    });
    m1.addListener('click', function() {
      alert('showww')
    });
  });
  fetch(urlbar)
    .then( (response) => {
      response.json()
        .then( databar => {
          databar.forEach(item => {
            var obj = {
              nome: item.nome,
              endereco: item.endereco,
              foto: item.foto,
              latitude: item.latitude,
              longitude: item.longitude
            }
            console.log(obj);
            bares.push(obj);
        })
    })
  })
}