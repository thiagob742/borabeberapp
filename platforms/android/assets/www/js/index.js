
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";
var promo = [];


var urlbar = "http://www.mocky.io/v2/59ff56222e00003b0fca5969";
var bares = [];

var map;

var promocaoApi = "http://borabeber-api.herokuapp.com/api/promocao";

function sincronizar() {
  loading('Buscando Promoções ...');
  
  fetch(promocaoApi)
    .then((response) => {
      response.json()
        .then( (elementos) =>{
          elementos.forEach((elemento) => {
            promo.push(elemento);
          });
        })
        closeLoading();
    })
}



//função pro get na localização do smartphone


function iniciarMapa() {
  openPage('localizacao', function () {
  
    
    var onSuccess = function(position) {
       var longitude = position.coords.longitude;
       var latitude = position.coords.latitude;
      console.log("longitude: " + longitude);
      console.log("latitude: " + latitude);
      var latLong = new google.maps.LatLng(latitude, longitude);
      //var latLong = new google.maps.LatLng(-23.4421292, -51.9198801);

      map = new google.maps.Map(document.getElementById('map'), {
        center: latLong,
        zoom: 15
      });

      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: 'my location'
      });

    };

    function onError(error) {
       console.log(error.message);
    }
    setMarker(map);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  });
}


function setMarker(map){

  bares.forEach(item =>{
    var marker = new google.maps.Marker({
      position: item.latLgn,
      icon: 'img/marker_blue.png',
      title: item.titulo,
      map: map
    });

    // marker.addListener('click', function() {
    //   openPage('cardapio', function(item){
        
    //   });
      
    // });
  }); 
}
document.write('<script src=js/dataPoints.js');



