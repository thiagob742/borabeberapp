
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";
var promo = [];


var urlbar = "http://www.mocky.io/v2/59ff56222e00003b0fca5969";
var bares = [];

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
}

function sincronizarBares() {
  MobileUI.ajax.get(urlbar, (err, res) => {
    if (err) {
      return;
    }

    var databar = JSON.parse(res.text);

    bares = [];

    databar.forEach(item => {
      var obj = {
        nome: item.nome,
        endereco: item.endereco,
        foto: item.foto,
        latitude: item.latitude,
        longitude: item.longitude
      }

      bares.push(obj);
    });
  });
}